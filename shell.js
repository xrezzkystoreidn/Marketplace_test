/* ═══════════════════════════════════════════════════════════════
   XREZZKY STORE — shell.js
   Shared persistent layout: Topbar + Sidebar + Profile Dropdown
   Include SEBELUM </body> di semua halaman (setelah supabase CDN).
   Otomatis inject HTML + CSS + logic auth + role-based sidebar.
   Hanya aktif di desktop/tablet (≥ 901px). Mobile pakai xbn.js.
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Config ── */
  const SUPA_URL = 'https://pvkhsjiftfzjpgkoiawq.supabase.co';
  const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a2hzamlmdGZ6anBna29pYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NzMwMjQsImV4cCI6MjA5NzU0OTAyNH0.Fo82CROzoQE90ckYYv7rlnDkLxP0JZ2tN-T2hgnk-fA';
  const CLD     = 'https://res.cloudinary.com/drjmclzbi/image/upload/';

  /* ── Detect current page ── */
  const PAGE = (function () {
    const p = location.pathname.split('/').pop().replace('.html', '') || 'index';
    return p;
  })();

  /* ─────────────────────────────────────────
     1. INJECT CSS
  ───────────────────────────────────────── */
  const css = `
/* ── SHELL: hanya tampil ≥ 901px ── */
@media (max-width: 900px) {
  #shell-topbar, #shell-sidebar { display: none !important; }
  #shell-content-wrap { margin-left: 0 !important; margin-top: 0 !important; }
}

/* ── TOPBAR ── */
#shell-topbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 300;
  height: 58px;
  background: rgba(23,28,36,.97);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid #2a3442;
  display: flex; align-items: center;
  padding: 0 20px; gap: 14px;
  font-family: 'Poppins', sans-serif;
}

/* Brand */
#shell-topbar .sh-brand {
  display: flex; align-items: center; gap: 8px;
  font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800;
  color: #f5f7fa; text-decoration: none; white-space: nowrap;
  letter-spacing: .02em;
}
#shell-topbar .sh-brand .sh-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #4a7dff; flex-shrink: 0;
}
#shell-topbar .sh-brand span { color: #4a7dff; }

/* Search */
#shell-topbar .sh-search {
  flex: 1; max-width: 360px;
  position: relative;
}
#shell-topbar .sh-search input {
  width: 100%;
  background: #1d2430; border: 1px solid #2a3442;
  border-radius: 8px; padding: 8px 36px 8px 14px;
  color: #f5f7fa; font-family: 'Poppins', sans-serif; font-size: 13px;
  outline: none; transition: border .18s;
}
#shell-topbar .sh-search input:focus { border-color: #4a7dff; }
#shell-topbar .sh-search input::placeholder { color: #9ba6b2; }
#shell-topbar .sh-search .sh-search-btn {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #9ba6b2; cursor: pointer; font-size: 13px;
}
#shell-topbar .sh-search-btn:hover { color: #4a7dff; }

#shell-topbar .sh-spacer { flex: 1; }

/* Quick links in topbar */
#shell-topbar .sh-quicklinks {
  display: flex; align-items: center; gap: 4px;
}
#shell-topbar .sh-ql {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 8px;
  color: #9ba6b2; font-size: 12px; font-weight: 500;
  text-decoration: none; transition: all .18s; white-space: nowrap;
}
#shell-topbar .sh-ql:hover { background: #1d2430; color: #f5f7fa; }
#shell-topbar .sh-ql.active { background: rgba(74,125,255,.12); color: #4a7dff; }

/* ── PROFILE DROPDOWN TRIGGER ── */
#shell-profile-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 10px 5px 6px; border-radius: 30px;
  background: #1d2430; border: 1px solid #2a3442;
  cursor: pointer; transition: all .18s; position: relative;
  font-family: 'Poppins', sans-serif;
}
#shell-profile-btn:hover { border-color: #4a7dff; background: #222b39; }

#shell-av {
  width: 30px; height: 30px; border-radius: 50%;
  background: #2a3442; border: 2px solid #2a3442;
  overflow: hidden; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #9ba6b2; flex-shrink: 0;
}
#shell-av img { width: 100%; height: 100%; object-fit: cover; }
#shell-av.loaded { border-color: #4a7dff; }

#shell-profile-name {
  font-size: 13px; font-weight: 600; color: #f5f7fa;
  max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
#shell-role-badge {
  font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
  background: rgba(74,125,255,.15); color: #4a7dff; text-transform: uppercase;
  letter-spacing: .04em;
}
#shell-role-badge.admin  { background: rgba(239,68,68,.15);  color: #ef4444; }
#shell-role-badge.owner  { background: rgba(168,85,247,.15); color: #a855f7; }
#shell-role-badge.seller { background: rgba(245,158,11,.15); color: #f59e0b; }
#shell-role-badge.cs     { background: rgba(34,197,94,.15);  color: #22c55e; }
#shell-chevron { font-size: 10px; color: #9ba6b2; transition: transform .2s; margin-left: 2px; }
#shell-profile-btn.open #shell-chevron { transform: rotate(180deg); }

/* ── DROPDOWN MENU ── */
#shell-dropdown {
  position: absolute; top: calc(100% + 8px); right: 0;
  width: 240px;
  background: #171c24; border: 1px solid #2a3442;
  border-radius: 13px; box-shadow: 0 12px 40px rgba(0,0,0,.5);
  overflow: hidden;
  display: none; flex-direction: column;
  z-index: 9000; animation: shellDdFade .18s ease;
}
#shell-dropdown.open { display: flex; }
@keyframes shellDdFade {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: none; }
}

/* Dropdown header */
.sh-dd-header {
  padding: 14px 16px 12px;
  border-bottom: 1px solid #2a3442;
  background: #1d2430;
}
.sh-dd-top {
  display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
}
.sh-dd-av {
  width: 36px; height: 36px; border-radius: 50%;
  background: #2a3442; border: 2px solid #4a7dff;
  overflow: hidden; display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; color: #9ba6b2; flex-shrink: 0;
}
.sh-dd-av img { width: 100%; height: 100%; object-fit: cover; }
.sh-dd-info { min-width: 0; }
.sh-dd-name {
  font-size: 13px; font-weight: 700; color: #f5f7fa;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.sh-dd-email {
  font-size: 11px; color: #9ba6b2;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* Balance pill */
.sh-dd-balance {
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(74,125,255,.08); border: 1px solid rgba(74,125,255,.2);
  border-radius: 8px; padding: 8px 12px;
}
.sh-dd-balance .bl { font-size: 11px; color: #9ba6b2; }
.sh-dd-balance .bv { font-size: 14px; font-weight: 700; color: #4a7dff; }

/* Dropdown sections */
.sh-dd-section { padding: 6px 0; border-bottom: 1px solid #2a3442; }
.sh-dd-section:last-child { border-bottom: none; }
.sh-dd-label {
  font-size: 10px; font-weight: 600; color: #9ba6b2;
  text-transform: uppercase; letter-spacing: .06em;
  padding: 6px 16px 3px;
}
.sh-dd-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 16px; font-size: 13px; color: #9ba6b2;
  text-decoration: none; cursor: pointer; transition: all .15s;
  background: none; border: none; width: 100%; text-align: left;
  font-family: 'Poppins', sans-serif;
}
.sh-dd-item:hover { background: #1d2430; color: #f5f7fa; }
.sh-dd-item i { width: 16px; text-align: center; font-size: 13px; }
.sh-dd-item.danger { color: #ef4444; }
.sh-dd-item.danger:hover { background: rgba(239,68,68,.08); }
.sh-dd-badge {
  margin-left: auto; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 10px;
  background: rgba(245,158,11,.2); color: #f59e0b;
}
.sh-dd-badge.red { background: rgba(239,68,68,.2); color: #ef4444; }

/* ── SIDEBAR ── */
#shell-sidebar {
  position: fixed; top: 58px; left: 0; bottom: 0;
  width: 220px; z-index: 200;
  background: #171c24;
  border-right: 1px solid #2a3442;
  overflow-y: auto; overflow-x: hidden;
  padding: 12px 10px 20px;
  display: flex; flex-direction: column; gap: 2px;
  font-family: 'Poppins', sans-serif;
}
#shell-sidebar::-webkit-scrollbar { width: 3px; }
#shell-sidebar::-webkit-scrollbar-thumb { background: #2a3442; }

.sh-sb-label {
  font-size: 10px; font-weight: 600; letter-spacing: .08em;
  color: #9ba6b2; text-transform: uppercase;
  padding: 10px 10px 4px; margin-top: 4px;
}
.sh-sb-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 8px;
  color: #9ba6b2; font-size: 13px; font-weight: 500;
  text-decoration: none; cursor: pointer; transition: all .18s;
  border: none; background: none; width: 100%; text-align: left;
  font-family: 'Poppins', sans-serif; position: relative;
}
.sh-sb-item:hover { background: #1d2430; color: #f5f7fa; }
.sh-sb-item.active { background: rgba(74,125,255,.12); color: #4a7dff; }
.sh-sb-item i { width: 16px; text-align: center; font-size: 13px; flex-shrink: 0; }
.sh-sb-sep { height: 1px; background: #2a3442; margin: 8px 2px; }
.sh-sb-badge {
  margin-left: auto; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 10px;
  background: rgba(245,158,11,.2); color: #f59e0b;
}
.sh-sb-badge.red { background: rgba(239,68,68,.2); color: #ef4444; }

/* ── CONTENT OFFSET (push main content) ── */
@media (min-width: 901px) {
  body.shell-active { padding-top: 58px; }
  body.shell-active .page,
  body.shell-active #pageWrap,
  body.shell-active > main,
  body.shell-active > .page-content {
    margin-left: 220px;
  }
  /* Override per-file layout if has aside+main pattern */
  body.shell-active aside:not(#shell-sidebar) { display: none !important; }
  body.shell-active nav:not(#shell-topbar) { display: none !important; }
}

/* ── LOGIN PROMPT (guest state) ── */
#shell-guest-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 14px; border-radius: 8px;
  background: #4a7dff; color: #fff; border: none;
  font-size: 13px; font-weight: 600; cursor: pointer;
  font-family: 'Poppins', sans-serif; transition: background .18s;
}
#shell-guest-btn:hover { background: #5d8fff; }
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─────────────────────────────────────────
     2. INJECT HTML
  ───────────────────────────────────────── */

  /* TOPBAR */
  const topbar = document.createElement('div');
  topbar.id = 'shell-topbar';
  topbar.innerHTML = `
    <a class="sh-brand" href="index.html">
      <div class="sh-dot"></div>XREZZKY<span>STORE</span>
    </a>

    <div class="sh-search" id="shSearchWrap" style="display:none">
      <input id="shSearchInput" type="text" placeholder="Cari produk..."
        onkeydown="if(event.key==='Enter')window.location='index.html?q='+encodeURIComponent(this.value)" />
      <button class="sh-search-btn" onclick="window.location='index.html?q='+encodeURIComponent(document.getElementById('shSearchInput').value)">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div class="sh-spacer"></div>

    <div class="sh-quicklinks" id="shQuicklinks" style="display:none">
      <a class="sh-ql ${PAGE==='index'?'active':''}" href="index.html"><i class="fas fa-store"></i> Beranda</a>
      <a class="sh-ql ${PAGE==='deposit'?'active':''}" href="deposit.html"><i class="fas fa-wallet"></i> Deposit</a>
      <a class="sh-ql ${PAGE==='riwayat'?'active':''}" href="riwayat.html"><i class="fas fa-receipt"></i> Riwayat</a>
    </div>

    <!-- GUEST: tombol masuk -->
    <div id="shGuestArea">
      <button id="shell-guest-btn" onclick="window._shellOpenLogin && window._shellOpenLogin()">
        <i class="fas fa-sign-in-alt"></i> Masuk
      </button>
    </div>

    <!-- LOGGED IN: profile dropdown -->
    <div id="shUserArea" style="display:none; position:relative">
      <div id="shell-profile-btn" onclick="shellToggleDropdown()">
        <div id="shell-av">?</div>
        <span id="shell-profile-name">User</span>
        <span id="shell-role-badge" style="display:none"></span>
        <i class="fas fa-chevron-down" id="shell-chevron"></i>
      </div>

      <div id="shell-dropdown">
        <!-- Header -->
        <div class="sh-dd-header">
          <div class="sh-dd-top">
            <div class="sh-dd-av" id="shDdAv">?</div>
            <div class="sh-dd-info">
              <div class="sh-dd-name" id="shDdName">—</div>
              <div class="sh-dd-email" id="shDdEmail">—</div>
            </div>
          </div>
          <div class="sh-dd-balance">
            <span class="bl"><i class="fas fa-wallet" style="margin-right:5px;opacity:.5"></i>Saldo</span>
            <span class="bv" id="shDdBalance">Rp 0</span>
          </div>
        </div>

        <!-- Akun -->
        <div class="sh-dd-section">
          <div class="sh-dd-label">Akun Saya</div>
          <a class="sh-dd-item" href="profil.html"><i class="fas fa-user-circle"></i> Profil Saya</a>
          <a class="sh-dd-item" href="deposit.html"><i class="fas fa-wallet"></i> Deposit Saldo</a>
          <a class="sh-dd-item" href="riwayat.html"><i class="fas fa-receipt"></i> Riwayat Transaksi</a>
        </div>

        <!-- Seller -->
        <div class="sh-dd-section" id="shDdSeller" style="display:none">
          <div class="sh-dd-label">Seller</div>
          <a class="sh-dd-item" href="seller-dashboard.html"><i class="fas fa-store"></i> Seller Dashboard</a>
          <a class="sh-dd-item" href="seller-dashboard.html?tab=produk"><i class="fas fa-boxes-stacked"></i> Produk Saya</a>
          <a class="sh-dd-item" href="seller-dashboard.html?tab=orders">
            <i class="fas fa-inbox"></i> Pesanan Masuk
            <span class="sh-dd-badge" id="shDdOrderBadge" style="display:none">0</span>
          </a>
        </div>

        <!-- CS -->
        <div class="sh-dd-section" id="shDdCs" style="display:none">
          <div class="sh-dd-label">Customer Service</div>
          <a class="sh-dd-item" href="cs-dashboard.html"><i class="fas fa-headset"></i> CS Dashboard</a>
        </div>

        <!-- Admin / Owner -->
        <div class="sh-dd-section" id="shDdAdmin" style="display:none">
          <div class="sh-dd-label" id="shDdAdminLabel">Admin</div>
          <a class="sh-dd-item" href="admin-panel.html"><i class="fas fa-chart-pie"></i> Admin Panel</a>
          <a class="sh-dd-item" href="deposit-admin.html">
            <i class="fas fa-qrcode"></i> Kelola Deposit
            <span class="sh-dd-badge red" id="shDdDepBadge" style="display:none">0</span>
          </a>
          <a class="sh-dd-item" href="info-admin.html"><i class="fas fa-newspaper"></i> Info Admin</a>
          <a class="sh-dd-item" href="cs-dashboard.html"><i class="fas fa-headset"></i> CS Dashboard</a>
        </div>

        <!-- Keluar -->
        <div class="sh-dd-section">
          <button class="sh-dd-item danger" onclick="shellLogout()">
            <i class="fas fa-sign-out-alt"></i> Keluar
          </button>
        </div>
      </div>
    </div>
  `;

  /* SIDEBAR */
  const sidebar = document.createElement('div');
  sidebar.id = 'shell-sidebar';
  sidebar.innerHTML = `
    <div class="sh-sb-label">Navigasi</div>
    <a class="sh-sb-item ${PAGE==='index'?'active':''}" href="index.html">
      <i class="fas fa-home"></i> Beranda
    </a>
    <a class="sh-sb-item" href="index.html#info" onclick="shellGoInfo(event)">
      <i class="fas fa-bell"></i> Info & Update
    </a>
    <a class="sh-sb-item ${PAGE==='deposit'?'active':''}" href="deposit.html">
      <i class="fas fa-wallet"></i> Deposit
    </a>
    <a class="sh-sb-item ${PAGE==='riwayat'?'active':''}" href="riwayat.html">
      <i class="fas fa-receipt"></i> Riwayat
    </a>
    <a class="sh-sb-item ${PAGE==='profil'?'active':''}" href="profil.html">
      <i class="fas fa-user-circle"></i> Profil
    </a>

    <!-- Role-based items injected by JS -->
    <div id="shSbRoleItems"></div>
  `;

  /* Insert into DOM */
  document.body.insertBefore(topbar, document.body.firstChild);
  document.body.insertBefore(sidebar, document.body.children[1]);
  document.body.classList.add('shell-active');

  /* ─────────────────────────────────────────
     3. SUPABASE + AUTH LOGIC
  ───────────────────────────────────────── */

  let _sb = null;
  let _profile = null;

  function getSb() {
    if (_sb) return _sb;
    if (typeof supabase !== 'undefined') {
      // Reuse existing client if page already created one (window.sb)
      _sb = window.sb || supabase.createClient(SUPA_URL, SUPA_KEY);
      return _sb;
    }
    return null;
  }

  function fmtRp(v) {
    if (!v) return 'Rp 0';
    return 'Rp ' + Number(v).toLocaleString('id-ID');
  }

  async function shellInit() {
    const sb = getSb();
    if (!sb) return;

    try {
      const { data: { session } } = await sb.auth.getSession();
      if (!session) { showGuest(); return; }

      const { data: profile } = await sb
        .from('profiles')
        .select('id,username,full_name,email,avatar_url,role,balance')
        .eq('id', session.user.id)
        .maybeSingle();

      _profile = profile;
      showUser(session.user, profile);
      buildSidebarRole(profile?.role || 'buyer');
      loadBadges(profile?.role || 'buyer');
    } catch (e) {
      console.warn('[shell]', e);
      showGuest();
    }
  }

  function showGuest() {
    document.getElementById('shGuestArea').style.display = 'flex';
    document.getElementById('shUserArea').style.display  = 'none';
    document.getElementById('shSearchWrap').style.display = '';
  }

  function showUser(user, p) {
    document.getElementById('shGuestArea').style.display = 'none';
    document.getElementById('shUserArea').style.display  = 'flex';
    document.getElementById('shSearchWrap').style.display = '';
    document.getElementById('shQuicklinks').style.display = '';

    const name = p?.username || p?.full_name || user.email?.split('@')[0] || 'User';
    const role = p?.role || 'buyer';
    const bal  = p?.balance || 0;
    const av   = p?.avatar_url;

    /* topbar name + role */
    document.getElementById('shell-profile-name').textContent = name;

    const rb = document.getElementById('shell-role-badge');
    if (role !== 'buyer') {
      rb.textContent = role;
      rb.className = '';
      rb.classList.add(role);
      rb.style.display = '';
    }

    /* topbar avatar */
    const avEl = document.getElementById('shell-av');
    if (av) {
      avEl.innerHTML = `<img src="${CLD}${av}" alt="av" />`;
      avEl.classList.add('loaded');
    } else {
      avEl.textContent = name[0].toUpperCase();
      avEl.style.background = '#4a7dff';
      avEl.style.color = '#fff';
    }

    /* dropdown header */
    document.getElementById('shDdName').textContent  = name;
    document.getElementById('shDdEmail').textContent = p?.email || user.email || '—';
    document.getElementById('shDdBalance').textContent = fmtRp(bal);

    const ddAv = document.getElementById('shDdAv');
    if (av) {
      ddAv.innerHTML = `<img src="${CLD}${av}" alt="av" />`;
    } else {
      ddAv.textContent = name[0].toUpperCase();
      ddAv.style.background = '#4a7dff';
      ddAv.style.color = '#fff';
    }

    /* show role sections in dropdown */
    const isSeller = ['seller','admin','owner'].includes(role);
    const isCs     = ['cs','admin','owner'].includes(role);
    const isAdmin  = ['admin','owner'].includes(role);

    if (isSeller) document.getElementById('shDdSeller').style.display = '';
    if (isCs)     document.getElementById('shDdCs').style.display = '';
    if (isAdmin) {
      document.getElementById('shDdAdmin').style.display = '';
      if (role === 'owner') document.getElementById('shDdAdminLabel').textContent = 'Owner';
    }
  }

  /* ── SIDEBAR role items ── */
  function buildSidebarRole(role) {
    const wrap = document.getElementById('shSbRoleItems');
    if (!wrap) return;

    const isSeller = ['seller','admin','owner'].includes(role);
    const isAdmin  = ['admin','owner'].includes(role);
    const isCs     = ['cs','admin','owner'].includes(role);

    let html = '';

    if (isSeller) {
      html += `
        <div class="sh-sb-sep"></div>
        <div class="sh-sb-label">Seller</div>
        <a class="sh-sb-item ${PAGE==='seller-dashboard'?'active':''}" href="seller-dashboard.html">
          <i class="fas fa-store"></i> Seller Dashboard
        </a>
        <a class="sh-sb-item ${PAGE==='seller-dashboard'&&location.search.includes('produk')?'active':''}" href="seller-dashboard.html?tab=produk">
          <i class="fas fa-boxes-stacked"></i> Produk Saya
        </a>
        <a class="sh-sb-item ${PAGE==='seller-dashboard'&&location.search.includes('orders')?'active':''}" href="seller-dashboard.html?tab=orders">
          <i class="fas fa-inbox"></i> Pesanan Masuk
          <span class="sh-sb-badge" id="shSbOrderBadge" style="display:none">0</span>
        </a>
      `;
    }

    if (isAdmin) {
      const lbl = role === 'owner' ? 'Owner' : 'Admin';
      html += `
        <div class="sh-sb-sep"></div>
        <div class="sh-sb-label">${lbl}</div>
        <a class="sh-sb-item ${PAGE==='admin-panel'?'active':''}" href="admin-panel.html">
          <i class="fas fa-chart-pie"></i> Admin Panel
        </a>
        <a class="sh-sb-item ${PAGE==='deposit-admin'?'active':''}" href="deposit-admin.html">
          <i class="fas fa-qrcode"></i> Kelola Deposit
          <span class="sh-sb-badge red" id="shSbDepBadge" style="display:none">0</span>
        </a>
        <a class="sh-sb-item ${PAGE==='info-admin'?'active':''}" href="info-admin.html">
          <i class="fas fa-newspaper"></i> Info Admin
        </a>
      `;
    }

    if (isCs) {
      html += `
        <div class="sh-sb-sep"></div>
        <div class="sh-sb-label">Customer Service</div>
        <a class="sh-sb-item ${PAGE==='cs-dashboard'?'active':''}" href="cs-dashboard.html">
          <i class="fas fa-headset"></i> CS Dashboard
        </a>
      `;
    }

    wrap.innerHTML = html;
  }

  /* ── Badges (pending orders, pending deposit) ── */
  async function loadBadges(role) {
    const sb = getSb();
    if (!sb || !_profile) return;

    try {
      /* Pending orders (seller) */
      if (['seller','admin','owner'].includes(role)) {
        const { count } = await sb
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('seller_id', _profile.id)
          .in('status', ['pending','pending_mc']);

        if (count > 0) {
          ['shSbOrderBadge','shDdOrderBadge'].forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.textContent = count; el.style.display = ''; }
          });
        }
      }

      /* Pending deposit (admin/owner) */
      if (['admin','owner'].includes(role)) {
        const { count } = await sb
          .from('deposit_requests')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'waiting_review');

        if (count > 0) {
          ['shSbDepBadge','shDdDepBadge'].forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.textContent = count; el.style.display = ''; }
          });
        }
      }
    } catch (e) { /* silent */ }
  }

  /* ─────────────────────────────────────────
     4. DROPDOWN TOGGLE
  ───────────────────────────────────────── */
  window.shellToggleDropdown = function () {
    const btn = document.getElementById('shell-profile-btn');
    const dd  = document.getElementById('shell-dropdown');
    const isOpen = dd.classList.contains('open');
    dd.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
  };

  /* Close dropdown on outside click */
  document.addEventListener('click', function (e) {
    const area = document.getElementById('shUserArea');
    if (area && !area.contains(e.target)) {
      document.getElementById('shell-dropdown')?.classList.remove('open');
      document.getElementById('shell-profile-btn')?.classList.remove('open');
    }
  });

  /* ─────────────────────────────────────────
     5. LOGOUT
  ───────────────────────────────────────── */
  window.shellLogout = async function () {
    const sb = getSb();
    if (!sb) return;
    await sb.auth.signOut();
    location.href = 'index.html';
  };

  /* ─────────────────────────────────────────
     6. INFO SHEET helper
  ───────────────────────────────────────── */
  window.shellGoInfo = function (e) {
    if (PAGE === 'index' && typeof openInfoSheet === 'function') {
      e.preventDefault();
      openInfoSheet();
    }
    /* else: let href="index.html#info" do its thing */
  };

  /* ─────────────────────────────────────────
     7. HOOK: page's openAuth / login modal
     If the current page has openAuth(), wire it up
     so the guest btn on topbar calls it.
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    window._shellOpenLogin = function () {
      if (typeof openAuth === 'function') openAuth('login');
      else if (typeof openLoginModal === 'function') openLoginModal();
      else alert('Silakan login terlebih dahulu.');
    };
  });

  /* ─────────────────────────────────────────
     8. OFFSET existing layout elements
     Push down nav/aside that already exist
     so they don't overlap the shell.
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    /* If page has its own nav (sticky top:0), push it down */
    const existingNav = document.querySelector('nav:not(#shell-topbar)');
    if (existingNav) existingNav.style.display = 'none';

    /* If page has its own aside, hide it — shell sidebar replaces */
    const existingAside = document.querySelector('aside:not(#shell-sidebar)');
    if (existingAside) existingAside.style.display = 'none';

    /* Push page content wrapper */
    const wrappers = [
      document.querySelector('.page'),
      document.querySelector('#pageWrap'),
      document.querySelector('#main'),
      document.querySelector('main'),
    ];
    wrappers.forEach(w => {
      if (w && w.id !== 'shell-sidebar' && w.id !== 'shell-topbar') {
        w.style.marginLeft = '220px';
      }
    });
  });

  /* ── RUN ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', shellInit);
  } else {
    shellInit();
  }

})();
