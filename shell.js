/* ═══════════════════════════════════════════════════════════════
   XREZZKY STORE — shell.js  v3.0
   Fix: content full width, profil clickable semua device,
        sidebar proper, mobile tidak terpengaruh
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const SUPA_URL = 'https://pvkhsjiftfzjpgkoiawq.supabase.co';
  const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a2hzamlmdGZ6anBna29pYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NzMwMjQsImV4cCI6MjA5NzU0OTAyNH0.Fo82CROzoQE90ckYYv7rlnDkLxP0JZ2tN-T2hgnk-fA';
  const CLD = 'https://res.cloudinary.com/drjmclzbi/image/upload/';
  const PAGE = location.pathname.split('/').pop().replace('.html','') || 'index';
  const W = window.innerWidth || document.documentElement.clientWidth;
  const IS_DESKTOP = W >= 901;

  /* ── CSS ── */
  document.head.insertAdjacentHTML('beforeend', `<style id="shell-css">
/* ══ SHELL ONLY DESKTOP ≥901px ══ */
@media (max-width:900px){
  #sh-topbar,#sh-sidebar{display:none!important;}
  /* Pastikan mobile content TIDAK tergeser */
  body.sh-on{padding-top:0!important;}
  body.sh-on *{margin-left:initial;}
}

/* ══ TOPBAR ══ */
#sh-topbar{
  position:fixed;top:0;left:0;right:0;z-index:500;
  height:56px;
  background:#141920;
  border-bottom:1px solid #252e3d;
  display:flex;align-items:center;padding:0 18px;gap:10px;
  font-family:'Poppins',sans-serif;box-sizing:border-box;
}
.sh-brand{
  display:flex;align-items:center;gap:7px;
  font-family:'Syne',sans-serif;font-size:15px;font-weight:800;
  color:#f5f7fa;text-decoration:none;white-space:nowrap;flex-shrink:0;
}
.sh-brand .sh-dot{width:7px;height:7px;border-radius:50%;background:#4a7dff;flex-shrink:0;}
.sh-brand em{font-style:normal;color:#4a7dff;}
.sh-srch{flex:1;max-width:340px;position:relative;margin-left:4px;}
.sh-srch input{
  width:100%;background:#1d2430;border:1px solid #2a3442;border-radius:8px;
  padding:7px 34px 7px 12px;color:#f5f7fa;font-family:'Poppins',sans-serif;
  font-size:13px;outline:none;transition:border .18s;box-sizing:border-box;
}
.sh-srch input:focus{border-color:#4a7dff;}
.sh-srch input::placeholder{color:#9ba6b2;}
.sh-srch-btn{
  position:absolute;right:9px;top:50%;transform:translateY(-50%);
  background:none;border:none;color:#9ba6b2;cursor:pointer;font-size:12px;
}
.sh-srch-btn:hover{color:#4a7dff;}
.sh-space{flex:1;}

/* ── Profile pill ── */
#sh-prof-wrap{position:relative;flex-shrink:0;}
#sh-prof-btn{
  display:flex;align-items:center;gap:8px;cursor:pointer;
  padding:5px 12px 5px 6px;border-radius:24px;
  background:#1d2430;border:1px solid #2a3442;
  transition:border-color .18s;user-select:none;
  -webkit-tap-highlight-color:transparent;
}
#sh-prof-btn:hover{border-color:#4a7dff;}
#sh-av{
  width:30px;height:30px;border-radius:50%;
  background:#2a3442;border:2px solid transparent;
  overflow:hidden;display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:700;color:#9ba6b2;flex-shrink:0;
  transition:border-color .2s;
}
#sh-av img{width:100%;height:100%;object-fit:cover;display:block;}
#sh-av.img-loaded{border-color:#4a7dff;}
#sh-uname{
  font-size:13px;font-weight:600;color:#f5f7fa;
  max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
#sh-role-badge{
  font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;
  background:rgba(74,125,255,.15);color:#4a7dff;
  text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;
}
#sh-role-badge.seller{background:rgba(245,158,11,.15);color:#f59e0b;}
#sh-role-badge.admin {background:rgba(239,68,68,.15); color:#ef4444;}
#sh-role-badge.owner {background:rgba(168,85,247,.15);color:#a855f7;}
#sh-role-badge.cs    {background:rgba(34,197,94,.15); color:#22c55e;}
#sh-chev{font-size:10px;color:#9ba6b2;transition:transform .2s;flex-shrink:0;}
#sh-prof-wrap.open #sh-chev{transform:rotate(180deg);}

/* ── DROPDOWN ── */
#sh-dd{
  position:absolute;top:calc(100% + 8px);right:0;
  width:240px;background:#171c24;border:1px solid #2a3442;
  border-radius:13px;box-shadow:0 16px 48px rgba(0,0,0,.6);
  overflow:hidden;display:none;flex-direction:column;z-index:9999;
}
#sh-prof-wrap.open #sh-dd{display:flex;animation:ddIn .16s ease;}
@keyframes ddIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}

.dd-hdr{padding:14px 16px 12px;border-bottom:1px solid #2a3442;background:#1a2030;}
.dd-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.dd-big-av{
  width:36px;height:36px;border-radius:50%;border:2px solid #4a7dff;
  background:#2a3442;overflow:hidden;display:flex;align-items:center;
  justify-content:center;font-size:14px;font-weight:700;color:#9ba6b2;flex-shrink:0;
}
.dd-big-av img{width:100%;height:100%;object-fit:cover;display:block;}
.dd-info{min-width:0;}
.dd-uname{font-size:13px;font-weight:700;color:#f5f7fa;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.dd-uemail{font-size:11px;color:#9ba6b2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.dd-bal{
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(74,125,255,.08);border:1px solid rgba(74,125,255,.18);
  border-radius:8px;padding:8px 12px;
}
.dd-bal .lbl{font-size:11px;color:#9ba6b2;display:flex;align-items:center;gap:5px;}
.dd-bal .val{font-size:14px;font-weight:700;color:#4a7dff;}
.dd-sec{padding:5px 0;border-bottom:1px solid #2a3442;}
.dd-sec:last-child{border-bottom:none;}
.dd-slbl{font-size:10px;font-weight:600;color:#9ba6b2;text-transform:uppercase;letter-spacing:.06em;padding:5px 16px 3px;}
.dd-link{
  display:flex;align-items:center;gap:9px;padding:9px 16px;
  font-size:13px;color:#9ba6b2;text-decoration:none;
  transition:all .15s;background:none;border:none;
  width:100%;text-align:left;font-family:'Poppins',sans-serif;cursor:pointer;
  box-sizing:border-box;
}
.dd-link:hover{background:#1d2430;color:#f5f7fa;}
.dd-link i{width:15px;text-align:center;font-size:13px;}
.dd-link.danger{color:#ef4444;}
.dd-link.danger:hover{background:rgba(239,68,68,.07);}

/* guest btn */
#sh-guest-btn{
  display:flex;align-items:center;gap:7px;padding:7px 14px;
  border-radius:8px;background:#4a7dff;color:#fff;border:none;
  font-size:13px;font-weight:600;cursor:pointer;
  font-family:'Poppins',sans-serif;flex-shrink:0;transition:background .18s;
}
#sh-guest-btn:hover{background:#5d8fff;}

/* ══ SIDEBAR ══ */
#sh-sidebar{
  position:fixed;top:56px;left:0;bottom:0;width:214px;z-index:400;
  background:#141920;border-right:1px solid #252e3d;
  overflow-y:auto;overflow-x:hidden;padding:10px 8px 24px;
  display:flex;flex-direction:column;gap:1px;
  font-family:'Poppins',sans-serif;
}
#sh-sidebar::-webkit-scrollbar{width:3px;}
#sh-sidebar::-webkit-scrollbar-thumb{background:#252e3d;border-radius:3px;}
.sb-lbl{
  font-size:10px;font-weight:600;letter-spacing:.08em;color:#9ba6b2;
  text-transform:uppercase;padding:10px 10px 4px;
}
.sb-a{
  display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:8px;
  color:#9ba6b2;font-size:13px;font-weight:500;text-decoration:none;
  transition:all .16s;border:none;background:none;width:100%;text-align:left;
  font-family:'Poppins',sans-serif;cursor:pointer;box-sizing:border-box;
  position:relative;
}
.sb-a:hover{background:#1d2430;color:#f5f7fa;}
.sb-a.on{background:rgba(74,125,255,.12);color:#4a7dff;}
.sb-a i{width:15px;text-align:center;font-size:13px;flex-shrink:0;}
.sb-sep{height:1px;background:#252e3d;margin:7px 4px;}
.sb-bdg{
  margin-left:auto;font-size:10px;font-weight:700;
  padding:1px 6px;border-radius:10px;
  background:rgba(245,158,11,.2);color:#f59e0b;
}
.sb-bdg.r{background:rgba(239,68,68,.2);color:#ef4444;}

/* ══ CONTENT PUSH — desktop only ══ */
@media (min-width:901px){
  body.sh-on{padding-top:56px!important;}

  /* Semua kemungkinan wrapper content */
  body.sh-on .page{margin-left:214px!important;display:block!important;width:auto!important;}
  body.sh-on #pageRoot{margin-left:214px!important;display:block!important;}
  body.sh-on main:not(#sh-sidebar){margin-left:214px!important;}
  body.sh-on .page-content{margin-left:214px!important;}

  /* Sembunyikan nav/aside asli */
  body.sh-on nav:not(#sh-topbar){display:none!important;}
  body.sh-on aside:not(#sh-sidebar){display:none!important;}
  body.sh-on #xbn,body.sh-on #mobileHeader,body.sh-on #mobilePageHeader{display:none!important;}
}
</style>`);

  /* ── TOPBAR HTML ── */
  const topbar = document.createElement('div');
  topbar.id = 'sh-topbar';
  topbar.innerHTML = `
    <a class="sh-brand" href="index.html"><div class="sh-dot"></div>XREZZKY<em>STORE</em></a>
    <div class="sh-srch" id="shSrch" style="display:none">
      <input id="shSrchInp" type="text" placeholder="Cari produk..."
        onkeydown="if(event.key==='Enter')location.href='index.html?q='+encodeURIComponent(this.value)"/>
      <button class="sh-srch-btn" onclick="location.href='index.html?q='+encodeURIComponent(document.getElementById('shSrchInp').value)">
        <i class="fas fa-search"></i></button>
    </div>
    <div class="sh-space"></div>

    <button id="sh-guest-btn" onclick="shOpenLogin()" style="display:none">
      <i class="fas fa-sign-in-alt"></i> Masuk
    </button>

    <div id="sh-prof-wrap" style="display:none">
      <div id="sh-prof-btn" onclick="shToggleDd(event)">
        <div id="sh-av">?</div>
        <span id="sh-uname">User</span>
        <span id="sh-role-badge" style="display:none">buyer</span>
        <i class="fas fa-chevron-down" id="sh-chev"></i>
      </div>
      <div id="sh-dd">
        <div class="dd-hdr">
          <div class="dd-top">
            <div class="dd-big-av" id="shDdAv">?</div>
            <div class="dd-info">
              <div class="dd-uname" id="shDdName">—</div>
              <div class="dd-uemail" id="shDdEmail">—</div>
            </div>
          </div>
          <div class="dd-bal">
            <span class="lbl"><i class="fas fa-wallet"></i> Saldo</span>
            <span class="val" id="shDdBal">Rp 0</span>
          </div>
        </div>
        <div class="dd-sec">
          <div class="dd-slbl">Akun Saya</div>
          <a class="dd-link" href="profil.html"><i class="fas fa-user-circle"></i> Profil Saya</a>
          <a class="dd-link" href="profil.html#settings"><i class="fas fa-cog"></i> Pengaturan Akun</a>
        </div>
        <div class="dd-sec">
          <button class="dd-link danger" onclick="shLogout()"><i class="fas fa-sign-out-alt"></i> Keluar</button>
        </div>
      </div>
    </div>`;

  /* ── SIDEBAR ── */
  const sidebar = document.createElement('div');
  sidebar.id = 'sh-sidebar';

  /* Insert at top of body */
  document.body.insertBefore(sidebar, document.body.firstChild);
  document.body.insertBefore(topbar, document.body.firstChild);
  document.body.classList.add('sh-on');

  /* ── BUILD SIDEBAR ── */
  function buildSidebar(role) {
    const isSeller = ['seller','admin','owner'].includes(role);
    const isAdmin  = ['admin','owner'].includes(role);
    const isOwner  = role === 'owner';
    const isCs     = ['cs','admin','owner'].includes(role);

    const a = (icon, label, href, active, id='', badgeClass='') => {
      const bdg = id ? `<span class="sb-bdg ${badgeClass}" id="${id}" style="display:none">0</span>` : '';
      return `<a class="sb-a${active?' on':''}" href="${href}"><i class="${icon}"></i>${label}${bdg}</a>`;
    };

    let h = `<div class="sb-lbl">Navigasi</div>`;
    h += a('fas fa-home',     'Beranda',      'index.html',   PAGE==='index');
    h += a('fas fa-bell',     'Info & Update','index.html#info', false);
    h += a('fas fa-wallet',   'Deposit',      'deposit.html', PAGE==='deposit');
    h += a('fas fa-receipt',  'Riwayat',      'riwayat.html', PAGE==='riwayat');

    if (isSeller) {
      h += `<div class="sb-sep"></div><div class="sb-lbl">Seller</div>`;
      h += a('fas fa-store',         'Seller Dashboard',  'seller-dashboard.html',             PAGE==='seller-dashboard');
      h += a('fas fa-boxes-stacked', 'Produk Saya',       'seller-dashboard.html?tab=produk',  false);
      h += a('fas fa-inbox',         'Pesanan Masuk',     'seller-dashboard.html?tab=orders',  false, 'sbBdgOrder', '');
    }

    if (isAdmin) {
      h += `<div class="sb-sep"></div><div class="sb-lbl">${isOwner?'Owner':'Admin'}</div>`;
      h += a('fas fa-chart-pie',  'Admin Panel',    'admin-panel.html',  PAGE==='admin-panel');
      h += a('fas fa-newspaper',  'Info Admin',     'info-admin.html',   PAGE==='info-admin');
      h += a('fas fa-qrcode',     'Kelola Deposit', 'deposit-admin.html',PAGE==='deposit-admin', 'sbBdgDep', 'r');
    }

    if (isCs) {
      h += `<div class="sb-sep"></div><div class="sb-lbl">Customer Service</div>`;
      h += a('fas fa-headset', 'CS Dashboard', 'cs-dashboard.html', PAGE==='cs-dashboard');
    }

    sidebar.innerHTML = h;

    /* Info item click handler */
    sidebar.querySelectorAll('[href="index.html#info"]').forEach(el => {
      el.addEventListener('click', function(e) {
        if (PAGE === 'index' && typeof openInfoSheet === 'function') {
          e.preventDefault(); openInfoSheet();
        }
      });
    });
  }

  /* ── AUTH ── */
  function getSb() {
    if (window.sb) return window.sb;
    if (typeof supabase !== 'undefined') {
      window.sb = supabase.createClient(SUPA_URL, SUPA_KEY);
      return window.sb;
    }
    return null;
  }

  function fmtRp(v) { return 'Rp ' + Number(v||0).toLocaleString('id-ID'); }

  function setAvEl(el, avUrl, name) {
    if (avUrl) {
      el.innerHTML = `<img src="${CLD}${avUrl}" alt="">`;
      el.classList.add('img-loaded');
    } else {
      el.textContent = (name||'?')[0].toUpperCase();
      el.style.background = '#4a7dff';
      el.style.color = '#fff';
    }
  }

  async function shInit() {
    const client = getSb();
    if (!client) { showGuest(); buildSidebar('buyer'); return; }

    try {
      const { data:{ session } } = await client.auth.getSession();
      if (!session) { showGuest(); buildSidebar('buyer'); return; }

      const { data: p } = await client
        .from('profiles')
        .select('id,username,full_name,email,avatar_url,role,balance')
        .eq('id', session.user.id)
        .maybeSingle();

      window._shProfile = p;
      showUser(session.user, p);
      buildSidebar(p?.role || 'buyer');
      loadBadges(p?.role, p);

    } catch(e) {
      console.warn('[shell]', e);
      showGuest();
      buildSidebar('buyer');
    }
  }

  function showGuest() {
    document.getElementById('sh-guest-btn').style.display = '';
    document.getElementById('sh-prof-wrap').style.display = 'none';
    buildSidebar('buyer');
  }

  function showUser(user, p) {
    document.getElementById('sh-guest-btn').style.display = 'none';
    document.getElementById('sh-prof-wrap').style.display = '';
    document.getElementById('shSrch').style.display = '';

    const name = p?.username || p?.full_name || user.email?.split('@')[0] || 'User';
    const role = p?.role || 'buyer';
    const bal  = p?.balance || 0;
    const av   = p?.avatar_url;

    /* pill */
    document.getElementById('sh-uname').textContent = name;
    const rb = document.getElementById('sh-role-badge');
    if (role !== 'buyer') {
      rb.textContent = role; rb.className = role; rb.style.display = '';
    }
    setAvEl(document.getElementById('sh-av'), av, name);

    /* dropdown */
    document.getElementById('shDdName').textContent  = name;
    document.getElementById('shDdEmail').textContent = p?.email || user.email || '—';
    document.getElementById('shDdBal').textContent   = fmtRp(bal);
    setAvEl(document.getElementById('shDdAv'), av, name);
  }

  async function loadBadges(role, p) {
    if (!p) return;
    const client = getSb(); if (!client) return;
    try {
      if (['seller','admin','owner'].includes(role)) {
        const { count } = await client.from('orders')
          .select('id',{count:'exact',head:true})
          .eq('seller_id', p.id).in('status',['pending','pending_mc']);
        if (count > 0) {
          const el = document.getElementById('sbBdgOrder');
          if (el) { el.textContent = count; el.style.display = ''; }
        }
      }
      if (['admin','owner'].includes(role)) {
        const { count } = await client.from('deposit_requests')
          .select('id',{count:'exact',head:true}).eq('status','waiting_review');
        if (count > 0) {
          const el = document.getElementById('sbBdgDep');
          if (el) { el.textContent = count; el.style.display = ''; }
        }
      }
    } catch(e) {}
  }

  /* ── DROPDOWN ── */
  window.shToggleDd = function(e) {
    e && e.stopPropagation();
    document.getElementById('sh-prof-wrap').classList.toggle('open');
  };

  document.addEventListener('click', function(e) {
    const wrap = document.getElementById('sh-prof-wrap');
    if (wrap && !wrap.contains(e.target)) wrap.classList.remove('open');
  });

  /* ── LOGOUT ── */
  window.shLogout = async function() {
    const c = getSb(); if (c) await c.auth.signOut();
    location.href = 'index.html';
  };

  /* ── OPEN LOGIN ── */
  window.shOpenLogin = function() {
    if (typeof openAuth === 'function')            openAuth('login');
    else if (typeof openLoginModal === 'function') openLoginModal();
    else location.href = 'index.html';
  };

  /* ── FIX CONTENT AREA ── */
  function fixLayout() {
    /* Hide leftover nav/aside */
    document.querySelectorAll('nav:not(#sh-topbar)').forEach(n => n.style.display = 'none');
    document.querySelectorAll('aside:not(#sh-sidebar)').forEach(n => n.style.display = 'none');

    /* index.html: .page is flex(aside+main) → make it block + full width */
    const pageEl = document.querySelector('.page');
    if (pageEl && pageEl.id !== 'sh-sidebar' && pageEl.id !== 'sh-topbar') {
      pageEl.style.display = 'block';
    }

    /* Make sure main content fills remaining width */
    const mainEl = document.querySelector('main');
    if (mainEl && mainEl.id !== 'sh-sidebar') {
      mainEl.style.minWidth = '0';
      mainEl.style.width    = '100%';
      mainEl.style.boxSizing = 'border-box';
    }
  }

  /* ── RUN ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { fixLayout(); setTimeout(shInit, 100); });
  } else {
    fixLayout();
    setTimeout(shInit, 100);
  }

})();
