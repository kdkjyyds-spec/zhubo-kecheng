/* ============================================================
 * 构建脚本：content.js + render.js → 纯静态 index.html
 * 用法：node build.js
 * 线上 index.html 是构建产物（纯静态、可被任意抓取工具读取），
 * content.js 是唯一内容源，改完内容跑一次本脚本即可。
 * ============================================================ */
const fs = require('fs');
global.window = {};
require('./content.js');
const R = require('./render.js');

const html = R.buildFullHTML(window.SITE_CONTENT);
fs.writeFileSync('index.html', html, 'utf8');
console.log('已生成 index.html：' + Buffer.byteLength(html, 'utf8') + ' bytes / ' +
            window.SITE_CONTENT.products.length + ' 项服务 / ' +
            (html.match(/class="c-lesson"/g) || []).length + ' 节课');
