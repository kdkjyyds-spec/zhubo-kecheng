/* ============================================================
 * 上线脚本：node deploy.js
 * ------------------------------------------------------------
 * 本机 github.com 直连不通、代理也拦 CONNECT，但 api.github.com 可达。
 * 所以走 GitHub Git Data API，一次性原子提交所有文件（避免页面半更新）。
 * 凭证从本机 git credential manager 动态读取，不落盘。
 * 前置：先 node build.js 生成静态 index.html
 * ============================================================ */
const fs = require('fs');
const { execFileSync } = require('child_process');

const REPO = 'kdkjyyds-spec/zhubo-kecheng';
const API = 'https://api.github.com/repos/' + REPO;
const FILES = ['index.html', 'content.js', 'render.js', 'editor.html', 'build.js', 'deploy.js'];
const MSG = '更新：内容配置化 + 可视化编辑器 + 静态成品页';
const PAYLOAD = '.deploy-payload.tmp';

function getToken() {
  const out = execFileSync('git', ['credential', 'fill'], {
    input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8'
  });
  const m = out.match(/^password=(.+)$/m);
  if (!m) throw new Error('本机没有 GitHub 凭证，请先登录一次');
  return m[1].trim();
}

const TOKEN = getToken();

function api(method, path, body) {
  const args = [
    '-sS', '--max-time', '40', '-X', method,
    '-H', 'Authorization: Bearer ' + TOKEN,
    '-H', 'Accept: application/vnd.github+json',
    '-H', 'User-Agent: workbuddy-deploy',
    '-H', 'Content-Type: application/json; charset=utf-8'
  ];
  if (body) {
    fs.writeFileSync(PAYLOAD, JSON.stringify(body), 'utf8');
    args.push('--data-binary', '@' + PAYLOAD);
  }
  args.push(API + path);
  const out = execFileSync('curl', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  let j;
  try { j = JSON.parse(out); } catch (e) { throw new Error('API 返回异常: ' + out.slice(0, 300)); }
  if (!(j.sha || j.object || j.tree) && j.message) throw new Error(method + ' ' + path + ' → ' + j.message);
  return j;
}

try {
  console.log('读取远程 main …');
  const ref = api('GET', '/git/ref/heads/main');
  const baseSha = ref.object.sha;
  const baseTree = api('GET', '/git/commits/' + baseSha).tree.sha;

  console.log('上传 ' + FILES.length + ' 个文件 …');
  const tree = FILES.map(function (f) {
    if (!fs.existsSync(f)) throw new Error('缺少文件: ' + f);
    const b64 = Buffer.from(fs.readFileSync(f, 'utf8'), 'utf8').toString('base64');
    const blob = api('POST', '/git/blobs', { content: b64, encoding: 'base64' });
    process.stdout.write('  ' + f + ' ✓\n');
    return { path: f, mode: '100644', type: 'blob', sha: blob.sha };
  });

  const newTree = api('POST', '/git/trees', { base_tree: baseTree, tree: tree });
  const commit = api('POST', '/git/commits', { message: MSG, tree: newTree.sha, parents: [baseSha] });
  api('PATCH', '/git/refs/heads/main', { sha: commit.sha, force: false });
  console.log('上线完成:', commit.html_url || commit.sha);
} finally {
  if (fs.existsSync(PAYLOAD)) fs.unlinkSync(PAYLOAD);
}
