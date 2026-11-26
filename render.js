/* ============================================================
 * 主播维护课堂 · 渲染引擎
 * index.html 与 editor.html 共用：SITE_STYLE（样式）+ renderContent（结构）
 * 改样式只改这里，改文案只改 content.js
 * ============================================================ */

var SITE_STYLE = `
  :root {
    --rose: #C48189; --rose-light: #F5E6E9; --rose-bg: #FDF8F9;
    --bg: #FDF8F9; --card: #FFFFFF; --text: #3D2C2E;
    --text-muted: #8B6B70; --border: #F0E0E3; --radius: 18px;
    --shadow: 0 2px 8px rgba(180,130,140,.06);
    --shadow-md: 0 6px 20px rgba(180,130,140,.08);
    --shadow-lg: 0 12px 40px rgba(180,130,140,.10);
    --gold: #D4A853; --gold-light: #F5EBD0;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    color: var(--text); background: var(--bg); line-height: 1.8; -webkit-font-smoothing: antialiased;
    font-size: 15px;
  }

  /* Nav */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(255,255,255,.92); backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--border);
  }
  .nav-inner {
    max-width: 720px; margin: 0 auto; padding: 0 20px;
    display: flex; align-items: center; justify-content: space-between; height: 56px;
  }
  .nav-logo { font-size: 18px; font-weight: 700; color: var(--rose); }
  .nav-links { display: flex; gap: 18px; list-style: none; }
  .nav-links a { text-decoration: none; color: var(--text-muted); font-size: 13px; font-weight: 500; transition: color .2s; }
  .nav-links a:hover { color: var(--rose); }
  .nav-cta {
    background: var(--rose); color: #fff; border: none;
    padding: 8px 18px; border-radius: 20px; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: opacity .2s;
  }
  .nav-cta:hover { opacity: .85; }

  /* Hero */
  .hero {
    max-width: 720px; margin: 0 auto; padding: 60px 20px 48px; text-align: center;
  }
  .hero-badge {
    display: inline-block; background: var(--rose-light); color: var(--rose);
    padding: 5px 18px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 20px;
  }
  .hero h1 { font-size: 30px; font-weight: 800; line-height: 1.35; margin-bottom: 12px; }
  .hero h1 span { color: var(--rose); }
  .hero p { font-size: 15px; color: var(--text-muted); max-width: 480px; margin: 0 auto 28px; }
  .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: var(--rose); color: #fff; border: none;
    padding: 14px 32px; border-radius: 24px; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: all .2s; box-shadow: 0 4px 16px rgba(196,129,137,.3);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(196,129,137,.4); }
  .btn-outline {
    background: #fff; color: var(--rose); border: 1.5px solid var(--rose-light);
    padding: 14px 32px; border-radius: 24px; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: all .2s;
  }
  .btn-outline:hover { border-color: var(--rose); }

  /* Section */
  .section { max-width: 720px; margin: 0 auto; padding: 0 20px 64px; }
  .section-header { text-align: center; margin-bottom: 36px; }
  .section-header h2 { font-size: 26px; font-weight: 700; margin-bottom: 8px; }
  .section-header p { color: var(--text-muted); font-size: 14px; }

  /* Pain points */
  .pains-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
  }
  .pain-item {
    background: var(--card); border: 1px solid var(--border); border-radius: 14px;
    padding: 20px 14px; text-align: center; box-shadow: var(--shadow);
  }
  .pain-icon { font-size: 28px; margin-bottom: 6px; }
  .pain-item h4 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .pain-item p { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

  /* Product Cards - Main Display */
  .product-stack { max-width: 720px; margin: 0 auto; padding: 0 20px 64px; }
  .product-card-full {
    background: var(--card); border: 1.5px solid var(--border); border-radius: var(--radius);
    padding: 28px 24px; box-shadow: var(--shadow); margin-bottom: 20px;
    position: relative;
  }
  .product-card-full.featured {
    border-color: var(--rose); box-shadow: 0 4px 24px rgba(196,129,137,.12);
  }
  .product-card-full.featured::before {
    content: "👑 最受欢迎"; position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--rose); color: #fff; font-size: 12px; font-weight: 600;
    padding: 4px 18px; border-radius: 20px; white-space: nowrap;
  }

  /* Product header: name + price */
  .pch {
    display: flex; align-items: baseline; justify-content: space-between;
    flex-wrap: wrap; gap: 8px; margin-bottom: 12px;
  }
  .pch-name { font-size: 22px; font-weight: 800; }
  .pch-price { text-align: right; }
  .pch-price .num { font-size: 34px; font-weight: 800; color: var(--rose); line-height: 1; }
  .pch-price .unit { font-size: 13px; color: var(--text-muted); display: block; margin-top: 2px; }
  .pch-desc { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }
  .pch-divider { border: none; border-top: 1px dashed var(--border); margin: 16px 0; }

  /* Benefits */
  .pch-label { font-size: 13px; font-weight: 700; color: var(--rose); margin-bottom: 10px; letter-spacing: 1px; }
  .pch-benefits { list-style: none; }
  .pch-benefits li {
    padding: 6px 0; font-size: 14px; color: var(--text);
    display: flex; align-items: flex-start; gap: 8px;
  }
  .pch-benefits li::before {
    content: ""; display: inline-block; width: 6px; height: 6px;
    border-radius: 50%; background: var(--rose); margin-top: 8px; flex-shrink: 0;
  }
  .pch-btn {
    margin-top: 18px; width: 100%; padding: 14px; border-radius: 24px;
    font-size: 15px; font-weight: 600; cursor: pointer; transition: all .2s;
    text-align: center; border: none;
  }
  .pch-btn.primary { background: var(--rose); color: #fff; }
  .pch-btn.primary:hover { opacity: .9; }
  .pch-btn.outline { background: #fff; color: var(--rose); border: 1.5px solid var(--rose); }
  .pch-btn.outline:hover { background: var(--rose-bg); }

  /* Extra modules inside card */
  .pch-extra {
    margin-top: 16px; padding: 16px; border-radius: 12px;
    background: var(--rose-light); font-size: 13px; line-height: 1.7;
  }
  .pch-extra strong { color: var(--rose); display: block; margin-bottom: 4px; font-size: 14px; }

  /* Curriculum — clean numbered list */
  .curriculum-box {
    margin-top: 16px; padding: 20px 20px;
    border-radius: 14px; background: #FBF5F6;
    font-size: 13px; line-height: 1.9;
  }
  .c-module {
    margin-bottom: 14px; padding-bottom: 14px;
    border-bottom: 1px dashed var(--rose-light);
  }
  .c-module:last-child { border: none; margin-bottom: 0; padding-bottom: 0; }
  .c-mod-title {
    font-weight: 700; color: var(--rose); margin-bottom: 6px;
    font-size: 14px; display: flex; align-items: center; gap: 8px;
  }
  .c-mod-title::before {
    content: ""; display: inline-block; width: 4px; height: 16px;
    border-radius: 2px; background: var(--rose); flex-shrink: 0;
  }
  .c-lesson {
    padding: 3px 0 3px 16px; color: #5D4A4C; font-size: 13px;
    position: relative;
  }
  .c-lesson::before {
    content: attr(data-n); position: absolute; left: 0; top: 5px;
    font-size: 11px; color: var(--rose); font-weight: 600; width: 14px;
  }
  .c-lesson-count {
    font-size: 11px; font-weight: 400; color: var(--text-muted);
  }

  /* Letter */
  .letter-section { max-width: 720px; margin: 0 auto 64px; padding: 0 20px; }
  .letter-card {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 36px 24px; box-shadow: var(--shadow);
  }
  .letter-card .letter-signature {
    font-size: 13px; color: var(--text-muted); margin-bottom: 24px;
    display: flex; align-items: center; gap: 10px;
  }
  .letter-card .letter-signature::before {
    content: ""; display: block; width: 28px; height: 1.5px; background: var(--rose);
  }
  .letter-card h3 {
    font-size: 19px; font-weight: 700; color: var(--rose); margin-bottom: 18px;
    padding-bottom: 14px; border-bottom: 1px solid var(--rose-light);
  }
  .letter-card h4 {
    font-size: 15px; font-weight: 700; margin: 24px 0 8px; color: var(--text);
  }
  .letter-card p {
    color: var(--text-muted); font-size: 14px; margin-bottom: 8px;
  }
  .letter-quote {
    background: var(--rose-light); border-left: 3px solid var(--rose);
    padding: 14px 18px; margin: 14px 0; border-radius: 0 10px 10px 0;
    font-size: 14px; color: var(--text);
  }
  .letter-closing {
    text-align: right; color: var(--rose); font-weight: 600;
    font-size: 15px; margin-top: 24px; padding-top: 20px;
    border-top: 1px solid var(--rose-light);
  }

  /* FAQ */
  .faq-item {
    background: var(--card); border: 1px solid var(--border); border-radius: 14px;
    padding: 18px 22px; margin-bottom: 10px;
  }
  .faq-item h4 { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
  .faq-item p { font-size: 13px; color: var(--text-muted); margin: 0; }

  /* CTA */
  .cta { max-width: 720px; margin: 0 auto 64px; padding: 0 20px; text-align: center; }
  .cta-inner {
    background: linear-gradient(135deg, #C48189, #B06A73); border-radius: 24px;
    padding: 48px 28px; color: #fff;
  }
  .cta-inner h2 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
  .cta-inner p { font-size: 15px; opacity: .9; margin-bottom: 22px; }
  .cta-inner .btn-white {
    background: #fff; color: var(--rose); border: none;
    padding: 14px 36px; border-radius: 24px; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all .2s;
  }
  .cta-inner .btn-white:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.15); }

  /* Footer */
  .footer { border-top: 1px solid var(--border); background: #fff; padding: 36px 20px 28px; text-align: center; }
  .footer p { color: var(--text-muted); font-size: 13px; margin: 3px 0; }

  /* Mobile */
  @media (max-width: 640px) {
    .nav-links { display: none; }
    .hero h1 { font-size: 23px; }
    .hero p { font-size: 14px; }
    .hero { padding: 40px 16px 32px; }
    .hero-actions { flex-direction: column; align-items: center; }
    .hero-actions .btn-primary,
    .hero-actions .btn-outline { width: 100%; max-width: 280px; }
    .section { padding: 0 16px 40px; }
    .section-header h2 { font-size: 21px; }
    .pains-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .pain-item { padding: 16px 10px; }
    .pain-icon { font-size: 24px; }
    .pain-item h4 { font-size: 13px; }
    .pain-item p { font-size: 11px; }
    .product-stack { padding: 0 12px 48px; }
    .product-card-full { padding: 20px 16px; margin-bottom: 16px; }
    .pch { flex-direction: column; align-items: flex-start; }
    .pch-price { text-align: left; }
    .pch-name { font-size: 19px; }
    .pch-price .num { font-size: 28px; }
    .pch-desc { font-size: 12px; }
    .pch-benefits li { font-size: 13px; }
    .pch-extra { padding: 12px; font-size: 12px; }
    .pch-extra strong { font-size: 13px; }
    .curriculum-box { padding: 14px 14px; font-size: 12px; }
    .c-mod-title { font-size: 13px; }
    .c-lesson { font-size: 12px; padding: 2px 0 2px 14px; }
    .c-lesson::before { font-size: 10px; top: 4px; }
    .pch-btn { font-size: 14px; padding: 12px; }
    .letter-card { padding: 24px 16px; }
    .letter-card h3 { font-size: 17px; }
    .letter-card h4 { font-size: 14px; }
    .letter-card p { font-size: 13px; }
    .letter-quote { font-size: 13px; padding: 12px 14px; }
    .cta { padding: 0 16px 48px; }
    .cta-inner { padding: 36px 20px; }
    .cta-inner h2 { font-size: 20px; }
    .faq-item { padding: 14px 16px; }
    .faq-item h4 { font-size: 14px; }
    .faq-item p { font-size: 12px; }
  }
  @media (max-width: 360px) {
    .pains-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
    .pain-item { padding: 12px 8px; }
    .product-card-full { padding: 16px 12px; }
    .pch-name { font-size: 17px; }
    .pch-price .num { font-size: 26px; }
    .hero h1 { font-size: 20px; }
  }
`;

