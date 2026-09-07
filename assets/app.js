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
let leftCollapsed = false;

async function loadIndex() {
  const res = await fetch(BASE + 'digests/index.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('无法加载 digests/index.json');
  return res.json();
}

function parseYmd(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function setMonthLabels() {
  const text = `${viewYear} 年 ${String(viewMonth + 1).padStart(2, '0')} 月`;
  const a = document.getElementById('monthLabel');
  const b = document.getElementById('mobileMonthLabel');
  if (a) a.textContent = text;
  if (b) b.textContent = text;
}

function fillCalendar(el) {
  if (!el) return;
  el.innerHTML = '';
  DOW.forEach(d => {
    const s = document.createElement('div');
    s.className = 'cal-dow';
    s.textContent = d;
    el.appendChild(s);
  });

  const first = new Date(viewYear, viewMonth, 1);
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
      btn.onclick = () => {
        closeMobilePanel();
        showDigest(byDate.get(dateStr));
      };
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

function fillTimeline(list) {
  if (!list) return;
  list.innerHTML = '';
  digests.forEach(d => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.date = d.date;
    btn.textContent = d.date;
    if (d.date === currentDate) btn.classList.add('active');
    btn.onclick = () => {
      closeMobilePanel();
      showDigest(d);
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function syncChrome() {
  setMonthLabels();
  fillCalendar(document.getElementById('calendar'));
  fillCalendar(document.getElementById('mobileCalendar'));
  fillTimeline(document.getElementById('timeline'));
  fillTimeline(document.getElementById('mobileTimeline'));
  updateNavButtons();
  const label = document.getElementById('mobileDateLabel');
  if (label) label.textContent = currentDate || '—';
}

function currentIndex() {
  return digests.findIndex(d => d.date === currentDate);
}

function updateNavButtons() {
  const i = currentIndex();
  // digests sorted newest-first: "prev" = older = higher index, "next" = newer = lower index
  const hasOlder = i >= 0 && i < digests.length - 1;
  const hasNewer = i > 0;
  const pairs = [
    ['prevDigest', hasOlder],
    ['nextDigest', hasNewer],
    ['mobilePrev', hasOlder],
    ['mobileNext', hasNewer],
  ];
  pairs.forEach(([id, ok]) => {
    const el = document.getElementById(id);
    if (el) el.disabled = !ok;
  });
}

function goOlder() {
  const i = currentIndex();
  if (i >= 0 && i < digests.length - 1) showDigest(digests[i + 1]);
}

function goNewer() {
  const i = currentIndex();
  if (i > 0) showDigest(digests[i - 1]);
}

function closeMobilePanel() {
  const panel = document.getElementById('mobileDatePanel');
  const toggle = document.getElementById('mobileDateToggle');
  if (panel) panel.hidden = true;
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

function slugify(text, used) {
  let base = String(text)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'section';
  let id = base;
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n++}`;
  }
  used.add(id);
  return id;
}

function buildArticleToc(content) {
  const headings = content.querySelectorAll('h2, h3');
  if (!headings.length) return null;

  const used = new Set();
  const wrap = document.createElement('div');
  wrap.className = 'article-toc'; // collapsed by default (no is-open)

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'article-toc-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = `<span>目录</span><span class="chev" aria-hidden="true">›</span>`;

  const body = document.createElement('div');
  body.className = 'article-toc-body';
  body.hidden = true;
  const ol = document.createElement('ol');

  headings.forEach(h => {
    if (!h.id) h.id = slugify(h.textContent, used);
    else used.add(h.id);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.className = h.tagName === 'H3' ? 'toc-h3' : 'toc-h2';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${currentDate}`);
    });
    li.appendChild(a);
    ol.appendChild(li);
  });

  body.appendChild(ol);
  wrap.appendChild(toggle);
  wrap.appendChild(body);

  toggle.addEventListener('click', () => {
    const open = wrap.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    body.hidden = !open;
  });

  return wrap;
}

function renderMath(el) {
  if (typeof renderMathInElement !== 'function') return;
  try {
    renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
      ],
      throwOnError: false,
    });
  } catch (_) { /* ignore */ }
}

function setLeftCollapsed(collapsed) {
  leftCollapsed = collapsed;
  const shell = document.getElementById('shell');
  const expand = document.getElementById('expandLeft');
  if (shell) shell.classList.toggle('left-collapsed', collapsed);
  if (expand) expand.hidden = !collapsed;
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

  // TOC below first H1 (or at top if no H1)
  const toc = buildArticleToc(content);
  if (toc) {
    const h1 = content.querySelector('h1');
    if (h1) h1.insertAdjacentElement('afterend', toc);
    else content.insertAdjacentElement('afterbegin', toc);
  }

  renderMath(content);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shiftMonth(delta) {
  viewMonth += delta;
  if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
  if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
  setMonthLabels();
  fillCalendar(document.getElementById('calendar'));
  fillCalendar(document.getElementById('mobileCalendar'));
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

    document.getElementById('prevMonth').onclick = () => shiftMonth(-1);
    document.getElementById('nextMonth').onclick = () => shiftMonth(1);
    document.getElementById('mobilePrevMonth').onclick = () => shiftMonth(-1);
    document.getElementById('mobileNextMonth').onclick = () => shiftMonth(1);

    document.getElementById('prevDigest').onclick = goOlder;
    document.getElementById('nextDigest').onclick = goNewer;
    document.getElementById('mobilePrev').onclick = goOlder;
    document.getElementById('mobileNext').onclick = goNewer;

    document.getElementById('collapseLeft').onclick = () => setLeftCollapsed(true);
    document.getElementById('expandLeft').onclick = () => setLeftCollapsed(false);

    const mobileToggle = document.getElementById('mobileDateToggle');
    const mobilePanel = document.getElementById('mobileDatePanel');
    mobileToggle.onclick = () => {
      const open = mobilePanel.hidden;
      mobilePanel.hidden = !open;
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
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
