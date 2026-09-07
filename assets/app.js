
const BASE = (() => {
  // Support both /research-daily/ and repo-root preview
  const p = location.pathname;
  if (p.includes('/research-daily')) {
    const i = p.indexOf('/research-daily');
    return p.slice(0, i + '/research-daily'.length).replace(/\/?$/, '/');
  }
  return './';
})();

async function loadIndex() {
  const res = await fetch(BASE + 'digests/index.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('无法加载 digests/index.json');
  return res.json();
}

function setActive(date) {
  document.querySelectorAll('#dateList button').forEach(b => {
    b.classList.toggle('active', b.dataset.date === date);
  });
  const sel = document.getElementById('dateSelect');
  if (sel) sel.value = date;
}

async function showDigest(entry) {
  const content = document.getElementById('content');
  content.innerHTML = '<p class="muted">加载中…</p>';
  setActive(entry.date);
  history.replaceState(null, '', `#${entry.date}`);
  const res = await fetch(BASE + entry.path, { cache: 'no-store' });
  if (!res.ok) {
    content.innerHTML = `<p>找不到 ${entry.path}</p>`;
    return;
  }
  let md = await res.text();
  // Rewrite relative image paths so they resolve under digests/
  const digestDir = entry.path.replace(/[^/]+$/, '');
  marked.setOptions({
    baseUrl: BASE + digestDir,
  });
  // Fix common relative figs paths
  md = md.replace(/\]\((?:\.\/)?((?:2026-\d{2}-\d{2}\/)?figs\/[^)]+)\)/g, (m, rel) => {
    return `](${BASE}digests/${rel.includes('figs/') && !rel.startsWith('20') ? entry.date + '/' + rel.replace(/^\.\//,'') : rel})`;
  });
  // Simpler: if path is 2026-09-06/figs/... it's already under digests/
  md = md.replace(/\]\((20\d{2}-\d{2}-\d{2}\/figs\/[^)]+)\)/g, `](${BASE}digests/$1)`);
  content.innerHTML = marked.parse(md);
  content.querySelectorAll('a').forEach(a => {
    if (a.hostname && a.hostname !== location.hostname) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  });
}

function fillSidebar(data) {
  const sel = document.getElementById('dateSelect');
  const list = document.getElementById('dateList');
  sel.innerHTML = '';
  list.innerHTML = '';
  const digests = [...data.digests].sort((a, b) => b.date.localeCompare(a.date));
  digests.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.date;
    opt.textContent = `${d.date} · ${d.title || '日报'}`;
    sel.appendChild(opt);
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.date = d.date;
    btn.textContent = d.date;
    btn.onclick = () => showDigest(d);
    li.appendChild(btn);
    list.appendChild(li);
  });
  sel.onchange = () => {
    const d = digests.find(x => x.date === sel.value);
    if (d) showDigest(d);
  };
  return digests;
}

(async () => {
  try {
    const data = await loadIndex();
    const digests = fillSidebar(data);
    const hash = location.hash.replace(/^#/, '');
    const initial = digests.find(d => d.date === hash) || digests[0];
    if (initial) await showDigest(initial);
    else document.getElementById('content').innerHTML = '<p>还没有日报。</p>';
  } catch (e) {
    document.getElementById('content').innerHTML = `<p>加载失败：${e.message}</p>`;
  }
})();
