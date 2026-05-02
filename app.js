// ═══════════════════════════════════════════
//  WiFi Key Viewer — app.js
// ═══════════════════════════════════════════

// ─── Sample Data ───────────────────────────
const NETWORKS = [
  { id:1, ssid:'HomeNetwork_5G',    mac:'A4:C3:F0:1B:2E:8D', security:'WPA3', password:'Secure#Home2024!',  date:'2026-05-01', time:'09:14 AM', signal:4 },
  { id:2, ssid:'OfficeWiFi_Corp',  mac:'B2:7F:D1:4A:9C:3E', security:'WPA2', password:'C0rp@ssw0rd99',     date:'2026-04-30', time:'03:42 PM', signal:3 },
  { id:3, ssid:'CafeHotspot',       mac:'C1:8E:A3:5D:7F:12', security:'WPA2', password:'freecoffee2024',    date:'2026-04-28', time:'11:20 AM', signal:2 },
  { id:4, ssid:'Neighbor_Net',      mac:'D3:6A:B0:2C:8E:51', security:'WPA',  password:'MyWifi@2023',       date:'2026-04-25', time:'06:05 PM', signal:1 },
  { id:5, ssid:'iPhone_Hotspot',    mac:'E5:9D:C2:3F:1A:76', security:'WPA3', password:'iPhone2024Share',   date:'2026-04-22', time:'01:30 PM', signal:4 },
  { id:6, ssid:'Lab_Network_A',     mac:'F7:2B:D4:6E:0C:89', security:'WPA2', password:'LabSecure#456',     date:'2026-04-20', time:'08:00 AM', signal:3 },
  { id:7, ssid:'PublicLibrary',     mac:'G9:1C:E5:7A:2D:04', security:'WPA2', password:'ReadMore2024',      date:'2026-04-18', time:'02:15 PM', signal:3 },
  { id:8, ssid:'RouterAP_5GHz',    mac:'H3:4E:A7:9B:5F:C2', security:'WPA2', password:'RouterPass!789',    date:'2026-04-15', time:'10:45 AM', signal:4 },
  { id:9, ssid:'WeakNet_OLD',       mac:'I6:8D:B3:1E:4C:37', security:'WEP',  password:'oldpass',           date:'2026-04-10', time:'07:00 PM', signal:1 },
  { id:10,ssid:'HotelGuest_Floor2', mac:'J2:5A:C6:3D:8E:90', security:'WPA2', password:'GuestWiFi@Hotel',   date:'2026-04-05', time:'09:30 PM', signal:2 },
  { id:11,ssid:'DevLab_Secure',     mac:'K8:0F:D2:6B:1A:53', security:'WPA3', password:'DevL@b#Secure2025', date:'2026-03-28', time:'04:00 PM', signal:4 },
  { id:12,ssid:'BackupAccess',      mac:'L4:3C:E9:7F:2B:16', security:'WPA2', password:'Backup!Link123',    date:'2026-03-15', time:'11:55 AM', signal:2 },
];

let visiblePasswords = new Set();
let filteredNetworks = [...NETWORKS];
let searchQuery = '';
let securityFilter = 'all';

// ─── Background Canvas ──────────────────────
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [], lines = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Grid
  function drawGrid() {
    ctx.strokeStyle = 'rgba(0,255,204,0.04)';
    ctx.lineWidth = 1;
    const sz = 60;
    for (let x = 0; x < w; x += sz) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += sz) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
  }

  // Particles
  for (let i = 0; i < 40; i++) {
    particles.push({ x: Math.random()*w, y: Math.random()*h, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*2+.5, o:Math.random() });
  }

  function drawParticles() {
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,204,${p.o * 0.5})`;
      ctx.fill();
    });
    // Lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,255,204,${(1-d/120)*0.08})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
  }

  // Scan line effect
  let scanY = 0;
  function drawScanLine() {
    scanY = (scanY + .5) % h;
    const grad = ctx.createLinearGradient(0, scanY-20, 0, scanY+20);
    grad.addColorStop(0, 'rgba(0,255,204,0)');
    grad.addColorStop(.5, 'rgba(0,255,204,0.03)');
    grad.addColorStop(1, 'rgba(0,255,204,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY-20, w, 40);
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    drawGrid();
    drawScanLine();
    drawParticles();
    requestAnimationFrame(animate);
  }
  animate();
}

// ─── Notifications ─────────────────────────
function notify(msg, type='success') {
  const icons = {
    success:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    warn:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    info:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
  };
  const el = document.createElement('div');
  el.className = `notif ${type}`;
  el.innerHTML = `<span class="notif-icon">${icons[type]||icons.info}</span><span class="notif-text">${msg}</span><button class="notif-close" onclick="this.parentElement.remove()">✕</button>`;
  document.getElementById('notifications').appendChild(el);
  setTimeout(() => { el.classList.add('fadeout'); setTimeout(() => el.remove(), 300); }, 3500);
}

// ─── Render Table ───────────────────────────
function renderTable() {
  const tbody = document.getElementById('networksBody');
  const q = searchQuery.toLowerCase();
  filteredNetworks = NETWORKS.filter(n => {
    const matchQ = !q || n.ssid.toLowerCase().includes(q) || n.security.toLowerCase().includes(q);
    const matchF = securityFilter === 'all' || n.security === securityFilter;
    return matchQ && matchF;
  });

  document.getElementById('tableCount').textContent = `${filteredNetworks.length} entries`;
  document.getElementById('footerInfo').textContent = `Showing ${filteredNetworks.length} of ${NETWORKS.length} networks`;

  if (!filteredNetworks.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text3)">No networks match your filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = filteredNetworks.map(n => {
    const shown = visiblePasswords.has(n.id);
    const pw = shown ? n.password : '•'.repeat(Math.min(n.password.length, 14));
    const secClass = n.security.toLowerCase().replace('-','');
    const eyeIcon = shown
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    const bars = [1,2,3,4].map(i=>`<span class="${i<=n.signal?'on':''}"></span>`).join('');
    const secIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
    return `
    <tr data-id="${n.id}">
      <td>
        <div class="ssid-cell">
          <div class="ssid-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1.5 8.5a13 13 0 0 1 21 0"/><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a6 6 0 0 1 7 0"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg></div>
          <div><div class="ssid-name">${n.ssid}</div><div class="ssid-mac">${n.mac}</div></div>
        </div>
      </td>
      <td><span class="security-badge ${secClass}">${secIcon}${n.security}</span></td>
      <td>
        <div class="password-cell">
          <span class="password-text" id="pw-${n.id}">${pw}</span>
          <button class="eye-btn" onclick="togglePassword(${n.id})" title="${shown?'Hide':'Show'} password">${eyeIcon}</button>
        </div>
      </td>
      <td><div class="date-cell">${n.date}<small>${n.time}</small></div></td>
      <td><div class="signal-bar">${bars}</div></td>
      <td>
        <div class="actions-cell">
          <button class="action-btn copy-btn" onclick="copyPassword(${n.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copy
          </button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// ─── Toggle Password Visibility ─────────────
