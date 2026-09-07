const BASE = (() => {
  const p = location.pathname;
  if (p.includes('/research-daily')) {
    const i = p.indexOf('/research-daily');
    return p.slice(0, i + '/research-daily'.length).replace(/\/?$/, '/');
  }
  return './';
})();

const DOW = ['一', '二', '三', '四', '五', '六', '日'];

let digests = [];
let byDate = new Map();
let viewYear, viewMonth; // month 0-11
let currentDate = null;

async function loadIndex() {
  const res = await fetch(BASE + 'digests/index.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('无法加载 digests/index.json');
  return res.json();
}

function ymd(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseYmd(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function setMonthLabel() {
  document.getElementById('monthLabel').textContent =
    `${viewYear} 年 ${String(viewMonth + 1).padStart(2, '0')} 月`;
}

function renderCalendar() {
  const el = document.getElementById('calendar');
  el.innerHTML = '';
  DOW.forEach(d => {
    const s = document.createElement('div');
    s.className = 'cal-dow';
    s.textContent = d;
    el.appendChild(s);
  });

  const first = new Date(viewYear, viewMonth, 1);
  // Monday-first
  let startPad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevDays = new Date(viewYear, viewMonth, 0).getDate();

  for (let i = 0; i < startPad; i++) {
    const day = prevDays - startPad + i + 1;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cal-cell muted';
    btn.textContent = String(day);
    btn.disabled = true;
    el.appendChild(btn);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cal-cell';
    btn.textContent = String(day);
    if (byDate.has(dateStr)) {
      btn.classList.add('has');
      btn.title = byDate.get(dateStr).title || dateStr;
      btn.onclick = () => showDigest(byDate.get(dateStr));
    } else {
      btn.classList.add('muted');
      btn.disabled = true;
    }
    if (dateStr === currentDate) btn.classList.add('active');
    el.appendChild(btn);
  }

  const total = startPad + daysInMonth;
  const rem = (7 - (total % 7)) % 7;
  for (let i = 1; i <= rem; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cal-cell muted';
    btn.textContent = String(i);
    btn.disabled = true;
    el.appendChild(btn);
  }
}

function renderTimeline() {
  const list = document.getElementById('timeline');
  list.innerHTML = '';
  digests.forEach(d => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.date = d.date;
    btn.textContent = d.date;
    if (d.date === currentDate) btn.classList.add('active');
    btn.onclick = () => showDigest(d);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function syncChrome() {
  setMonthLabel();
  renderCalendar();
  renderTimeline();
}

async function showDigest(entry) {
  const content = document.getElementById('content');
  content.innerHTML = '<p class="muted">加载中…</p>';
  currentDate = entry.date;
  const dt = parseYmd(entry.date);
  viewYear = dt.getFullYear();
  viewMonth = dt.getMonth();
  syncChrome();
  history.replaceState(null, '', `#${entry.date}`);

  const res = await fetch(BASE + entry.path, { cache: 'no-store' });
  if (!res.ok) {
    content.innerHTML = `<p class="muted">找不到 ${entry.path}</p>`;
    return;
  }
  let md = await res.text();
  md = md.replace(/\]\((20\d{2}-\d{2}-\d{2}\/figs\/[^)]+)\)/g, `](${BASE}digests/$1)`);
  content.innerHTML = marked.parse(md);
  content.querySelectorAll('a').forEach(a => {
    if (a.hostname && a.hostname !== location.hostname) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  });
  content.scrollIntoView({ block: 'start' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

(async () => {
  try {
    const data = await loadIndex();
    digests = [...data.digests].sort((a, b) => b.date.localeCompare(a.date));
    byDate = new Map(digests.map(d => [d.date, d]));

    const hash = location.hash.replace(/^#/, '');
    const initial = digests.find(d => d.date === hash) || digests[0];
    const seed = initial ? parseYmd(initial.date) : new Date();
    viewYear = seed.getFullYear();
    viewMonth = seed.getMonth();

    document.getElementById('prevMonth').onclick = () => {
      viewMonth -= 1;
      if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
      setMonthLabel();
      renderCalendar();
    };
    document.getElementById('nextMonth').onclick = () => {
      viewMonth += 1;
      if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
      setMonthLabel();
      renderCalendar();
    };

    if (initial) await showDigest(initial);
    else {
      syncChrome();
      document.getElementById('content').innerHTML = '<p class="muted">还没有日报。</p>';
    }
  } catch (e) {
    document.getElementById('content').innerHTML = `<p class="muted">加载失败：${e.message}</p>`;
  }
})();
