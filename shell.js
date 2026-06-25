/* ═══════════════════════════════════════════════════════════════
   XREZZKY STORE — shell.js v6.0
   Fix: content rata kiri sidebar, mobile brand di topbar,
        search full width, profil working
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SUPA_URL = 'https://pvkhsjiftfzjpgkoiawq.supabase.co';
  var SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a2hzamlmdGZ6anBna29pYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NzMwMjQsImV4cCI6MjA5NzU0OTAyNH0.Fo82CROzoQE90ckYYv7rlnDkLxP0JZ2tN-T2hgnk-fA';
  var CLD  = 'https://res.cloudinary.com/drjmclzbi/image/upload/';
  var PAGE = location.pathname.split('/').pop().replace('.html','') || 'index';
  var SW   = 214; // sidebar width px

  /* ══════════════════════════════════════════
     CSS
  ══════════════════════════════════════════ */
  var st = document.createElement('style');
  st.id  = 'shell-css';
  st.textContent = `

/* ── MOBILE TOPBAR BRAND (≤900px) ── */
#sh-mob-bar {
  display: none;
}
@media (max-width: 900px) {
  #sh-mob-bar {
    display: flex !important;
    position: sticky; top: 0; z-index: 600;
    height: 48px; background: #0f1319;
    border-bottom: 1px solid #1e2736;
    align-items: center; padding: 0 14px; gap: 10px;
    font-family: 'Poppins', sans-serif; box-sizing: border-box;
  }
  .smb-brand {
    display: flex; align-items: center; gap: 7px;
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 800;
    color: #f5f7fa; text-decoration: none; white-space: nowrap;
  }
  .smb-dot { width: 7px; height: 7px; border-radius: 50%; background: #4a7dff; flex-shrink: 0; }
  .smb-brand em { font-style: normal; color: #4a7dff; }
  .smb-sp { flex: 1; }
  .smb-av {
    width: 30px; height: 30px; border-radius: 50%;
    background: #4a7dff; border: 2px solid #4a7dff;
    overflow: hidden; display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
    cursor: pointer; text-decoration: none;
  }
  .smb-av img { width: 100%; height: 100%; object-fit: cover; display: block; }
}

/* ── DESKTOP SHELL: only ≥901px ── */
@media (max-width: 900px) {
  #sh-bar  { display: none !important; }
  #sh-side { display: none !important; }
  body.sh-on { padding-top: 0 !important; }
  body.sh-on .page,
  body.sh-on #pageRoot,
  body.sh-on main,
  body.sh-on #main,
  body.sh-on #wrapper { margin-left: 0 !important; width: 100% !important; }
}

/* ── TOPBAR (desktop) ── */
#sh-bar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 600;
  height: 52px; background: #0f1319; border-bottom: 1px solid #1e2736;
  display: flex; align-items: center; padding: 0 16px 0 0; gap: 0;
  font-family: 'Poppins', sans-serif; box-sizing: border-box;
}
/* Brand aligned to sidebar width */
.sh-brand {
  display: flex; align-items: center; gap: 7px;
  font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 800;
  color: #f5f7fa; text-decoration: none; white-space: nowrap;
  width: ${SW}px; min-width: ${SW}px; padding: 0 16px;
  box-sizing: border-box; flex-shrink: 0;
  border-right: 1px solid #1e2736; height: 100%;
  align-items: center;
}
.sh-dot { width: 7px; height: 7px; border-radius: 50%; background: #4a7dff; flex-shrink: 0; }
.sh-brand em { font-style: normal; color: #4a7dff; }

/* Search — fills remaining space */
.sh-srch {
  flex: 1; position: relative; padding: 0 12px;
}
.sh-srch input {
  width: 100%; background: #1a2233; border: 1px solid #1e2736;
  border-radius: 8px; padding: 7px 34px 7px 12px;
  color: #f5f7fa; font-family: 'Poppins', sans-serif;
  font-size: 13px; outline: none; transition: border .18s; box-sizing: border-box;
}
.sh-srch input:focus { border-color: #4a7dff; }
.sh-srch input::placeholder { color: #9ba6b2; }
.sh-srch-btn {
  position: absolute; right: 22px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #9ba6b2; cursor: pointer; font-size: 12px;
}
.sh-srch-btn:hover { color: #4a7dff; }

/* Guest btn */
#sh-guest {
  display: flex; align-items: center; gap: 7px; padding: 6px 14px;
  border-radius: 8px; background: #4a7dff; color: #fff; border: none;
  font-size: 13px; font-weight: 600; cursor: pointer;
  font-family: 'Poppins', sans-serif; flex-shrink: 0; margin-right: 4px;
}
#sh-guest:hover { background: #5d8fff; }

/* Profile pill */
#sh-pw { position: relative; flex-shrink: 0; margin-right: 4px; }
#sh-pb {
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  padding: 5px 11px 5px 5px; border-radius: 24px;
  background: #1a2233; border: 1px solid #1e2736;
  transition: border-color .18s; user-select: none;
  -webkit-tap-highlight-color: transparent;
}
#sh-pb:hover { border-color: #4a7dff; }
#sh-av {
  width: 28px; height: 28px; border-radius: 50%; background: #4a7dff;
  border: 2px solid transparent; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0;
  transition: border-color .2s;
}
#sh-av img { width: 100%; height: 100%; object-fit: cover; display: block; }
#sh-av.av-ok { border-color: #4a7dff; }
#sh-un {
  font-size: 13px; font-weight: 600; color: #f5f7fa;
  max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
#sh-rb {
  font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
  background: rgba(74,125,255,.15); color: #4a7dff;
  text-transform: uppercase; letter-spacing: .04em; white-space: nowrap;
}
#sh-rb.seller { background: rgba(245,158,11,.15); color: #f59e0b; }
#sh-rb.admin  { background: rgba(239,68,68,.15);  color: #ef4444; }
#sh-rb.owner  { background: rgba(168,85,247,.15); color: #a855f7; }
#sh-rb.cs     { background: rgba(34,197,94,.15);  color: #22c55e; }
#sh-cv { font-size: 10px; color: #9ba6b2; transition: transform .2s; flex-shrink: 0; }
#sh-pw.dd-open #sh-cv { transform: rotate(180deg); }

/* Dropdown */
#sh-dd {
  position: absolute; top: calc(100% + 8px); right: 0; width: 240px;
  background: #141920; border: 1px solid #1e2736; border-radius: 13px;
  box-shadow: 0 16px 48px rgba(0,0,0,.7); overflow: hidden;
  display: none; flex-direction: column; z-index: 9999;
}
#sh-pw.dd-open #sh-dd { display: flex; animation: ddIn .16s ease; }
@keyframes ddIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
.dh { padding: 14px 16px 12px; border-bottom: 1px solid #1e2736; background: #1a2030; }
.dh-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.d-av {
  width: 36px; height: 36px; border-radius: 50%; border: 2px solid #4a7dff;
  background: #4a7dff; overflow: hidden; display: flex; align-items: center;
  justify-content: center; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0;
}
.d-av img { width: 100%; height: 100%; object-fit: cover; display: block; }
.d-inf { min-width: 0; }
.d-name { font-size: 13px; font-weight: 700; color: #f5f7fa; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.d-mail { font-size: 11px; color: #9ba6b2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.d-bal {
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(74,125,255,.08); border: 1px solid rgba(74,125,255,.18);
  border-radius: 8px; padding: 8px 12px;
}
.d-bal .bl { font-size: 11px; color: #9ba6b2; }
.d-bal .bv { font-size: 14px; font-weight: 700; color: #4a7dff; }
.d-sec { padding: 5px 0; border-bottom: 1px solid #1e2736; }
.d-sec:last-child { border-bottom: none; }
.d-lbl { font-size: 10px; font-weight: 600; color: #9ba6b2; text-transform: uppercase; letter-spacing: .06em; padding: 5px 16px 3px; }
.d-a {
  display: flex; align-items: center; gap: 9px; padding: 9px 16px;
  font-size: 13px; color: #9ba6b2; text-decoration: none; transition: all .15s;
  background: none; border: none; width: 100%; text-align: left;
  font-family: 'Poppins', sans-serif; cursor: pointer; box-sizing: border-box;
}
.d-a:hover { background: #1d2430; color: #f5f7fa; }
.d-a i { width: 15px; text-align: center; font-size: 13px; }
.d-a.red { color: #ef4444; }
.d-a.red:hover { background: rgba(239,68,68,.07); }

/* ── SIDEBAR ── */
#sh-side {
  position: fixed; top: 52px; left: 0; bottom: 0; width: ${SW}px; z-index: 500;
  background: #0f1319; border-right: 1px solid #1e2736;
  overflow-y: auto; overflow-x: hidden; padding: 10px 8px 24px;
  display: flex; flex-direction: column; gap: 1px;
  font-family: 'Poppins', sans-serif;
}
#sh-side::-webkit-scrollbar { width: 3px; }
#sh-side::-webkit-scrollbar-thumb { background: #1e2736; border-radius: 3px; }
.s-lbl {
  font-size: 10px; font-weight: 600; letter-spacing: .08em; color: #9ba6b2;
  text-transform: uppercase; padding: 10px 10px 4px;
}
.s-a {
  display: flex; align-items: center; gap: 9px; padding: 9px 12px;
  border-radius: 8px; color: #9ba6b2; font-size: 13px; font-weight: 500;
  text-decoration: none; transition: all .16s; border: none; background: none;
  width: 100%; text-align: left; font-family: 'Poppins', sans-serif;
  cursor: pointer; box-sizing: border-box;
}
.s-a:hover { background: #1a2233; color: #f5f7fa; }
.s-a.on { background: rgba(74,125,255,.12); color: #4a7dff; }
.s-a i { width: 15px; text-align: center; font-size: 13px; flex-shrink: 0; }
.s-sep { height: 1px; background: #1e2736; margin: 7px 4px; }
.s-bdg {
  margin-left: auto; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 10px;
  background: rgba(245,158,11,.2); color: #f59e0b;
}
.s-bdg.r { background: rgba(239,68,68,.2); color: #ef4444; }

/* ── CONTENT PUSH (desktop only) ── */
@media (min-width: 901px) {
  body.sh-on { padding-top: 52px !important; }

  /* Hide page's own nav/aside */
  body.sh-on nav:not(#sh-bar)    { display: none !important; }
  body.sh-on aside:not(#sh-side) { display: none !important; }
  body.sh-on #xbn                { display: none !important; }
  body.sh-on #mobileHeader       { display: none !important; }
  body.sh-on #mobilePageHeader   { display: none !important; }
  body.sh-on #sh-mob-bar         { display: none !important; }

  /* Content area: starts RIGHT at sidebar edge */
  body.sh-on .page,
  body.sh-on #pageRoot {
    margin-left: ${SW}px !important;
    width: calc(100% - ${SW}px) !important;
    max-width: none !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    display: block !important;
    padding: 0 !important;
  }
  body.sh-on main:not(#sh-side) {
    margin-left: 0 !important;
    width: 100% !important;
    max-width: none !important;
    box-sizing: border-box !important;
    padding: 20px 20px !important;
  }
  body.sh-on #main,
  body.sh-on #wrapper {
    margin-left: ${SW}px !important;
    width: calc(100% - ${SW}px) !important;
    box-sizing: border-box !important;
    max-width: none !important;
  }
}
  `;
  document.head.appendChild(st);

  /* ── Mobile brand topbar ── */
  var mobBar = document.createElement('div');
  mobBar.id = 'sh-mob-bar';
  mobBar.innerHTML = `
    <a class="smb-brand" href="index.html">
      <div class="smb-dot"></div>XREZZKY<em>STORE</em>
    </a>
    <div class="smb-sp"></div>
    <a class="smb-av" href="profil.html" id="smbAv" title="Profil">
      <i class="fas fa-user" style="font-size:11px"></i>
    </a>`;

  /* ── Desktop Topbar ── */
  var bar = document.createElement('div');
  bar.id = 'sh-bar';
  bar.innerHTML = `
    <a class="sh-brand" href="index.html">
      <div class="sh-dot"></div>XREZZKY<em>STORE</em>
    </a>
    <div class="sh-srch" id="shSrch">
      <input id="shSrchInp" type="text" placeholder="Cari produk..."
        onkeydown="if(event.key==='Enter')location.href='index.html?q='+encodeURIComponent(this.value)"/>
      <button class="sh-srch-btn"
        onclick="location.href='index.html?q='+encodeURIComponent(document.getElementById('shSrchInp').value)">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <button id="sh-guest" onclick="shOpenLogin()" style="display:none">
      <i class="fas fa-sign-in-alt"></i> Masuk
    </button>

    <div id="sh-pw" style="display:none">
      <div id="sh-pb">
        <div id="sh-av"><i class="fas fa-user" style="font-size:11px"></i></div>
        <span id="sh-un">User</span>
        <span id="sh-rb" style="display:none"></span>
        <i class="fas fa-chevron-down" id="sh-cv"></i>
      </div>
      <div id="sh-dd">
        <div class="dh">
          <div class="dh-top">
            <div class="d-av" id="shDdAv"><i class="fas fa-user"></i></div>
            <div class="d-inf">
              <div class="d-name" id="shDdName">—</div>
              <div class="d-mail" id="shDdMail">—</div>
            </div>
          </div>
          <div class="d-bal">
            <span class="bl"><i class="fas fa-wallet" style="margin-right:5px;opacity:.6"></i>Saldo</span>
            <span class="bv" id="shDdBal">Rp 0</span>
          </div>
        </div>
        <div class="d-sec">
          <div class="d-lbl">Akun Saya</div>
          <a class="d-a" href="profil.html"><i class="fas fa-user-circle"></i> Profil Saya</a>
          <a class="d-a" href="profil.html#pengaturan"><i class="fas fa-cog"></i> Pengaturan Akun</a>
        </div>
        <div class="d-sec">
          <button class="d-a red" onclick="shLogout()"><i class="fas fa-sign-out-alt"></i> Keluar</button>
        </div>
      </div>
    </div>`;

  /* ── Sidebar ── */
  var side = document.createElement('div');
  side.id = 'sh-side';

  /* Insert ke body */
  document.body.insertBefore(side, document.body.firstChild);
  document.body.insertBefore(bar,  document.body.firstChild);
  document.body.insertBefore(mobBar, document.body.firstChild);
  document.body.classList.add('sh-on');

  /* ── Dropdown ── */
  document.getElementById('sh-pb').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('sh-pw').classList.toggle('dd-open');
  });
  document.addEventListener('click', function(e) {
    var pw = document.getElementById('sh-pw');
    if (pw && !pw.contains(e.target)) pw.classList.remove('dd-open');
  });

  /* ── Sidebar builder ── */
  function buildSidebar(role) {
    var isSeller = ['seller','admin','owner'].indexOf(role) > -1;
    var isAdmin  = ['admin','owner'].indexOf(role) > -1;
    var isOwner  = role === 'owner';
    var isCs     = ['cs','admin','owner'].indexOf(role) > -1;

    function sa(icon, label, href, active, bdgId, bdgCls) {
      var b = bdgId ? '<span class="s-bdg'+(bdgCls?' '+bdgCls:'')+'" id="'+bdgId+'" style="display:none">0</span>' : '';
      return '<a class="s-a'+(active?' on':'')+'" href="'+href+'"><i class="'+icon+'"></i>'+label+b+'</a>';
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
      h += sa('fas fa-inbox',         'Pesanan Masuk',    'seller-dashboard.html?tab=orders', false,'sbOrd');
    }
    if (isAdmin) {
      h += '<div class="s-sep"></div><div class="s-lbl">'+(isOwner?'Owner':'Admin')+'</div>';
      h += sa('fas fa-chart-pie', 'Admin Panel',    'admin-panel.html',   PAGE==='admin-panel');
      h += sa('fas fa-newspaper', 'Info Admin',     'info-admin.html',    PAGE==='info-admin');
      h += sa('fas fa-qrcode',    'Kelola Deposit', 'deposit-admin.html', PAGE==='deposit-admin','sbDep','r');
    }
    if (isCs) {
      h += '<div class="s-sep"></div><div class="s-lbl">Customer Service</div>';
      h += sa('fas fa-headset','CS Dashboard','cs-dashboard.html',PAGE==='cs-dashboard');
    }

    side.innerHTML = h;

    var il = side.querySelector('[href="index.html#info"]');
    if (il) il.addEventListener('click', function(e) {
      if (PAGE==='index' && typeof openInfoSheet==='function') { e.preventDefault(); openInfoSheet(); }
    });
  }

  /* ── Supabase ── */
  function getSb() {
    if (window.sb) return window.sb;
    if (typeof supabase !== 'undefined') {
      window.sb = supabase.createClient(SUPA_URL, SUPA_KEY);
      return window.sb;
    }
    return null;
  }
  function fmtRp(v) { return 'Rp '+Number(v||0).toLocaleString('id-ID'); }

  function setAv(el, avUrl, name) {
    var l = (name||'U')[0].toUpperCase();
    if (avUrl) {
      el.innerHTML = '<img src="'+CLD+avUrl+'" alt="">';
      el.classList.add('av-ok');
    } else {
      el.innerHTML = '<span style="font-size:12px;font-weight:700">'+l+'</span>';
      el.style.background = '#4a7dff';
    }
  }

  async function shInit() {
    var client = getSb();
    if (!client) { showGuest(); buildSidebar('buyer'); return; }
    try {
      var { data:{ session } } = await client.auth.getSession();
      if (!session) { showGuest(); buildSidebar('buyer'); return; }

      var { data: p } = await client
        .from('profiles')
        .select('id,username,full_name,email,avatar_url,role,balance')
        .eq('id', session.user.id).maybeSingle();

      window._shProf = p;
      showUser(session.user, p);
      buildSidebar((p&&p.role)||'buyer');
      loadBadges(p);
    } catch(e) {
      console.warn('[shell]',e);
      showGuest(); buildSidebar('buyer');
    }
  }

  function showGuest() {
    document.getElementById('sh-guest').style.display = '';
    document.getElementById('sh-pw').style.display    = 'none';
  }

  function showUser(user, p) {
    document.getElementById('sh-guest').style.display = 'none';
    document.getElementById('sh-pw').style.display    = '';

    var name = (p&&(p.username||p.full_name))||(user.email||'').split('@')[0]||'User';
    var role = (p&&p.role)||'buyer';
    var av   = p&&p.avatar_url;

    document.getElementById('sh-un').textContent = name;
    var rb = document.getElementById('sh-rb');
    if (role !== 'buyer') { rb.textContent=role; rb.className=role; rb.style.display=''; }
    else rb.style.display = 'none';

    setAv(document.getElementById('sh-av'), av, name);
    document.getElementById('shDdName').textContent = name;
    document.getElementById('shDdMail').textContent = (p&&p.email)||user.email||'—';
    document.getElementById('shDdBal').textContent  = fmtRp(p&&p.balance);
    setAv(document.getElementById('shDdAv'), av, name);

    /* Mobile avatar */
    var mav = document.getElementById('smbAv');
    if (mav) {
      if (av) mav.innerHTML = '<img src="'+CLD+av+'" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
      else { mav.innerHTML = '<span style="font-size:12px;font-weight:700">'+name[0].toUpperCase()+'</span>'; }
    }
  }

  async function loadBadges(p) {
    if (!p) return;
    var client = getSb(); if (!client) return;
    var role = (p&&p.role)||'buyer';
    try {
      if (['seller','admin','owner'].indexOf(role)>-1) {
        var r1 = await client.from('orders').select('id',{count:'exact',head:true})
          .eq('seller_id',p.id).in('status',['pending','pending_mc']);
        if ((r1.count||0)>0) { var e=document.getElementById('sbOrd'); if(e){e.textContent=r1.count;e.style.display='';} }
      }
      if (['admin','owner'].indexOf(role)>-1) {
        var r2 = await client.from('deposit_requests').select('id',{count:'exact',head:true}).eq('status','waiting_review');
        if ((r2.count||0)>0) { var e2=document.getElementById('sbDep'); if(e2){e2.textContent=r2.count;e2.style.display='';} }
      }
    } catch(e) {}
  }

  window.shLogout = async function() {
    var c = getSb(); try{if(c)await c.auth.signOut();}catch(e){}
    location.href='index.html';
  };
  window.shOpenLogin = function() {
    if (typeof openAuth==='function'){openAuth('login');return;}
    if (typeof openLoginModal==='function'){openLoginModal();return;}
    location.href='index.html';
  };

  /* ── Fix layout ── */
  function fixLayout() {
    document.querySelectorAll('nav:not(#sh-bar)').forEach(function(n){n.style.display='none';});
    document.querySelectorAll('aside:not(#sh-side)').forEach(function(n){n.style.display='none';});
    var pg = document.querySelector('.page');
    if (pg) { pg.style.display='block'; pg.style.maxWidth='none'; pg.style.flex='none'; }
    var mn = document.querySelector('main');
    if (mn&&mn.id!=='sh-side') { mn.style.flex='none'; mn.style.maxWidth='none'; mn.style.minWidth='0'; mn.style.width='100%'; mn.style.boxSizing='border-box'; }
  }

  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded',function(){ fixLayout(); setTimeout(shInit,150); });
  } else { fixLayout(); setTimeout(shInit,150); }

})();