function togglePassword(id) {
  if (visiblePasswords.has(id)) visiblePasswords.delete(id);
  else visiblePasswords.add(id);
  renderTable();
}

// ─── Copy Password ──────────────────────────
function copyPassword(id) {
  const net = NETWORKS.find(n => n.id === id);
  if (!net) return;
  navigator.clipboard.writeText(net.password).then(() => {
    notify(`Password for <strong>${net.ssid}</strong> copied!`, 'success');
  }).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = net.password;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    notify(`Password for <strong>${net.ssid}</strong> copied!`, 'success');
  });
}

// ─── Scan Networks ──────────────────────────
function startScan() {
  const modal = document.getElementById('scanModal');
  const fill = document.getElementById('scanFill');
  const status = document.getElementById('scanStatus');
  modal.classList.add('active');

  const steps = [
    [10, 'Querying Windows Credential Store...'],
    [25, 'Reading WLAN profiles...'],
    [45, 'Decrypting network keys...'],
    [65, 'Analyzing security protocols...'],
    [80, 'Cross-referencing MAC addresses...'],
    [95, 'Finalizing results...'],
    [100,'Scan complete!'],
  ];
  let i = 0;
  const interval = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        modal.classList.remove('active');
        fill.style.width = '0%';
        status.textContent = 'Initializing scan...';
        notify('Scan complete — 12 networks found!', 'success');
        renderTable();
      }, 600);
      return;
    }
    fill.style.width = steps[i][0] + '%';
    status.textContent = steps[i][1];
    i++;
  }, 500);
}

// ─── Export CSV ─────────────────────────────
function exportCSV() {
  const headers = ['SSID','MAC Address','Security','Password','Last Connected'];
  const rows = NETWORKS.map(n => [
    `"${n.ssid}"`, `"${n.mac}"`, n.security, `"${n.password}"`, n.date
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'wifi_passwords.csv';
  a.click(); URL.revokeObjectURL(url);
  notify('Passwords exported as <strong>wifi_passwords.csv</strong>', 'success');
}

// ─── Sidebar Navigation ──────────────────────
function initNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const page = item.dataset.page;
      const titles = { dashboard:'Dashboard', networks:'Saved Networks', security:'Security Status', settings:'Settings' };
      const breadcrumbs = { dashboard:'Overview', networks:'Network List', security:'Security Audit', settings:'Configuration' };
      document.getElementById('pageTitle').textContent = titles[page] || page;
      document.getElementById('breadcrumb').textContent = breadcrumbs[page] || page;
      if (page !== 'dashboard') notify(`Navigated to <strong>${titles[page]}</strong>`, 'info');
    });
  });
}

// ─── Sidebar Toggle ──────────────────────────
function initSidebarToggle() {
  const btn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  btn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
}

// ─── Keyboard Shortcut ───────────────────────
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  if (e.key === 'Escape') {
    document.getElementById('scanModal').classList.remove('active');
    document.getElementById('searchInput').blur();
  }
});

// ─── Search & Filter ─────────────────────────
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  renderTable();
});
document.getElementById('securityFilter').addEventListener('change', e => {
  securityFilter = e.target.value;
  renderTable();
});

// ─── Button Events ───────────────────────────
document.getElementById('scanBtn').addEventListener('click', startScan);
document.getElementById('exportBtn').addEventListener('click', exportCSV);
document.getElementById('cancelScan').addEventListener('click', () => {
  document.getElementById('scanModal').classList.remove('active');
});
document.getElementById('refreshBtn').addEventListener('click', () => {
  // Animate table rows
  const rows = document.querySelectorAll('#networksBody tr');
  rows.forEach((r,i) => {
    r.style.opacity = '0';
    r.style.transform = 'translateY(-8px)';
    r.style.transition = 'all .3s ease';
    setTimeout(() => { r.style.opacity='1'; r.style.transform='translateY(0)'; }, i*50);
  });
  notify('Network list refreshed', 'info');
});

// ─── Modal Outside Click ─────────────────────
document.getElementById('scanModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
});

// ─── Init ────────────────────────────────────
initCanvas();
initNav();
initSidebarToggle();
renderTable();

// Boot notification
setTimeout(() => notify('WiFi Key Viewer loaded — <strong>12 networks</strong> available', 'info'), 800);
setTimeout(() => notify('⚠ WEP network detected: <strong>WeakNet_OLD</strong>', 'warn'), 2000);
