/* ═══════════════════════════════════════════════════════════════
   XREZZKY STORE — shell.js  v2.0  (clean, no-duplicate)
   Inject: Topbar (desktop) + Sidebar (desktop/tablet) + Profile Dropdown
   Mobile: tidak terpengaruh — xbn & mobileHeader tetap jalan sendiri
   Include satu baris sebelum </body> di semua HTML.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const SUPA_URL = 'https://pvkhsjiftfzjpgkoiawq.supabase.co';
  const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a2hzamlmdGZ6anBna29pYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NzMwMjQsImV4cCI6MjA5NzU0OTAyNH0.Fo82CROzoQE90ckYYv7rlnDkLxP0JZ2tN-T2hgnk-fA';
  const CLD_BASE = 'https://res.cloudinary.com/drjmclzbi/image/upload/';

  /* Detect page */
  const PAGE = location.pathname.split('/').pop().replace('.html','') || 'index';

  /* ════════════════════════════════
     CSS — inject once
  ════════════════════════════════ */
  const STYLE = `
  /* Shell hanya aktif ≥ 901px */
  @media (max-width:900px){
    #sh-topbar, #sh-sidebar { display:none !important; }
  }

  /* ── TOPBAR ── */
  #sh-topbar {
    position:fixed; top:0; left:0; right:0; z-index:400;
    height:56px; background:rgba(23,28,36,.98);
    backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
    border-bottom:1px solid #2a3442;
    display:flex; align-items:center; padding:0 20px; gap:12px;
    font-family:'Poppins',sans-serif;
  }
  .sh-brand {
    display:flex; align-items:center; gap:7px;
    font-family:'Syne',sans-serif; font-size:14px; font-weight:800;
    color:#f5f7fa; text-decoration:none; white-space:nowrap; letter-spacing:.02em;
    flex-shrink:0;
  }
  .sh-brand .sh-dot { width:7px; height:7px; border-radius:50%; background:#4a7dff; }
  .sh-brand span { color:#4a7dff; }
  .sh-srch {
    flex:1; max-width:320px; position:relative;
  }
  .sh-srch input {
    width:100%; background:#1d2430; border:1px solid #2a3442;
    border-radius:8px; padding:7px 34px 7px 12px;
    color:#f5f7fa; font-family:'Poppins',sans-serif; font-size:13px;
    outline:none; transition:border .18s;
  }
  .sh-srch input:focus { border-color:#4a7dff; }
  .sh-srch input::placeholder { color:#9ba6b2; }
  .sh-srch-btn {
    position:absolute; right:9px; top:50%; transform:translateY(-50%);
    background:none; border:none; color:#9ba6b2; cursor:pointer; font-size:12px;
  }
  .sh-srch-btn:hover { color:#4a7dff; }
  .sh-space { flex:1; }

  /* Profile pill */
  #sh-prof-btn {
    display:flex; align-items:center; gap:7px;
    padding:4px 10px 4px 5px; border-radius:24px;
    background:#1d2430; border:1px solid #2a3442;
    cursor:pointer; transition:all .18s; position:relative;
    font-family:'Poppins',sans-serif; flex-shrink:0;
  }
  #sh-prof-btn:hover { border-color:#4a7dff; }
  #sh-av {
    width:28px; height:28px; border-radius:50%;
    background:#2a3442; border:2px solid transparent;
    overflow:hidden; display:flex; align-items:center; justify-content:center;
    font-size:12px; font-weight:700; color:#9ba6b2; flex-shrink:0;
    transition:border-color .2s;
  }
  #sh-av img { width:100%; height:100%; object-fit:cover; }
  #sh-av.has-img { border-color:#4a7dff; }
  #sh-uname {
    font-size:13px; font-weight:600; color:#f5f7fa;
    max-width:90px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }
  #sh-role {
    font-size:10px; font-weight:700; padding:2px 7px; border-radius:20px;
    background:rgba(74,125,255,.15); color:#4a7dff;
    text-transform:uppercase; letter-spacing:.04em;
  }
  #sh-role.seller { background:rgba(245,158,11,.15); color:#f59e0b; }
  #sh-role.admin  { background:rgba(239,68,68,.15);  color:#ef4444; }
  #sh-role.owner  { background:rgba(168,85,247,.15); color:#a855f7; }
  #sh-role.cs     { background:rgba(34,197,94,.15);  color:#22c55e; }
  #sh-chev { font-size:10px; color:#9ba6b2; transition:transform .2s; }
  #sh-prof-btn.dd-open #sh-chev { transform:rotate(180deg); }

  /* Guest btn */
  #sh-guest {
    display:flex; align-items:center; gap:7px; padding:6px 14px;
    border-radius:8px; background:#4a7dff; color:#fff; border:none;
    font-size:13px; font-weight:600; cursor:pointer;
    font-family:'Poppins',sans-serif; transition:background .18s; flex-shrink:0;
  }
  #sh-guest:hover { background:#5d8fff; }

  /* ── DROPDOWN ── */
  #sh-dropdown {
    display:none; position:absolute; top:calc(100% + 8px); right:0;
    width:230px; background:#171c24; border:1px solid #2a3442;
    border-radius:12px; box-shadow:0 12px 40px rgba(0,0,0,.55);
    overflow:hidden; flex-direction:column; z-index:5000;
    animation:shDdIn .16s ease;
  }
  #sh-dropdown.open { display:flex; }
  @keyframes shDdIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }

  .dd-hdr { padding:14px 15px 11px; border-bottom:1px solid #2a3442; background:#1d2430; }
  .dd-hdr-top { display:flex; align-items:center; gap:9px; margin-bottom:10px; }
  .dd-big-av {
    width:34px; height:34px; border-radius:50%;
    background:#2a3442; border:2px solid #4a7dff;
    overflow:hidden; display:flex; align-items:center; justify-content:center;
    font-size:13px; font-weight:700; color:#9ba6b2; flex-shrink:0;
  }
  .dd-big-av img { width:100%; height:100%; object-fit:cover; }
  .dd-uinfo { min-width:0; }
  .dd-uname { font-size:13px; font-weight:700; color:#f5f7fa; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .dd-uemail { font-size:11px; color:#9ba6b2; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .dd-bal {
    display:flex; align-items:center; justify-content:space-between;
    background:rgba(74,125,255,.08); border:1px solid rgba(74,125,255,.18);
    border-radius:8px; padding:8px 11px;
  }
  .dd-bal .lbl { font-size:11px; color:#9ba6b2; }
  .dd-bal .val { font-size:14px; font-weight:700; color:#4a7dff; }

  .dd-sec { padding:5px 0; border-bottom:1px solid #2a3442; }
  .dd-sec:last-child { border-bottom:none; }
  .dd-lbl {
    font-size:10px; font-weight:600; color:#9ba6b2;
    text-transform:uppercase; letter-spacing:.06em; padding:5px 15px 3px;
  }
  .dd-item {
    display:flex; align-items:center; gap:9px; padding:8px 15px;
    font-size:13px; color:#9ba6b2; text-decoration:none;
    transition:all .15s; background:none; border:none;
    width:100%; text-align:left; font-family:'Poppins',sans-serif; cursor:pointer;
  }
  .dd-item:hover { background:#1d2430; color:#f5f7fa; }
  .dd-item i { width:15px; text-align:center; font-size:13px; }
  .dd-item.red { color:#ef4444; }
  .dd-item.red:hover { background:rgba(239,68,68,.07); }
  .dd-bdg {
    margin-left:auto; font-size:10px; font-weight:700;
    padding:1px 6px; border-radius:10px;
    background:rgba(245,158,11,.2); color:#f59e0b;
  }
  .dd-bdg.red { background:rgba(239,68,68,.2); color:#ef4444; }

  /* ── SIDEBAR ── */
  #sh-sidebar {
    position:fixed; top:56px; left:0; bottom:0; width:212px; z-index:300;
    background:#171c24; border-right:1px solid #2a3442;
    overflow-y:auto; overflow-x:hidden;
    padding:10px 8px 24px;
    display:flex; flex-direction:column; gap:1px;
    font-family:'Poppins',sans-serif;
  }
  #sh-sidebar::-webkit-scrollbar { width:3px; }
  #sh-sidebar::-webkit-scrollbar-thumb { background:#2a3442; border-radius:3px; }

  .sb-lbl {
    font-size:10px; font-weight:600; letter-spacing:.08em; color:#9ba6b2;
    text-transform:uppercase; padding:10px 10px 4px; margin-top:2px;
  }
  .sb-item {
    display:flex; align-items:center; gap:9px; padding:9px 12px;
    border-radius:8px; color:#9ba6b2; font-size:13px; font-weight:500;
    text-decoration:none; cursor:pointer; transition:all .16s;
    border:none; background:none; width:100%; text-align:left;
    font-family:'Poppins',sans-serif;
  }
  .sb-item:hover { background:#1d2430; color:#f5f7fa; }
  .sb-item.active { background:rgba(74,125,255,.12); color:#4a7dff; }
  .sb-item i { width:15px; text-align:center; font-size:13px; flex-shrink:0; }
  .sb-sep { height:1px; background:#2a3442; margin:7px 4px; }
  .sb-bdg {
    margin-left:auto; font-size:10px; font-weight:700;
    padding:1px 6px; border-radius:10px;
    background:rgba(245,158,11,.2); color:#f59e0b;
  }
  .sb-bdg.red { background:rgba(239,68,68,.2); color:#ef4444; }

  /* ── CONTENT PUSH (desktop only) ── */
  @media (min-width:901px) {
    body.sh-on { padding-top:56px !important; }
    /* Push .page container to the right of sidebar */
    body.sh-on .page,
    body.sh-on #pageRoot,
    body.sh-on #wrapper,
    body.sh-on #main-wrap { margin-left:212px !important; }
    /* For pages where main is direct child of body */
    body.sh-on > main { margin-left:212px !important; padding-top:0 !important; }
    /* index.html: .page was flex(aside+main), now block */
    body.sh-on .page { display:block !important; }
  }
  `;

  const st = document.createElement('style');
  st.textContent = STYLE;
  document.head.appendChild(st);

  /* ════════════════════════════════
     TOPBAR HTML
  ════════════════════════════════ */
  const topbar = document.createElement('div');
  topbar.id = 'sh-topbar';
  topbar.innerHTML = `
    <a class="sh-brand" href="index.html">
      <div class="sh-dot"></div>XREZZKY<span>STORE</span>
    </a>
    <div class="sh-srch" id="shSrch" style="display:none">
      <input id="shSrchInput" type="text" placeholder="Cari produk..."
        onkeydown="if(event.key==='Enter')location.href='index.html?q='+encodeURIComponent(this.value)"/>
      <button class="sh-srch-btn"
        onclick="location.href='index.html?q='+encodeURIComponent(document.getElementById('shSrchInput').value)">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div class="sh-space"></div>

    <!-- GUEST -->
    <button id="sh-guest" onclick="shOpenLogin()">
      <i class="fas fa-sign-in-alt"></i> Masuk
    </button>

    <!-- LOGGED IN -->
    <div id="sh-user" style="display:none; position:relative">
      <div id="sh-prof-btn" onclick="shToggleDd()">
        <div id="sh-av">?</div>
        <span id="sh-uname">User</span>
        <span id="sh-role" style="display:none"></span>
        <i class="fas fa-chevron-down" id="sh-chev"></i>
      </div>
      <div id="sh-dropdown">
        <!-- Header -->
        <div class="dd-hdr">
          <div class="dd-hdr-top">
            <div class="dd-big-av" id="shDdAv">?</div>
            <div class="dd-uinfo">
              <div class="dd-uname" id="shDdName">—</div>
              <div class="dd-uemail" id="shDdEmail">—</div>
            </div>
          </div>
          <div class="dd-bal">
            <span class="lbl"><i class="fas fa-wallet" style="margin-right:5px;opacity:.5"></i>Saldo</span>
            <span class="val" id="shDdBal">Rp 0</span>
          </div>
        </div>
        <!-- Akun -->
        <div class="dd-sec">
          <div class="dd-lbl">Akun</div>
          <a class="dd-item" href="profil.html"><i class="fas fa-user-circle"></i> Profil Saya</a>
          <a class="dd-item" href="index.html"><i class="fas fa-cog"></i> Pengaturan Akun</a>
        </div>
        <!-- Logout -->
        <div class="dd-sec">
          <button class="dd-item red" onclick="shLogout()"><i class="fas fa-sign-out-alt"></i> Keluar</button>
        </div>
      </div>
    </div>
  `;

  /* ════════════════════════════════
     SIDEBAR HTML (built after auth)
  ════════════════════════════════ */
  const sidebar = document.createElement('div');
  sidebar.id = 'sh-sidebar';

  /* Insert both at top of body */
  document.body.insertBefore(sidebar, document.body.firstChild);
  document.body.insertBefore(topbar, document.body.firstChild);
  document.body.classList.add('sh-on');

  /* ════════════════════════════════
     BUILD SIDEBAR per role
  ════════════════════════════════ */
  function buildSidebar(role) {
    const p = PAGE;
    const isSeller = ['seller','admin','owner'].includes(role);
    const isAdmin  = ['admin','owner'].includes(role);
    const isOwner  = role === 'owner';
    const isCs     = ['cs','admin','owner'].includes(role);

    let h = '';

    // ── Navigasi utama (semua role) ──
    h += `<div class="sb-lbl">Navigasi</div>`;
    h += sb_item('fas fa-home',        'Beranda',      'index.html',   p==='index');
    h += sb_item('fas fa-bell',        'Info & Update','index.html#info', false, 'shGoInfo(event)');
    h += sb_item('fas fa-wallet',      'Deposit',      'deposit.html', p==='deposit');
    h += sb_item('fas fa-receipt',     'Riwayat',      'riwayat.html', p==='riwayat');

    // ── Seller ──
    if (isSeller) {
      h += `<div class="sb-sep"></div><div class="sb-lbl">Seller</div>`;
      h += sb_item('fas fa-store',         'Seller Dashboard',  'seller-dashboard.html',               p==='seller-dashboard');
      h += sb_item('fas fa-boxes-stacked', 'Produk Saya',       'seller-dashboard.html?tab=produk',    p==='seller-dashboard'&&location.search.includes('produk'));
      h += sb_item_badge('fas fa-inbox',   'Pesanan Masuk',     'seller-dashboard.html?tab=orders',    p==='seller-dashboard'&&location.search.includes('orders'), 'shSbOrder', 'y');
    }

    // ── Admin / Owner ──
    if (isAdmin) {
      const lbl = isOwner ? 'Owner' : 'Admin';
      h += `<div class="sb-sep"></div><div class="sb-lbl">${lbl}</div>`;
      h += sb_item('fas fa-chart-pie',  'Admin Panel',    'admin-panel.html',  p==='admin-panel');
      h += sb_item('fas fa-newspaper',  'Info Admin',     'info-admin.html',   p==='info-admin');
      h += sb_item_badge('fas fa-qrcode','Kelola Deposit','deposit-admin.html',p==='deposit-admin','shSbDep','r');
    }

    // ── CS ──
    if (isCs) {
      h += `<div class="sb-sep"></div><div class="sb-lbl">Customer Service</div>`;
      h += sb_item('fas fa-headset', 'CS Dashboard', 'cs-dashboard.html', p==='cs-dashboard');
    }

    sidebar.innerHTML = h;
  }

  function sb_item(icon, label, href, active, onclick='') {
    const cls = active ? 'sb-item active' : 'sb-item';
    const oc  = onclick ? ` onclick="${onclick}"` : '';
    return `<a class="${cls}" href="${href}"${oc}><i class="${icon}"></i>${label}</a>`;
  }
  function sb_item_badge(icon, label, href, active, id, color) {
    const cls = active ? 'sb-item active' : 'sb-item';
    return `<a class="${cls}" href="${href}"><i class="${icon}"></i>${label}<span class="sb-bdg ${color==='r'?'red':''}" id="${id}" style="display:none">0</span></a>`;
  }

  /* ════════════════════════════════
     AUTH + SUPABASE
  ════════════════════════════════ */
  function getSb() {
    if (window.sb) return window.sb;
    if (typeof supabase !== 'undefined') {
      window.sb = supabase.createClient(SUPA_URL, SUPA_KEY);
      return window.sb;
    }
    return null;
  }

  function fmtRp(v) { return 'Rp ' + Number(v||0).toLocaleString('id-ID'); }

  async function shInit() {
    const client = getSb();
    if (!client) { showGuest(); buildSidebar('buyer'); return; }

    try {
      const { data:{ session } } = await client.auth.getSession();
      if (!session) { showGuest(); buildSidebar('buyer'); return; }

      const { data: profile } = await client
        .from('profiles')
        .select('id,username,full_name,email,avatar_url,role,balance')
        .eq('id', session.user.id)
        .maybeSingle();

      window._shProfile = profile;
      const role = profile?.role || 'buyer';

      showUser(session.user, profile);
      buildSidebar(role);
      loadBadges(role, profile);

    } catch(e) {
      console.warn('[shell]', e);
      showGuest();
      buildSidebar('buyer');
    }
  }

  function showGuest() {
    document.getElementById('sh-guest').style.display = '';
    document.getElementById('sh-user').style.display  = 'none';
  }

  function showUser(user, p) {
    document.getElementById('sh-guest').style.display = 'none';
    document.getElementById('sh-user').style.display  = 'flex';
    document.getElementById('shSrch').style.display   = '';

    const name  = p?.username || p?.full_name || user.email?.split('@')[0] || 'User';
    const role  = p?.role || 'buyer';
    const bal   = p?.balance || 0;
    const avUrl = p?.avatar_url ? CLD_BASE + p.avatar_url : null;

    /* topbar pill */
    document.getElementById('sh-uname').textContent = name;

    const rb = document.getElementById('sh-role');
    if (role !== 'buyer') {
      rb.textContent = role;
      rb.className   = role;
      rb.style.display = '';
    }

    const av = document.getElementById('sh-av');
    if (avUrl) {
      av.innerHTML = `<img src="${avUrl}" alt="">`;
      av.classList.add('has-img');
    } else {
      av.textContent = name[0].toUpperCase();
      av.style.cssText += ';background:#4a7dff;color:#fff';
    }

    /* dropdown */
    document.getElementById('shDdName').textContent  = name;
    document.getElementById('shDdEmail').textContent = p?.email || user.email || '—';
    document.getElementById('shDdBal').textContent   = fmtRp(bal);

    const dav = document.getElementById('shDdAv');
    if (avUrl) {
      dav.innerHTML = `<img src="${avUrl}" alt="">`;
    } else {
      dav.textContent = name[0].toUpperCase();
      dav.style.cssText += ';background:#4a7dff;color:#fff';
    }
  }

  async function loadBadges(role, profile) {
    if (!profile) return;
    const client = getSb();
    if (!client) return;
    try {
      if (['seller','admin','owner'].includes(role)) {
        const { count } = await client.from('orders')
          .select('id',{count:'exact',head:true})
          .eq('seller_id', profile.id)
          .in('status',['pending','pending_mc']);
        if (count > 0) {
          const el = document.getElementById('shSbOrder');
          if (el) { el.textContent = count; el.style.display = ''; }
        }
      }
      if (['admin','owner'].includes(role)) {
        const { count } = await client.from('deposit_requests')
          .select('id',{count:'exact',head:true})
          .eq('status','waiting_review');
        if (count > 0) {
          const el = document.getElementById('shSbDep');
          if (el) { el.textContent = count; el.style.display = ''; }
        }
      }
    } catch(e) {}
  }

  /* ════════════════════════════════
     DROPDOWN TOGGLE
  ════════════════════════════════ */
  window.shToggleDd = function() {
    const dd  = document.getElementById('sh-dropdown');
    const btn = document.getElementById('sh-prof-btn');
    const open = dd.classList.toggle('open');
    btn.classList.toggle('dd-open', open);
  };

  /* Close on outside click */
  document.addEventListener('click', function(e) {
    const usr = document.getElementById('sh-user');
    if (usr && !usr.contains(e.target)) {
      document.getElementById('sh-dropdown')?.classList.remove('open');
      document.getElementById('sh-prof-btn')?.classList.remove('dd-open');
    }
  });

  /* ════════════════════════════════
     LOGOUT
  ════════════════════════════════ */
  window.shLogout = async function() {
    const client = getSb();
    if (client) await client.auth.signOut();
    location.href = 'index.html';
  };

  /* ════════════════════════════════
     OPEN LOGIN (delegate ke page)
  ════════════════════════════════ */
  window.shOpenLogin = function() {
    if (typeof openAuth === 'function')       openAuth('login');
    else if (typeof openLoginModal==='function') openLoginModal();
    else location.href = 'index.html';
  };

  /* Info anchor helper */
  window.shGoInfo = function(e) {
    if (PAGE === 'index' && typeof openInfoSheet === 'function') {
      e.preventDefault(); openInfoSheet();
    }
  };

  /* ════════════════════════════════
     OFFSET existing page content
  ════════════════════════════════ */
  function applyOffset() {
    // Hide any leftover nav/aside that page might still have
    document.querySelectorAll('nav:not(#sh-topbar)').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('aside:not(#sh-sidebar)').forEach(el => {
      el.style.display = 'none';
    });

    // Push content if page uses specific wrapper IDs
    const pushTargets = ['#wrapper','#pageWrap','#main-wrap','#main'];
    pushTargets.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.marginLeft = '212px';
    });
  }

  /* ════════════════════════════════
     RUN
  ════════════════════════════════ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyOffset();
      // Supabase mungkin belum ready saat DOMContentLoaded,
      // tunggu sedikit untuk pastikan sb tersedia
      setTimeout(shInit, 150);
    });
  } else {
    applyOffset();
    setTimeout(shInit, 150);
  }

})();
