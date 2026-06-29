/* ═══════════════════════════════════════════════════════════════
   XREZZKY STORE — shell.js  FINAL
   Persistent topbar + sidebar untuk semua halaman.
   - Desktop (≥901px): topbar fixed + sidebar fixed + content push
   - Mobile  (≤900px): sh-bar & sh-side hidden, mobileHdr tiap
     halaman yang tampil. sh-mob hanya di halaman tanpa mobileHdr.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Konstanta ── */
  var SUPA_URL = 'https://pvkhsjiftfzjpgkoiawq.supabase.co';
  var SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a2hzamlmdGZ6anBna29pYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NzMwMjQsImV4cCI6MjA5NzU0OTAyNH0.Fo82CROzoQE90ckYYv7rlnDkLxP0JZ2tN-T2hgnk-fA';
  var CLD  = 'https://res.cloudinary.com/drjmclzbi/image/upload/';
  var PAGE = location.pathname.split('/').pop().replace('.html','') || 'index';
  var SW   = 214; /* sidebar width px */
  var TH   = 52;  /* topbar height px */

  /* ── Halaman yang punya mobileHdr SENDIRI (tidak perlu sh-mob) ── */
  var HAS_OWN_HDR = [
    'deposit','riwayat','profil','seller-dashboard',
    'admin-panel','cs-dashboard','info-admin','deposit-admin'
  ];
  var needMob = HAS_OWN_HDR.indexOf(PAGE) === -1; /* true → inject sh-mob */

  /* ══════════════════════════════════════════════════
     CSS — inject sekali ke <head>
  ══════════════════════════════════════════════════ */
  var CSS = '\n' +
  /* ── Reset dasar ── */
  '*, *::before, *::after { box-sizing: border-box; }\n' +

  /* ══ MOBILE (≤900px) ══ */
  '@media (max-width: 900px) {\n' +
  '  #sh-bar, #sh-side { display: none !important; }\n' +
  '  #sh-mob { display: flex !important; }\n' +
  /* mobileHdr tiap halaman: tampil di mobile, tersembunyi di desktop (via @min-width di bawah) */
  '  #mobileHdr, #mobilePageHeader { display: flex !important; }\n' +
  /* Reset push — mobile tidak ada margin kiri */
  '  body.sh-on { padding-top: 0 !important; }\n' +
  '  body.sh-on .page, body.sh-on #pageRoot, body.sh-on #mainContent,\n' +
  '  body.sh-on #guestWall, body.sh-on main, body.sh-on #main,\n' +
  '  body.sh-on #wrapper { margin-left: 0 !important; width: 100% !important; max-width: 100% !important; }\n' +
  '}\n' +

  /* ══ sh-mob — brand bar mobile (hanya halaman tanpa mobileHdr) ══ */
  '#sh-mob {\n' +
  '  display: none; position: sticky; top: 0; z-index: 620;\n' +
  '  height: 48px; background: #0f1319; border-bottom: 1px solid #1e2736;\n' +
  '  align-items: center; padding: 0 14px;\n' +
  '  font-family: "Poppins", sans-serif; box-sizing: border-box; width: 100%;\n' +
  '}\n' +

  /* ══ Mobile header (asli tiap halaman) — hidden di desktop ══ */
  '@media (min-width: 901px) {\n' +
  '  #mobileHdr, #mobilePageHeader { display: none !important; }\n' +
  '  #sh-mob { display: none !important; }\n' +
  '}\n' +

  /* ── Brand shared CSS ── */
  '.smb-brand { display: flex; align-items: center; gap: 7px; font-family: "Syne", sans-serif; font-size: 14px; font-weight: 800; color: #f5f7fa; text-decoration: none; white-space: nowrap; flex-shrink: 0; }\n' +
  '.smb-dot { width: 7px; height: 7px; border-radius: 50%; background: #4a7dff; flex-shrink: 0; }\n' +
  '.smb-brand em { font-style: normal; color: #4a7dff; }\n' +

  /* ── Mobile header konsisten (ditetapkan oleh shell, dapat di-override tiap file) ── */
  '#mobileHdr, #mobilePageHeader {\n' +
  '  height: 48px; background: #0f1319; border-bottom: 1px solid #1e2736;\n' +
  '  display: none; align-items: center; padding: 0 14px; gap: 10px;\n' +
  '  font-family: "Poppins", sans-serif; box-sizing: border-box;\n' +
  '  position: sticky; top: 0; z-index: 610; width: 100%;\n' +
  '}\n' +
  '.mh-title { flex: 1; font-size: 14px; font-weight: 600; text-align: center; color: #f5f7fa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n' +
  '.mhb, .mph-back { display: none !important; }\n' + /* back btn dihapus — pakai xbn */

  /* ══ DESKTOP TOPBAR ══ */
  '#sh-bar {\n' +
  '  position: fixed; top: 0; left: 0; right: 0; z-index: 700;\n' +
  '  height: ' + TH + 'px; background: #0f1319; border-bottom: 1px solid #1e2736;\n' +
  '  display: flex; align-items: center; padding: 0;\n' +
  '  font-family: "Poppins", sans-serif; box-sizing: border-box;\n' +
  '}\n' +

  /* Brand di topbar — lebar = SW agar sejajar sidebar */
  '.sh-brand {\n' +
  '  width: ' + SW + 'px; min-width: ' + SW + 'px; flex-shrink: 0;\n' +
  '  display: flex; align-items: center; gap: 7px;\n' +
  '  font-family: "Syne", sans-serif; font-size: 14px; font-weight: 800;\n' +
  '  color: #f5f7fa; text-decoration: none; white-space: nowrap;\n' +
  '  padding: 0 16px; height: 100%; box-sizing: border-box;\n' +
  '  border-right: 1px solid #1e2736;\n' +
  '}\n' +
  '.sh-dot { width: 7px; height: 7px; border-radius: 50%; background: #4a7dff; flex-shrink: 0; }\n' +
  '.sh-brand em { font-style: normal; color: #4a7dff; }\n' +

  /* Search bar (hanya index) */
  '#sh-srch { flex: 1; position: relative; padding: 0 12px; display: none; }\n' +
  '#sh-srch input {\n' +
  '  width: 100%; background: #1a2233; border: 1px solid #1e2736; border-radius: 8px;\n' +
  '  padding: 7px 34px 7px 12px; color: #f5f7fa; font-family: "Poppins", sans-serif;\n' +
  '  font-size: 13px; outline: none; transition: border .18s; box-sizing: border-box;\n' +
  '}\n' +
  '#sh-srch input:focus { border-color: #4a7dff; }\n' +
  '#sh-srch input::placeholder { color: #9ba6b2; }\n' +
  '#sh-srch-btn { position: absolute; right: 22px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #9ba6b2; cursor: pointer; font-size: 13px; }\n' +
  '#sh-srch-btn:hover { color: #4a7dff; }\n' +
  '#sh-sp { flex: 1; }\n' +

  /* Guest button */
  '#sh-guest { display: none; align-items: center; gap: 7px; padding: 6px 14px; margin-right: 12px; border-radius: 8px; background: #4a7dff; color: #fff; border: none; font-size: 13px; font-weight: 600; cursor: pointer; font-family: "Poppins", sans-serif; flex-shrink: 0; }\n' +
  '#sh-guest:hover { background: #5d8fff; }\n' +

  /* Profile pill */
  '#sh-pw { position: relative; flex-shrink: 0; margin-right: 12px; display: none; }\n' +
  '#sh-pb { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 5px 11px 5px 5px; border-radius: 24px; background: #1a2233; border: 1px solid #1e2736; transition: border-color .18s; user-select: none; }\n' +
  '#sh-pb:hover { border-color: #4a7dff; }\n' +
  '#sh-av { width: 28px; height: 28px; border-radius: 50%; background: #4a7dff; border: 2px solid transparent; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; }\n' +
  '#sh-av img { width: 100%; height: 100%; object-fit: cover; display: block; }\n' +
  '#sh-av.av-ok { border-color: #4a7dff; }\n' +
  '#sh-un { font-size: 13px; font-weight: 600; color: #f5f7fa; max-width: 88px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n' +
  '#sh-rb { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; background: rgba(74,125,255,.15); color: #4a7dff; text-transform: uppercase; letter-spacing: .04em; white-space: nowrap; }\n' +
  '#sh-rb.seller { background: rgba(245,158,11,.15); color: #f59e0b; }\n' +
  '#sh-rb.admin  { background: rgba(239,68,68,.15);  color: #ef4444; }\n' +
  '#sh-rb.owner  { background: rgba(168,85,247,.15); color: #a855f7; }\n' +
  '#sh-rb.cs     { background: rgba(34,197,94,.15);  color: #22c55e; }\n' +
  '#sh-cv { font-size: 10px; color: #9ba6b2; transition: transform .2s; flex-shrink: 0; }\n' +
  '#sh-pw.open #sh-cv { transform: rotate(180deg); }\n' +

  /* Dropdown */
  '#sh-dd { position: absolute; top: calc(100% + 8px); right: 0; width: 240px; background: #141920; border: 1px solid #1e2736; border-radius: 13px; box-shadow: 0 16px 48px rgba(0,0,0,.7); overflow: hidden; display: none; flex-direction: column; z-index: 9999; }\n' +
  '#sh-pw.open #sh-dd { display: flex; animation: ddIn .16s ease; }\n' +
  '@keyframes ddIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }\n' +
  '.dh { padding: 14px 16px 12px; border-bottom: 1px solid #1e2736; background: #1a2030; }\n' +
  '.dh-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }\n' +
  '.d-av { width: 36px; height: 36px; border-radius: 50%; border: 2px solid #4a7dff; background: #4a7dff; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }\n' +
  '.d-av img { width: 100%; height: 100%; object-fit: cover; display: block; }\n' +
  '.d-inf { min-width: 0; }\n' +
  '.d-name { font-size: 13px; font-weight: 700; color: #f5f7fa; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n' +
  '.d-mail { font-size: 11px; color: #9ba6b2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n' +
  '.d-bal { display: flex; align-items: center; justify-content: space-between; background: rgba(74,125,255,.08); border: 1px solid rgba(74,125,255,.18); border-radius: 8px; padding: 8px 12px; }\n' +
  '.d-bal .bl { font-size: 11px; color: #9ba6b2; }\n' +
  '.d-bal .bv { font-size: 14px; font-weight: 700; color: #4a7dff; }\n' +
  '.d-sec { padding: 5px 0; border-bottom: 1px solid #1e2736; }\n' +
  '.d-sec:last-child { border-bottom: none; }\n' +
  '.d-lbl { font-size: 10px; font-weight: 600; color: #9ba6b2; text-transform: uppercase; letter-spacing: .06em; padding: 5px 16px 3px; }\n' +
  '.d-a { display: flex; align-items: center; gap: 9px; padding: 9px 16px; font-size: 13px; color: #9ba6b2; text-decoration: none; transition: all .15s; background: none; border: none; width: 100%; text-align: left; font-family: "Poppins", sans-serif; cursor: pointer; box-sizing: border-box; }\n' +
  '.d-a:hover { background: #1d2430; color: #f5f7fa; }\n' +
  '.d-a i { width: 15px; text-align: center; font-size: 13px; }\n' +
  '.d-a.red { color: #ef4444; }\n' +
  '.d-a.red:hover { background: rgba(239,68,68,.07); }\n' +

  /* ══ SIDEBAR ══ */
  '#sh-side {\n' +
  '  position: fixed; top: ' + TH + 'px; left: 0; bottom: 0; width: ' + SW + 'px; z-index: 600;\n' +
  '  background: #0f1319; border-right: 1px solid #1e2736;\n' +
  '  overflow-y: auto; overflow-x: hidden; padding: 10px 8px 24px;\n' +
  '  display: flex; flex-direction: column; gap: 1px;\n' +
  '  font-family: "Poppins", sans-serif;\n' +
  '}\n' +
  '#sh-side::-webkit-scrollbar { width: 3px; }\n' +
  '#sh-side::-webkit-scrollbar-thumb { background: #1e2736; border-radius: 3px; }\n' +
  '.s-lbl { font-size: 10px; font-weight: 600; letter-spacing: .08em; color: #9ba6b2; text-transform: uppercase; padding: 10px 10px 4px; }\n' +
  '.s-a { display: flex; align-items: center; gap: 9px; padding: 9px 12px; border-radius: 8px; color: #9ba6b2; font-size: 13px; font-weight: 500; text-decoration: none; transition: all .16s; border: none; background: none; width: 100%; text-align: left; font-family: "Poppins", sans-serif; cursor: pointer; box-sizing: border-box; }\n' +
  '.s-a:hover { background: #1a2233; color: #f5f7fa; }\n' +
  '.s-a.on { background: rgba(74,125,255,.12); color: #4a7dff; }\n' +
  '.s-a i { width: 15px; text-align: center; font-size: 13px; flex-shrink: 0; }\n' +
  '.s-sep { height: 1px; background: #1e2736; margin: 7px 4px; }\n' +
  '.s-bdg { margin-left: auto; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px; background: rgba(245,158,11,.2); color: #f59e0b; }\n' +
  '.s-bdg.r { background: rgba(239,68,68,.2); color: #ef4444; }\n' +

  /* ══ DESKTOP CONTENT PUSH ══ */
  '@media (min-width: 901px) {\n' +
  '  body.sh-on { padding-top: ' + TH + 'px !important; }\n' +
  /* Sembunyikan elemen page sendiri yang tidak dipakai di desktop */
  '  body.sh-on nav:not(#sh-bar)    { display: none !important; }\n' +
  '  body.sh-on aside:not(#sh-side) { display: none !important; }\n' +
  '  body.sh-on #xbn                { display: none !important; }\n' +
  '  body.sh-on #topbar:not(#sh-bar){ display: none !important; }\n' +
  '  body.sh-on #sidebar:not(#sh-side){ display: none !important; }\n' +
  /* Push content — SEMUA kemungkinan wrapper */
  '  body.sh-on .page, body.sh-on #pageRoot,\n' +
  '  body.sh-on #mainContent, body.sh-on #guestWall,\n' +
  '  body.sh-on main:not(#sh-side), body.sh-on #main, body.sh-on #wrapper {\n' +
  '    margin-left: ' + SW + 'px !important;\n' +
  '    width: calc(100% - ' + SW + 'px) !important;\n' +
  '    max-width: none !important; min-width: 0 !important;\n' +
  '    box-sizing: border-box !important; flex: none !important;\n' +
  '  }\n' +
  /* .page selalu block agar tidak ada flex layout yang rusak */
  '  body.sh-on .page { display: block !important; }\n' +
  '}\n';

  var st = document.createElement('style');
  st.id = 'shell-css';
  st.textContent = CSS;
  document.head.appendChild(st);

  /* ══════════════════════════════════════════════════
     INJECT HTML ELEMENTS
  ══════════════════════════════════════════════════ */

  /* ── sh-mob: hanya halaman tanpa mobileHdr sendiri ── */
  var mob = null;
  if (needMob) {
    mob = document.createElement('div');
    mob.id = 'sh-mob';
    mob.innerHTML =
      '<a class="smb-brand" href="index.html">' +
        '<div class="smb-dot"></div>XREZZKY<em>STORE</em>' +
      '</a>';
  }

  /* ── Topbar desktop ── */
  var bar = document.createElement('div');
  bar.id = 'sh-bar';
  bar.innerHTML =
    '<a class="sh-brand" href="index.html"><div class="sh-dot"></div>XREZZKY<em>STORE</em></a>' +
    '<div id="sh-srch">' +
      '<input id="shSrchInp" type="text" placeholder="Cari produk atau toko (@username)..."' +
        ' onkeydown="if(event.key===\'Enter\')shDoSearch(this.value)"/>' +
      '<button id="sh-srch-btn" onclick="shDoSearch(document.getElementById(\'shSrchInp\').value)">' +
        '<i class="fas fa-search"></i>' +
      '</button>' +
    '</div>' +
    '<div id="sh-sp"></div>' +
    '<button id="sh-guest" onclick="shOpenLogin()"><i class="fas fa-sign-in-alt"></i> Masuk</button>' +
    '<div id="sh-pw">' +
      '<div id="sh-pb">' +
        '<div id="sh-av"><i class="fas fa-user" style="font-size:11px"></i></div>' +
        '<span id="sh-un">User</span>' +
        '<span id="sh-rb" style="display:none"></span>' +
        '<i class="fas fa-chevron-down" id="sh-cv"></i>' +
      '</div>' +
      '<div id="sh-dd">' +
        '<div class="dh">' +
          '<div class="dh-top">' +
            '<div class="d-av" id="shDdAv"><i class="fas fa-user"></i></div>' +
            '<div class="d-inf"><div class="d-name" id="shDdName">—</div><div class="d-mail" id="shDdMail">—</div></div>' +
          '</div>' +
          '<div class="d-bal"><span class="bl"><i class="fas fa-wallet" style="margin-right:5px;opacity:.6"></i>Saldo</span><span class="bv" id="shDdBal">Rp 0</span></div>' +
        '</div>' +
        '<div class="d-sec">' +
          '<div class="d-lbl">Akun Saya</div>' +
          '<a class="d-a" href="profil.html"><i class="fas fa-user-circle"></i> Profil Saya</a>' +
          '<a class="d-a" href="profil.html?tab=editprofil"><i class="fas fa-cog"></i> Pengaturan Akun</a>' +
        '</div>' +
        '<div class="d-sec"><button class="d-a red" onclick="shLogout()"><i class="fas fa-sign-out-alt"></i> Keluar</button></div>' +
      '</div>' +
    '</div>';

  /* ── Sidebar ── */
  var side = document.createElement('div');
  side.id = 'sh-side';

  /* ── Insert ke body — urutan: mob (atas) → bar → side → konten ── */
  var first = document.body.firstChild;
  document.body.insertBefore(side, first);
  document.body.insertBefore(bar,  first);
  if (mob) document.body.insertBefore(mob, first);
  document.body.classList.add('sh-on');

  /* ══════════════════════════════════════════════════
     DROPDOWN LOGIC
  ══════════════════════════════════════════════════ */
  document.getElementById('sh-pb').addEventListener('click', function (e) {
    e.stopPropagation();
    document.getElementById('sh-pw').classList.toggle('open');
  });
  document.addEventListener('click', function (e) {
    var pw = document.getElementById('sh-pw');
    if (pw && !pw.contains(e.target)) pw.classList.remove('open');
  });

  /* ══════════════════════════════════════════════════
     SEARCH (hanya index.html)
  ══════════════════════════════════════════════════ */
  window.shDoSearch = function (q) {
    if (!q || !q.trim()) return;
    q = q.trim();
    if (PAGE === 'index') {
      var ns = document.getElementById('navSearch');
      if (ns) ns.value = q;
      if (typeof doSearch === 'function') { doSearch(); return; }
    }
    location.href = 'index.html?q=' + encodeURIComponent(q);
  };

  if (PAGE === 'index') {
    document.getElementById('sh-srch').style.display = '';
    document.getElementById('sh-sp').style.display   = 'none';
    /* Handle ?q= dari URL */
    var urlQ = new URLSearchParams(location.search).get('q');
    if (urlQ) {
      document.getElementById('shSrchInp').value = urlQ;
      document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () { shDoSearch(urlQ); }, 800);
      });
    }
  }

  /* ══════════════════════════════════════════════════
     SIDEBAR BUILDER
  ══════════════════════════════════════════════════ */
  function buildSidebar(role) {
    var isSeller = ['seller','admin','owner'].indexOf(role) > -1;
    var isAdmin  = ['admin','owner'].indexOf(role) > -1;
    var isOwner  = role === 'owner';
    var isCs     = ['cs','admin','owner'].indexOf(role) > -1;

    function sa(icon, label, href, active, bdgId, bdgCls) {
      var b = bdgId
        ? '<span class="s-bdg' + (bdgCls ? ' '+bdgCls : '') + '" id="' + bdgId + '" style="display:none">0</span>'
        : '';
      return '<a class="s-a' + (active ? ' on' : '') + '" href="' + href + '">' +
        '<i class="' + icon + '"></i>' + label + b + '</a>';
    }

    var h = '<div class="s-lbl">Navigasi</div>';
    h += sa('fas fa-home',    'Beranda',      'index.html',   PAGE==='index');
    h += sa('fas fa-bell',    'Info & Update','index.html#info', false);
    h += sa('fas fa-wallet',  'Deposit',      'deposit.html', PAGE==='deposit');
    h += sa('fas fa-receipt', 'Riwayat',      'riwayat.html', PAGE==='riwayat');

    if (isSeller) {
      h += '<div class="s-sep"></div><div class="s-lbl">Seller</div>';
      h += sa('fas fa-store',         'Seller Dashboard', 'seller-dashboard.html',            PAGE==='seller-dashboard');
      h += sa('fas fa-boxes-stacked', 'Produk Saya',      'seller-dashboard.html?tab=produk', false);
      h += sa('fas fa-inbox',         'Pesanan Masuk',    'seller-dashboard.html?tab=orders', false, 'sbOrd');
    }
    if (isAdmin) {
      h += '<div class="s-sep"></div><div class="s-lbl">' + (isOwner?'Owner':'Admin') + '</div>';
      h += sa('fas fa-chart-pie', 'Admin Panel',    'admin-panel.html',   PAGE==='admin-panel');
      h += sa('fas fa-newspaper', 'Info Admin',     'info-admin.html',    PAGE==='info-admin');
      h += sa('fas fa-qrcode',    'Kelola Deposit', 'deposit-admin.html', PAGE==='deposit-admin', 'sbDep', 'r');
    }
    if (isCs) {
      h += '<div class="s-sep"></div><div class="s-lbl">Customer Service</div>';
      h += sa('fas fa-headset', 'CS Dashboard', 'cs-dashboard.html', PAGE==='cs-dashboard');
    }

    side.innerHTML = h;

    /* Info & Update — kalau di index, buka info sheet */
    var infoLink = side.querySelector('[href="index.html#info"]');
    if (infoLink) {
      infoLink.addEventListener('click', function (e) {
        if (PAGE === 'index' && typeof openInfoSheet === 'function') {
          e.preventDefault();
          openInfoSheet();
        }
      });
    }
  }

  /* ══════════════════════════════════════════════════
     SUPABASE AUTH
  ══════════════════════════════════════════════════ */
  function getSb() {
    if (window.sb) return window.sb;
    if (typeof supabase !== 'undefined') {
      window.sb = supabase.createClient(SUPA_URL, SUPA_KEY);
      return window.sb;
    }
    return null;
  }

  function fmtRp(v) { return 'Rp ' + Number(v||0).toLocaleString('id-ID'); }

  function setAv(el, avUrl, name) {
    if (!el) return;
    var l = (name||'U')[0].toUpperCase();
    if (avUrl) {
      el.innerHTML = '<img src="' + CLD + avUrl + '" alt="">';
      el.classList.add('av-ok');
    } else {
      el.innerHTML = '<span style="font-size:12px;font-weight:700">' + l + '</span>';
      el.style.background = '#4a7dff';
    }
  }

  async function shInit() {
    var client = getSb();
    if (!client) { showGuest(); buildSidebar('buyer'); return; }
    try {
      var res     = await client.auth.getSession();
      var session = res.data && res.data.session;
      if (!session) { showGuest(); buildSidebar('buyer'); return; }

      var pRes = await client.from('profiles')
        .select('id,username,full_name,email,avatar_url,role,balance')
        .eq('id', session.user.id).maybeSingle();
      var p = pRes.data;

      window._shProf = p;
      showUser(session.user, p);
      buildSidebar((p && p.role) || 'buyer');
      loadBadges(p);
    } catch (e) {
      console.warn('[shell]', e);
      showGuest();
      buildSidebar('buyer');
    }
  }

  function showGuest() {
    document.getElementById('sh-guest').style.display = 'flex';
    document.getElementById('sh-pw').style.display    = 'none';
  }

  function showUser(user, p) {
    document.getElementById('sh-guest').style.display = 'none';
    document.getElementById('sh-pw').style.display    = 'flex';

    var name = (p && (p.username || p.full_name)) || (user.email||'').split('@')[0] || 'User';
    var role = (p && p.role) || 'buyer';
    var av   = p && p.avatar_url;

    document.getElementById('sh-un').textContent = name;

    var rb = document.getElementById('sh-rb');
    if (role !== 'buyer') { rb.textContent = role; rb.className = role; rb.style.display = ''; }
    else rb.style.display = 'none';

    setAv(document.getElementById('sh-av'), av, name);
    document.getElementById('shDdName').textContent = name;
    document.getElementById('shDdMail').textContent = (p && p.email) || user.email || '—';
    document.getElementById('shDdBal').textContent  = fmtRp(p && p.balance);
    setAv(document.getElementById('shDdAv'), av, name);

    /* Re-push layout setelah auth (profil: mainContent baru ditampilkan) */
    if (window.innerWidth >= 901) setTimeout(applyDesktopPush, 80);
  }

  async function loadBadges(p) {
    if (!p) return;
    var client = getSb(); if (!client) return;
    var role = (p && p.role) || 'buyer';
    try {
      if (['seller','admin','owner'].indexOf(role) > -1) {
        var r1 = await client.from('orders')
          .select('id', {count:'exact',head:true})
          .eq('seller_id', p.id).in('status', ['pending','pending_mc']);
        if ((r1.count||0) > 0) {
          var e = document.getElementById('sbOrd');
          if (e) { e.textContent = r1.count; e.style.display = ''; }
        }
      }
      if (['admin','owner'].indexOf(role) > -1) {
        var r2 = await client.from('deposit_requests')
          .select('id', {count:'exact',head:true}).eq('status','waiting_review');
        if ((r2.count||0) > 0) {
          var e2 = document.getElementById('sbDep');
          if (e2) { e2.textContent = r2.count; e2.style.display = ''; }
        }
      }
    } catch (e) {}
  }

  /* ══════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════ */
  window.shLogout = async function () {
    var c = getSb();
    try { if (c) await c.auth.signOut(); } catch (e) {}
    location.href = 'index.html';
  };

  window.shOpenLogin = function () {
    if (typeof openAuth       === 'function') { openAuth('login'); return; }
    if (typeof openLoginModal === 'function') { openLoginModal();  return; }
    location.href = 'index.html';
  };

  /* ══════════════════════════════════════════════════
     LAYOUT PUSH — desktop only, sekali panggil
  ══════════════════════════════════════════════════ */
  function applyDesktopPush() {
    if (window.innerWidth < 901) return;

    /* Sembunyikan elemen asli halaman yang digantikan shell */
    document.querySelectorAll('nav:not(#sh-bar)').forEach(function (n) { n.style.display = 'none'; });
    document.querySelectorAll('aside:not(#sh-side)').forEach(function (n) { n.style.display = 'none'; });
    var ownTopbar  = document.getElementById('topbar');
    var ownSidebar = document.getElementById('sidebar');
    if (ownTopbar  && ownTopbar.id  !== 'sh-bar')  ownTopbar.style.display  = 'none';
    if (ownSidebar && ownSidebar.id !== 'sh-side') ownSidebar.style.display = 'none';

    /* Push wrapper content ke kanan sidebar */
    var targets = [
      document.querySelector('.page'),
      document.getElementById('pageRoot'),
      document.getElementById('mainContent'),
      document.getElementById('guestWall'),
      document.getElementById('main'),
      document.getElementById('wrapper'),
      document.querySelector('main')
    ];

    targets.forEach(function (el) {
      if (!el) return;
      if (el.id === 'sh-bar' || el.id === 'sh-side') return;
      /* Jangan override display:none — biarkan JS halaman yang kontrol */
      if (el.style.display === 'none') return;
      el.style.marginLeft  = SW + 'px';
      el.style.width       = 'calc(100% - ' + SW + 'px)';
      el.style.maxWidth    = 'none';
      el.style.minWidth    = '0';
      el.style.boxSizing   = 'border-box';
      el.style.flex        = 'none';
    });

    /* .page selalu block */
    var pg = document.querySelector('.page');
    if (pg && pg.style.display !== 'none') pg.style.display = 'block';
  }

  /* ── MutationObserver: watch mainContent profil.html ── */
  function watchMainContent() {
    var targets = [
      document.getElementById('mainContent'),
      document.getElementById('guestWall')
    ].filter(Boolean);

    targets.forEach(function (el) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          if (m.attributeName === 'style' && window.innerWidth >= 901) {
            setTimeout(applyDesktopPush, 30);
          }
        });
      }).observe(el, { attributes: true });
    });
  }

  /* ══════════════════════════════════════════════════
     RUN
  ══════════════════════════════════════════════════ */
  function init() {
    applyDesktopPush();
    watchMainContent();
    setTimeout(shInit, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