/* onclick 里的字符串转义，防止文案里的引号破坏 JS */
function jsQuote(s) {
  return String(s == null ? '' : s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderModules(p) {
  if (!p.modules || !p.modules.length) return '';
  var globalNo = 0;
  var body = p.modules.map(function (m) {
    var localNo = 0;
    var lessons = (m.lessons || []).map(function (t) {
      var n = p.numbering === 'global' ? (++globalNo) : (++localNo);
      return '<div class="c-lesson" data-n="' + n + '">' + esc(t) + '</div>';
    }).join('');
    return '<div class="c-module">' +
      '<div class="c-mod-title">' + esc(m.title) +
      ' <span class="c-lesson-count">（' + esc(m.count) + '节课）</span></div>' +
      lessons + '</div>';
  }).join('');
  return '<div class="curriculum-box">' + body + '</div>';
}

function renderProduct(p) {
  var benefits = (p.benefits || []).map(function (b) {
    return '<li>' + esc(b) + '</li>';
  }).join('');
  var extra = p.extra && p.extra.title
    ? '<div class="pch-extra"><strong>' + esc(p.extra.title) + '</strong>' + esc(p.extra.text || '') + '</div>'
    : '';
  return '<div class="product-card-full' + (p.featured ? ' featured' : '') + '">' +
    '<div class="pch">' +
      '<div class="pch-name">' + esc(p.name) + '</div>' +
      '<div class="pch-price"><span class="num">' + esc(p.price) + '</span>' +
      '<span class="unit">' + esc(p.unit) + '</span></div>' +
    '</div>' +
    '<p class="pch-desc">' + esc(p.desc) + '</p>' +
    '<div class="pch-label">你获得的权益</div>' +
    '<ul class="pch-benefits">' + benefits + '</ul>' +
    extra +
    renderModules(p) +
    '<button class="pch-btn ' + (p.featured ? 'primary' : 'outline') + '" style="margin-top:14px" ' +
      'onclick="alert(\'' + jsQuote(p.btnNote) + '\')">' + esc(p.btn) + '</button>' +
  '</div>';
}

function renderContent(C) {
  var navItems = (C.nav || []).map(function (n) {
    return '<li><a href="' + esc(n.href) + '">' + esc(n.label) + '</a></li>';
  }).join('');

  var letterBlocks = (C.letter.blocks || []).map(function (b) {
    if (b.type === 'h4') return '<h4>' + b.text + '</h4>';
    if (b.type === 'quote') return '<div class="letter-quote">' + b.text + '</div>';
    return '<p>' + b.text + '</p>';
  }).join('');

  var pains = (C.pains.items || []).map(function (it) {
    return '<div class="pain-item"><div class="pain-icon">' + esc(it.icon) + '</div>' +
      '<h4>' + esc(it.title) + '</h4><p>' + esc(it.desc) + '</p></div>';
  }).join('');

  var products = (C.products || []).map(renderProduct).join('');

  var faqs = (C.faq.items || []).map(function (it) {
    return '<div class="faq-item"><h4>' + esc(it.q) + '</h4><p>' + esc(it.a) + '</p></div>';
  }).join('');

  return '' +
  '<nav class="nav"><div class="nav-inner">' +
    '<div class="nav-logo">' + esc(C.meta.logo) + '</div>' +
    '<ul class="nav-links">' + navItems + '</ul>' +
    '<button class="nav-cta" onclick="document.getElementById(\'cta-bottom\').scrollIntoView({behavior:\'smooth\'})">' + esc(C.navCta) + '</button>' +
  '</div></nav>' +

  '<section class="hero">' +
    '<div class="hero-badge">' + esc(C.hero.badge) + '</div>' +
    '<h1>' + esc(C.hero.title1) + '<br>' + esc(C.hero.title2) + '<span>' + esc(C.hero.highlight) + '</span></h1>' +
    '<p>' + esc(C.hero.desc1) + '<br>' + esc(C.hero.desc2) + '</p>' +
    '<div class="hero-actions">' +
      '<button class="btn-primary" onclick="document.getElementById(\'products\').scrollIntoView({behavior:\'smooth\'})">' + esc(C.hero.btn1) + '</button>' +
      '<button class="btn-outline" onclick="document.getElementById(\'letter\').scrollIntoView({behavior:\'smooth\'})">' + esc(C.hero.btn2) + '</button>' +
    '</div>' +
  '</section>' +

  '<section class="letter-section" id="letter"><div class="letter-card">' +
    '<div class="letter-signature">' + esc(C.letter.signature) + '</div>' +
    '<h3>' + esc(C.letter.title) + '</h3>' +
    letterBlocks +
    '<div class="letter-closing">' + esc(C.letter.closing) + '</div>' +
  '</div></section>' +

  '<section class="section"><div class="section-header">' +
    '<h2>' + esc(C.pains.title) + '</h2><p>' + esc(C.pains.subtitle) + '</p>' +
  '</div><div class="pains-grid">' + pains + '</div></section>' +

  '<div class="product-stack" id="products">' + products + '</div>' +

  '<section class="section" id="faq"><div class="section-header">' +
    '<h2>' + esc(C.faq.title) + '</h2></div>' + faqs +
  '</section>' +

  '<section class="cta" id="cta-bottom"><div class="cta-inner">' +
    '<h2>' + esc(C.cta.title) + '</h2>' +
    '<p>' + esc(C.cta.desc) + '</p>' +
    '<button class="btn-white" onclick="alert(\'' + jsQuote(C.cta.btnNote) + '\')">' + esc(C.cta.btn) + '</button>' +
  '</div></section>' +

  '<footer class="footer">' +
    '<p style="font-weight:600;color:var(--rose);font-size:15px;">' + esc(C.footer.brand) + '</p>' +
    '<p>' + esc(C.footer.tagline) + '</p>' +
    '<p style="margin-top:6px;">' + esc(C.footer.copyright) + '</p>' +
  '</footer>';
}

/* 生成完整 HTML 文档，供编辑器预览使用 */
function buildFullHTML(C) {
  return '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n' +
    '<meta charset="UTF-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '<title>' + esc(C.meta.title) + '</title>\n' +
    '<style>' + SITE_STYLE + '</style>\n</head>\n<body>\n' +
    renderContent(C) + '\n</body>\n</html>';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SITE_STYLE: SITE_STYLE, renderContent: renderContent, buildFullHTML: buildFullHTML };
}
