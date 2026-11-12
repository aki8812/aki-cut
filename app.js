const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const uid = () => Math.random().toString(36).slice(2, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ease = (p) => 1 - Math.pow(1 - clamp(p, 0, 1), 3);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const pad = (n) => String(n).padStart(2, '0');
const fmt = (t) => {
  const v = Math.max(0, t || 0);
  return `${pad(Math.floor(v / 60))}:${pad(Math.floor(v % 60))}.${pad(Math.floor((v * 100) % 100))}`;
};
const fmtDur = (t) => {
  const n = Math.round(t || 0);
  return `${Math.floor(n / 60)}:${pad(n % 60)}`;
};
const pct = (v) => `${Math.round(v * 100)}%`;
const sec = (v) => `${Number(v).toFixed(1)}s`;

const IC = {
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M12 12v6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  skipBack: '<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/>',
  skipFwd: '<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  play: '<polygon points="7 4 20 12 7 20 7 4" fill="currentColor"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
  redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  magnet: '<path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"/><path d="m5 8 4 4"/><path d="m12 15 4 4"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  zoomIn: '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
  zoomOut: '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  type: '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>',
  sliders: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
  vol: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
  volOff: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>',
  pointer: '<path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/>',
};
const ic = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || ''}</svg>`;

const SIZES = { '16:9': [1280, 720], '9:16': [720, 1280], '1:1': [720, 720] };
const FONTS = { hei: '"Microsoft JhengHei","Noto Sans TC",sans-serif', ming: '"Noto Serif TC",serif', kai: '"LXGW WenKai TC",serif' };
const BASE_F = { bright: 1, contrast: 1, sat: 1, gray: 0, sepia: 0 };
const LOOKS = [
  ['原始', {}],
  ['黑白', { gray: 1 }],
  ['復古', { sepia: 0.6, contrast: 1.1, sat: 0.85, bright: 1.02 }],
  ['鮮豔', { sat: 1.5, contrast: 1.12 }],
  ['柔和', { contrast: 0.88, sat: 0.8, bright: 1.06 }],
  ['高對比', { contrast: 1.4, sat: 1.1, bright: 0.98 }],
];
const COLORS = ['#ffffff', '#111111', '#ffd60a', '#fb923c', '#f472b6', '#22d3ee', '#34d399', '#ef4444'];
const PRESETS = [
  { text: '大標題', size: 110, bold: true, color: '#ffffff', stroke: true, bg: false, font: 'hei', y: 0.5 },
  { text: '在這裡輸入字幕', size: 46, bold: true, color: '#ffffff', stroke: true, bg: false, font: 'hei', y: 0.85 },
  { text: '底色字幕', size: 44, bold: true, color: '#ffffff', stroke: false, bg: true, font: 'hei', y: 0.85 },
  { text: '重點！', size: 96, bold: true, color: '#ffd60a', stroke: true, bg: false, font: 'hei', y: 0.5 },
  { text: '序章', size: 100, bold: false, color: '#ffffff', stroke: false, bg: false, font: 'ming', y: 0.5 },
  { text: '今天也辛苦了', size: 72, bold: false, color: '#fde68a', stroke: false, bg: false, font: 'kai', y: 0.5 },
  { text: 'NEON', size: 104, bold: true, color: '#22d3ee', stroke: true, bg: false, font: 'hei', y: 0.5 },
  { text: '新影片', size: 64, bold: true, color: '#f472b6', stroke: false, bg: true, font: 'hei', y: 0.15 },
];
const TYPE_LABEL = { video: '影片', image: '圖片', audio: '音訊', text: '文字' };
const TYPE_IC = { video: 'film', image: 'image', audio: 'music', text: 'type' };
const RNG = {
  size: { min: 12, max: 220, step: 1, f: (v) => `${Math.round(v)}` },
  scale: { min: 0.1, max: 3, step: 0.01, f: pct },
  opacity: { min: 0, max: 1, step: 0.01, f: pct },
  'filter.bright': { min: 0, max: 2, step: 0.01, f: pct },
  'filter.contrast': { min: 0, max: 2, step: 0.01, f: pct },
  'filter.sat': { min: 0, max: 3, step: 0.01, f: pct },
  'filter.gray': { min: 0, max: 1, step: 0.01, f: pct },
  'filter.sepia': { min: 0, max: 1, step: 0.01, f: pct },
  tin: { min: 0.1, max: 2, step: 0.1, f: sec },
  tout: { min: 0.1, max: 2, step: 0.1, f: sec },
  volume: { min: 0, max: 2, step: 0.01, f: pct },
  afin: { min: 0, max: 5, step: 0.1, f: sec },
  afout: { min: 0, max: 5, step: 0.1, f: sec },
};
const STEPS = [0.1, 0.2, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];

const view = $('#view');
const vctx = view.getContext('2d');
const tlView = $('#tlView');
const tlIn = $('#tlIn');
const rows = $('#rows');
const ruler = $('#ruler');
const ph = $('#ph');
const sideView = $('#sideView');
const inspBody = $('#inspBody');
const pool = $('#pool');
const fileIn = $('#file');
const zoom = $('#zoom');
const tcEl = $('#tc');

const st = { ratio: '16:9', tracks: [], clips: [], sel: null, t: 0, playing: false, pps: 60, snap: true, tab: 'media' };
const lib = [];
const mm = new Map();
const els = new Map();
const undo = [];
const redo = [];
let W = 1280;
let H = 720;
let HW = 104;
let ac = null;
let boxes = [];
let guide = null;
let raf = 0;
let t0 = 0;
let tStart = 0;
let busy = false;
let warned = false;
let lead = null;
let PW = 1280;
let PH = 720;

const hasFilter = (() => {
  try {
    if (!('filter' in CanvasRenderingContext2D.prototype)) return false;
    const c = document.createElement('canvas').getContext('2d');
    c.filter = 'blur(1px)';
    return c.filter === 'blur(1px)';
  } catch {
    return false;
  }
})();

const syncRangeFill = (el) => {
  try {
    const min = Number(el.min) || 0;
    const max = Number(el.max) || 100;
    const span = max - min || 1;
    const t = (Number(el.value) - min) / span;
    const width = el.getBoundingClientRect().width || el.clientWidth || 1;
    const thumb = 16;
    const fillPx = thumb * 0.5 + t * Math.max(0, width - thumb);
    const pct = Math.max(0, Math.min(100, (fillPx / width) * 100));
    el.style.setProperty("--pct", `${pct}%`);
  } catch (err) {
    console.error("同步拉桿填色失敗", err);
  }
};

const attachUiScrollbar = (host, scroller) => {
  if (!host || !scroller || scroller.dataset.uiScrollAttached === "1") return;
  try {
    scroller.dataset.uiScrollAttached = "1";
    scroller.classList.add("ui-scroll-viewport");
    host.classList.add("ui-scroll-host");
    const build = (axis) => {
      const bar = document.createElement("div");
      bar.className = `ui-scrollbar ui-scrollbar-${axis}`;
      const thumb = document.createElement("div");
      thumb.className = "ui-scrollbar-thumb";
      bar.appendChild(thumb);
      host.appendChild(bar);
      return { bar, thumb };
    };
    const y = build("y");
    const x = build("x");
    let scrollTimer = null;
    const markScrolling = () => {
      host.classList.add("is-scrolling");
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => host.classList.remove("is-scrolling"), 700);
    };
    const sync = () => {
      const vh = scroller.clientHeight;
      const sh = scroller.scrollHeight;
      const vw = scroller.clientWidth;
      const sw = scroller.scrollWidth;
      const needY = sh > vh + 1;
      const needX = sw > vw + 1;
      host.classList.toggle("has-y-scroll", needY);
      host.classList.toggle("has-x-scroll", needX);
      y.bar.style.display = needY ? "block" : "none";
      x.bar.style.display = needX ? "block" : "none";
      if (!needY && !needX) host.classList.remove("is-scrolling", "is-scrollbar-hover");
      if (needY) {
        const track = y.bar.clientHeight;
        const size = Math.max(28, (vh / sh) * track);
        const max = Math.max(0, sh - vh);
        const pos = max ? (scroller.scrollTop / max) * (track - size) : 0;
        y.thumb.style.height = `${size}px`;
        y.thumb.style.transform = `translateY(${pos}px)`;
      }
      if (needX) {
        const track = x.bar.clientWidth;
        const size = Math.max(28, (vw / sw) * track);
        const max = Math.max(0, sw - vw);
        const pos = max ? (scroller.scrollLeft / max) * (track - size) : 0;
        x.thumb.style.width = `${size}px`;
        x.thumb.style.transform = `translateX(${pos}px)`;
      }
    };
    scroller._uiScrollSync = sync;
    const bindDrag = ({ bar, thumb }, axis) => {
      thumb.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        thumb.classList.add("is-dragging");
        host.classList.add("is-scrollbar-hover");
        const startPos = axis === "y" ? e.clientY : e.clientX;
        const startScroll = axis === "y" ? scroller.scrollTop : scroller.scrollLeft;
        const track = axis === "y" ? bar.clientHeight : bar.clientWidth;
        const thumbSize = axis === "y" ? thumb.offsetHeight : thumb.offsetWidth;
        const maxScroll = axis === "y"
          ? Math.max(0, scroller.scrollHeight - scroller.clientHeight)
          : Math.max(0, scroller.scrollWidth - scroller.clientWidth);
        const maxThumb = Math.max(1, track - thumbSize);
        const onMove = (ev) => {
          const delta = (axis === "y" ? ev.clientY : ev.clientX) - startPos;
          const next = startScroll + (delta / maxThumb) * maxScroll;
          if (axis === "y") scroller.scrollTop = next;
          else scroller.scrollLeft = next;
          markScrolling();
        };
        const onUp = () => {
          thumb.classList.remove("is-dragging");
          host.classList.remove("is-scrollbar-hover");
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
        };
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      });
    };
    bindDrag(y, "y");
    bindDrag(x, "x");
    [y.bar, x.bar].forEach((bar) => {
      bar.addEventListener("pointerenter", () => host.classList.add("is-scrollbar-hover"));
      bar.addEventListener("pointerleave", () => {
        if (!y.thumb.classList.contains("is-dragging") && !x.thumb.classList.contains("is-dragging")) {
          host.classList.remove("is-scrollbar-hover");
        }
      });
    });
    scroller.addEventListener("scroll", () => { sync(); markScrolling(); }, { passive: true });
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => sync());
      ro.observe(scroller);
      ro.observe(host);
      const watch = (node) => { if (node instanceof Element) ro.observe(node); };
      Array.from(scroller.children).forEach(watch);
      if (typeof MutationObserver !== "undefined") {
        const mo = new MutationObserver((records) => {
          records.forEach((r) => r.addedNodes.forEach(watch));
          requestAnimationFrame(sync);
        });
        mo.observe(scroller, { childList: true, subtree: true, characterData: true });
      }
    }
    window.addEventListener("resize", sync);
    if (document.fonts?.ready) document.fonts.ready.then(sync).catch(() => {});
    scroller.querySelectorAll("img").forEach((img) => img.addEventListener("load", sync, { once: true }));
    requestAnimationFrame(sync);
    sync();
  } catch (err) {
    console.error("掛載自訂捲軸失敗", err);
  }
};

const initGlobalTip = () => {
  try {
    const tip = document.createElement("div");
    tip.id = "global-tip";
    tip.setAttribute("role", "tooltip");
    document.body.appendChild(tip);
    const GAP = 9;
    const MARGIN = 8;
    let current = null;
    const place = (el) => {
      const text = el.dataset.tip;
      if (!text) return;
      tip.textContent = text;
      tip.classList.add("is-visible");
      const r = el.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let pos = el.dataset.tipPos || "bottom";
      if (pos === "bottom" && r.bottom + GAP + th > vh - MARGIN) pos = "top";
      else if (pos === "top" && r.top - GAP - th < MARGIN) pos = "bottom";
      else if (pos === "right" && r.right + GAP + tw > vw - MARGIN) pos = "left";
      else if (pos === "left" && r.left - GAP - tw < MARGIN) pos = "right";
      let top = 0;
      let left = 0;
      if (pos === "bottom") { top = r.bottom + GAP; left = r.left + r.width / 2 - tw / 2; }
      if (pos === "top") { top = r.top - GAP - th; left = r.left + r.width / 2 - tw / 2; }
      if (pos === "left") { top = r.top + r.height / 2 - th / 2; left = r.left - GAP - tw; }
      if (pos === "right") { top = r.top + r.height / 2 - th / 2; left = r.right + GAP; }
      left = Math.max(MARGIN, Math.min(vw - tw - MARGIN, left));
      top = Math.max(MARGIN, Math.min(vh - th - MARGIN, top));
      tip.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
    };
    const show = (el) => { current = el; place(el); };
    const hide = () => { current = null; tip.classList.remove("is-visible"); };
    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest?.("[data-tip]");
      if (el && el !== current) show(el);
    });
    document.addEventListener("pointerout", (e) => {
      const el = e.target.closest?.("[data-tip]");
      if (el && !el.contains(e.relatedTarget)) hide();
    });
    document.addEventListener("focusin", (e) => {
      const el = e.target.closest?.("[data-tip]");
      if (el && el.matches(":focus-visible")) show(el);
    });
    document.addEventListener("focusout", hide);
    document.addEventListener("pointerdown", hide);
    document.addEventListener("scroll", () => { if (current) place(current); }, { passive: true, capture: true });
    window.addEventListener("resize", () => { if (current) place(current); });
  } catch (err) {
    console.error("初始化全域 tooltip 失敗", err);
  }
};

let toastT = 0;
const toast = (msg) => {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 2400);
};

const modal = ({ title, text = '', html = '', btns = [], wide = false, lock = false }) => {
  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `<div class="modal${wide ? ' wide' : ''}"><div class="modal-title">${title}</div>${text ? `<p class="modal-text">${text}</p>` : ''}<div class="modal-body">${html}</div><div class="modal-actions">${btns.map((b, i) => `<button class="modal-btn ${b.cls || 'ghost'}" data-i="${i}">${b.label}</button>`).join('')}</div></div>`;
  document.body.appendChild(bd);
  let done = null;
  const p = new Promise((r) => { done = r; });
  const onKey = (e) => { if (e.key === 'Escape' && !lock) close(null); };
  const close = (v) => {
    if (bd.classList.contains('out')) return;
    bd.classList.add('out');
    document.removeEventListener('keydown', onKey);
    setTimeout(() => bd.remove(), 150);
    done(v);
  };
  bd.addEventListener('click', (e) => {
    const b = e.target.closest('.modal-actions [data-i]');
    if (b) {
      const it = btns[Number(b.dataset.i)];
      if (it?.keep) it.on?.();
      else close(it?.v ?? null);
      return;
    }
    if (e.target === bd && !lock) close(null);
  });
  document.addEventListener('keydown', onKey);
  return { bd, box: $('.modal', bd), close, p };
};
const ask = (o) => modal(o).p;

let dbp = null;
const db = () => dbp || (dbp = new Promise((res, rej) => {
  try {
    const r = indexedDB.open('aki-cut', 1);
    r.onupgradeneeded = () => {
      const d = r.result;
      if (!d.objectStoreNames.contains('media')) d.createObjectStore('media', { keyPath: 'id' });
      if (!d.objectStoreNames.contains('proj')) d.createObjectStore('proj');
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  } catch (err) {
    rej(err);
  }
}));
const tx = async (store, mode, fn) => {
  const d = await db();
  return new Promise((res, rej) => {
    const t = d.transaction(store, mode);
    const q = fn(t.objectStore(store));
    t.oncomplete = () => res(q?.result);
    t.onerror = () => rej(t.error);
    t.onabort = () => rej(t.error);
  });
};
const put = (store, v, key) => tx(store, 'readwrite', (s) => (key ? s.put(v, key) : s.put(v)));
const drop = (store, key) => tx(store, 'readwrite', (s) => s.delete(key));
const getAll = (store) => tx(store, 'readonly', (s) => s.getAll());
const getOne = (store, key) => tx(store, 'readonly', (s) => s.get(key));

let saveT = 0;
const saveNow = () => put('proj', { ratio: st.ratio, tracks: st.tracks, clips: st.clips }, 'cur').catch((err) => console.error('儲存專案失敗', err));
const save = () => {
  clearTimeout(saveT);
  saveT = setTimeout(saveNow, 400);
};

const freshTracks = () => [
  { id: uid(), kind: 'v', name: 'T1', muted: false, hidden: false },
  { id: uid(), kind: 'v', name: 'V1', muted: false, hidden: false },
  { id: uid(), kind: 'a', name: 'A1', muted: false, hidden: false },
];
const mkClip = (o = {}) => ({
  id: uid(), track: '', type: 'video', media: null, start: 0, len: 5, in: 0, speed: 1, volume: 1, afin: 0, afout: 0,
  tin: 0.5, tinKind: 'none', tout: 0.5, toutKind: 'none', x: 0.5, y: 0.5, scale: 1, fit: 'contain', opacity: 1,
  text: '', font: 'hei', size: 64, color: '#ffffff', bg: false, stroke: true, bold: true,
  ...o,
  filter: { ...BASE_F, ...(o.filter || {}) },
});
const sel = () => st.clips.find((c) => c.id === st.sel) || null;
const trackOf = (id) => st.tracks.find((k) => k.id === id);
const kindOf = (type) => (type === 'audio' ? 'a' : 'v');
const isAV = (c) => c.type === 'video' || c.type === 'audio';
const total = () => st.clips.reduce((m, c) => Math.max(m, c.start + c.len), 0);
const tIn = (c) => (c.tinKind === 'none' ? 0 : Math.min(c.tin, c.len / 2));
const tOut = (c) => (c.toutKind === 'none' ? 0 : Math.min(c.tout, c.len / 2));
const clipName = (c) => (c.type === 'text' ? (c.text.split('\n')[0] || '文字') : mm.get(c.media)?.name || '');
const getK = (c, k) => k.split('.').reduce((o, p) => o?.[p], c);
const setK = (c, k, v) => {
  const ps = k.split('.');
  const last = ps.pop();
  const o = ps.reduce((a, p) => a[p], c);
  if (o) o[last] = v;
};
const readHW = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hw')) || 104;

const shot = () => JSON.stringify({ tracks: st.tracks, clips: st.clips });
const mark = () => {
  undo.push(shot());
  if (undo.length > 100) undo.shift();
  redo.length = 0;
};
const restore = (s) => {
  try {
    const o = JSON.parse(s);
    st.tracks = o.tracks;
    st.clips = o.clips.filter((c) => c.type === 'text' || mm.has(c.media));
    if (!sel()) st.sel = null;
  } catch (err) {
    console.error('還原步驟失敗', err);
  }
};
const doUndo = () => {
  if (!undo.length) return;
  redo.push(shot());
  restore(undo.pop());
  commit();
};
const doRedo = () => {
  if (!redo.length) return;
  undo.push(shot());
  restore(redo.pop());
  commit();
};
const commit = (o = {}) => {
  prune();
  if (st.t > total()) st.t = total();
  renderTL();
  if (o.insp !== false) renderInsp();
  syncMedia();
  paint();
  updTc();
  updateBtns();
  save();
};
const edit = (fn, o) => {
  mark();
  fn();
  commit(o);
};

const mul = (a, b) => [
  a[0] * b[0] + a[1] * b[3] + a[2] * b[6], a[0] * b[1] + a[1] * b[4] + a[2] * b[7], a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
  a[3] * b[0] + a[4] * b[3] + a[5] * b[6], a[3] * b[1] + a[4] * b[4] + a[5] * b[7], a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
  a[6] * b[0] + a[7] * b[3] + a[8] * b[6], a[6] * b[1] + a[7] * b[4] + a[8] * b[7], a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
];
const fMatrix = (f) => {
  const s = f.sat;
  const sat = [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s];
  const g = 1 - f.gray;
  const gray = [0.2126 + 0.7874 * g, 0.7152 - 0.7152 * g, 0.0722 - 0.0722 * g, 0.2126 - 0.2126 * g, 0.7152 + 0.2848 * g, 0.0722 - 0.0722 * g, 0.2126 - 0.2126 * g, 0.7152 - 0.7152 * g, 0.0722 + 0.9278 * g];
  const p = 1 - f.sepia;
  const sep = [0.393 + 0.607 * p, 0.769 - 0.769 * p, 0.189 - 0.189 * p, 0.349 - 0.349 * p, 0.686 + 0.314 * p, 0.168 - 0.168 * p, 0.272 - 0.272 * p, 0.534 - 0.534 * p, 0.131 + 0.869 * p];
  const m = mul(sep, mul(gray, sat));
  const k = f.bright * f.contrast;
  const o = 127.5 * (1 - f.contrast);
  return { m: m.map((v) => v * k), o: [(m[0] + m[1] + m[2]) * o, (m[3] + m[4] + m[5]) * o, (m[6] + m[7] + m[8]) * o] };
};
const isPlain = (f) => !f || (f.bright === 1 && f.contrast === 1 && f.sat === 1 && !f.gray && !f.sepia);
const cssF = (f) => `brightness(${f.bright}) contrast(${f.contrast}) saturate(${f.sat}) grayscale(${f.gray}) sepia(${f.sepia})`;
const fcv = document.createElement('canvas');
const fcx = fcv.getContext('2d', { willReadFrequently: true });
const drawFiltered = (ctx, src, dx, dy, dw, dh, f, live) => {
  if (hasFilter) {
    ctx.filter = cssF(f);
    ctx.drawImage(src, dx, dy, dw, dh);
    ctx.filter = 'none';
    return;
  }
  try {
    const cap = live ? 640 : 2200;
    const k = Math.min(1, cap / Math.max(dw, dh));
    const w = Math.max(1, Math.round(dw * k));
    const h = Math.max(1, Math.round(dh * k));
    fcv.width = w;
    fcv.height = h;
    fcx.drawImage(src, 0, 0, w, h);
    const img = fcx.getImageData(0, 0, w, h);
    const d = img.data;
    const { m, o } = fMatrix(f);
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      d[i] = m[0] * r + m[1] * g + m[2] * b + o[0];
      d[i + 1] = m[3] * r + m[4] * g + m[5] * b + o[1];
      d[i + 2] = m[6] * r + m[7] * g + m[8] * b + o[2];
    }
    fcx.putImageData(img, 0, 0);
    ctx.drawImage(fcv, dx, dy, dw, dh);
  } catch (err) {
    ctx.drawImage(src, dx, dy, dw, dh);
  }
};

const luma = (hex) => {
  const n = parseInt(String(hex).replace('#', ''), 16);
  if (Number.isNaN(n)) return 1;
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
};
const rrect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const drawText = (ctx, c, cx, cy, s, h, live) => {
  const px = (c.size * h / 720) * s;
  if (px < 1 || !c.text) return;
  ctx.font = `${c.bold ? 700 : 400} ${px}px ${FONTS[c.font] || FONTS.hei}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lines = c.text.split('\n');
  const lh = px * 1.28;
  const wd = Math.max(...lines.map((l) => ctx.measureText(l).width), px * 0.5);
  const th = lh * lines.length;
  const padX = px * 0.34;
  const padY = px * 0.2;
  const bx = cx - wd / 2 - padX;
  const by = cy - th / 2 - padY;
  const bw = wd + padX * 2;
  const bh = th + padY * 2;
  if (c.bg) {
    ctx.fillStyle = 'rgba(0,0,0,0.62)';
    rrect(ctx, bx, by, bw, bh, px * 0.22);
    ctx.fill();
  }
  lines.forEach((l, i) => {
    const y = cy - th / 2 + lh * (i + 0.5);
    if (c.stroke) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = Math.max(2, px * 0.16);
      ctx.strokeStyle = luma(c.color) < 0.35 ? '#ffffff' : '#000000';
      ctx.strokeText(l, cx, y);
    }
    ctx.fillStyle = c.color;
    ctx.fillText(l, cx, y);
  });
  if (live) boxes.push({ id: c.id, x: bx, y: by, w: bw, h: bh });
};

const srcOf = (c) => {
  const m = mm.get(c.media);
  if (!m) return null;
  if (c.type === 'image') return m.img?.complete && m.img.naturalWidth ? [m.img, m.img.naturalWidth, m.img.naturalHeight] : null;
  const e = els.get(c.id);
  if (!e || e.el.readyState < 2 || !e.el.videoWidth) return null;
  return [e.el, e.el.videoWidth, e.el.videoHeight];
};

const drawClip = (ctx, c, w, h, t, live) => {
  const local = t - c.start;
  const left = c.len - local;
  const ti = tIn(c);
  const to = tOut(c);
  let a = c.opacity;
  let s = c.scale;
  let ox = 0;
  if (ti > 0 && local < ti) {
    const p = local / ti;
    const e = ease(p);
    if (c.tinKind === 'fade') a *= p;
    if (c.tinKind === 'slide') ox -= (1 - e) * w;
    if (c.tinKind === 'zoom') { s *= 0.6 + 0.4 * e; a *= p; }
  }
  if (to > 0 && left < to) {
    const p = clamp(left / to, 0, 1);
    const e = ease(p);
    if (c.toutKind === 'fade') a *= p;
    if (c.toutKind === 'slide') ox += (1 - e) * w;
    if (c.toutKind === 'shrink') { s *= 0.6 + 0.4 * e; a *= p; }
  }
  if (a <= 0.002) return;
  ctx.save();
  ctx.globalAlpha = clamp(a, 0, 1);
  const cx = c.x * w + ox;
  const cy = c.y * h;
  if (c.type === 'text') {
    drawText(ctx, c, cx, cy, s, h, live);
  } else {
    const src = srcOf(c);
    if (src) {
      const [el, sw, sh] = src;
      const k = (c.fit === 'cover' ? Math.max(w / sw, h / sh) : Math.min(w / sw, h / sh)) * s;
      const dw = sw * k;
      const dh = sh * k;
      if (isPlain(c.filter)) ctx.drawImage(el, cx - dw / 2, cy - dh / 2, dw, dh);
      else drawFiltered(ctx, el, cx - dw / 2, cy - dh / 2, dw, dh, c.filter, live);
      if (live) boxes.push({ id: c.id, x: cx - dw / 2, y: cy - dh / 2, w: dw, h: dh });
    }
  }
  ctx.restore();
};

const render = (ctx, w, h, t, live) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  if (live) boxes = [];
  const vt = st.tracks.filter((k) => k.kind === 'v');
  for (let i = vt.length - 1; i >= 0; i--) {
    if (vt[i].hidden) continue;
    st.clips
      .filter((c) => c.track === vt[i].id && c.type !== 'audio' && t >= c.start && t < c.start + c.len)
      .sort((a, b) => a.start - b.start)
      .forEach((c) => drawClip(ctx, c, w, h, t, live));
  }
};

const drawPreview = () => {
  try {
    render(vctx, PW, PH, st.t, true);
    if (st.playing) return;
    const k = PW / (view.clientWidth || PW);
    const b = boxes.find((x) => x.id === st.sel);
    if (b) {
      vctx.save();
      vctx.strokeStyle = '#0a84ff';
      vctx.lineWidth = 2 * k;
      vctx.setLineDash([8 * k, 6 * k]);
      vctx.strokeRect(b.x, b.y, b.w, b.h);
      vctx.restore();
    }
    if (guide) {
      vctx.save();
      vctx.strokeStyle = 'rgba(10, 132, 255, 0.9)';
      vctx.lineWidth = 1.5 * k;
      vctx.beginPath();
      if (guide.x) { vctx.moveTo(PW / 2, 0); vctx.lineTo(PW / 2, PH); }
      if (guide.y) { vctx.moveTo(0, PH / 2); vctx.lineTo(PW, PH / 2); }
      vctx.stroke();
      vctx.restore();
    }
  } catch (err) {
    console.error('預覽繪製失敗', err);
  }
};
let paintQ = false;
const paint = () => {
  if (paintQ) return;
  paintQ = true;
  requestAnimationFrame(() => {
    paintQ = false;
    if (!st.playing) drawPreview();
  });
};

const fitView = () => {
  const r = $('#screen').getBoundingClientRect();
  const gap = r.width < 500 ? 10 : 20;
  const s = Math.max(0.01, Math.min((r.width - gap * 2) / W, (r.height - gap * 2) / H));
  const cw = Math.floor(W * s);
  view.style.width = `${cw}px`;
  view.style.height = `${Math.floor(H * s)}px`;
  const pw = clamp(Math.round(cw * Math.min(2, window.devicePixelRatio || 1)), 320, W);
  const ph = Math.round((pw * H) / W);
  if (pw !== PW || ph !== PH || view.width !== pw) {
    PW = pw;
    PH = ph;
    view.width = PW;
    view.height = PH;
  }
};
const setRatio = (r) => {
  st.ratio = SIZES[r] ? r : '16:9';
  [W, H] = SIZES[st.ratio];
  $$('#ratio button').forEach((b) => b.classList.toggle('on', b.dataset.r === st.ratio));
  fitView();
  paint();
};

const fontsFor = (c) => {
  if (!c || c.type !== 'text' || !document.fonts?.load) return Promise.resolve();
  return document.fonts.load(`${c.bold ? 700 : 400} 48px ${FONTS[c.font] || FONTS.hei}`, c.text || '字').then(() => paint()).catch(() => {});
};

const route = (e) => {
  if (!ac || e.gain) return;
  try {
    e.src = ac.createMediaElementSource(e.el);
    e.gain = ac.createGain();
    e.src.connect(e.gain);
    e.gain.connect(ac.destination);
  } catch (err) {
    console.error('音訊路由失敗', err);
  }
  e.el.muted = false;
};
const unlock = () => {
  try {
    if (!ac) {
      const A = window.AudioContext || window.webkitAudioContext;
      if (A) {
        ac = new A();
        els.forEach(route);
      }
    }
    if (ac?.state === 'suspended') ac.resume().catch(() => {});
    els.forEach((e) => { if (ac && e.el.muted) e.el.muted = false; });
  } catch (err) {
    console.error('啟用音訊失敗', err);
  }
};
const dropEl = (id) => {
  const e = els.get(id);
  if (!e) return;
  try {
    e.el.pause();
    e.src?.disconnect();
    e.gain?.disconnect();
    e.el.removeAttribute('src');
    e.el.load();
    e.el.remove();
  } catch (err) {
    console.error('釋放媒體失敗', err);
  }
  els.delete(id);
};
const getEl = (c) => {
  const old = els.get(c.id);
  if (old && old.media === c.media) return old;
  if (old) dropEl(c.id);
  const m = mm.get(c.media);
  if (!m) return null;
  const el = document.createElement(c.type === 'audio' ? 'audio' : 'video');
  el.preload = 'auto';
  el.playsInline = true;
  el.setAttribute('playsinline', '');
  el.muted = !ac;
  el.addEventListener('loadeddata', () => { if (!st.playing && !busy) { syncMedia(); paint(); } });
  el.addEventListener('seeked', () => { if (!st.playing && !busy) paint(); });
  el.src = m.url;
  pool.appendChild(el);
  const e = { el, media: c.media, gain: null, src: null };
  els.set(c.id, e);
  route(e);
  return e;
};
const prune = () => {
  els.forEach((e, id) => {
    const c = st.clips.find((x) => x.id === id);
    if (!c || c.media !== e.media) dropEl(id);
  });
};
const fadeGain = (c, t) => {
  const local = t - c.start;
  const left = c.len - local;
  let g = 1;
  if (c.afin > 0 && local < c.afin) g *= local / c.afin;
  if (c.afout > 0 && left < c.afout) g *= left / c.afout;
  return clamp(g, 0, 1);
};
const playEl = (e) => {
  const p = e.el.play();
  if (!p) return;
  p.catch((err) => {
    if (err?.name !== 'NotAllowedError' || e.el.muted) return;
    e.el.muted = true;
    e.el.play().catch(() => {});
    if (!warned) {
      warned = true;
      toast('聲音被瀏覽器暫停，請重新播放');
    }
  });
};
const syncMedia = () => {
  const t = st.t;
  const live = new Set();
  let cand = null;
  for (const c of st.clips) {
    if (!isAV(c)) continue;
    const on = t >= c.start && t < c.start + c.len;
    const soon = !on && c.start > t && c.start - t < 1.5;
    if (!on && !soon) continue;
    const e = getEl(c);
    if (!e) continue;
    live.add(c.id);
    const el = e.el;
    const want = c.in + (on ? (t - c.start) * c.speed : 0);
    const ready = el.readyState >= 1;
    if (on) {
      const v = (trackOf(c.track)?.muted ? 0 : c.volume) * fadeGain(c, t);
      if (e.gain) e.gain.gain.value = v;
      else el.volume = clamp(v, 0, 1);
      if (Math.abs(el.playbackRate - c.speed) > 0.001) el.playbackRate = c.speed;
      if (st.playing) {
        if (!el.paused && !el.seeking && el.readyState >= 2 && !(c.type === 'video' && trackOf(c.track)?.hidden)) {
          if (c.type === 'video' && cand?.c.type !== 'video') cand = { c, e };
          else if (!cand) cand = { c, e };
        }
        if (el.paused) {
          if (ready && Math.abs(el.currentTime - want) > 0.05) el.currentTime = want;
          playEl(e);
        } else if (ready && e !== lead?.e && Math.abs(el.currentTime - want) > 0.3) {
          el.currentTime = want;
        }
      } else {
        if (!el.paused) el.pause();
        if (ready && Math.abs(el.currentTime - want) > 0.012) el.currentTime = want;
      }
    } else {
      if (e.gain) e.gain.gain.value = 0;
      if (!el.paused) el.pause();
      if (ready && !el.seeking && Math.abs(el.currentTime - want) > 0.1) el.currentTime = want;
    }
  }
  lead = st.playing ? cand : null;
  els.forEach((e, id) => {
    if (live.has(id)) return;
    if (!e.el.paused) e.el.pause();
  });
  if (els.size > 10) els.forEach((e, id) => { if (!live.has(id)) dropEl(id); });
};
const prime = () => {
  const t = st.t;
  st.clips.forEach((c) => {
    if (isAV(c) && c.start + c.len > t && c.start < t + 60) getEl(c);
  });
  els.forEach((e) => {
    if (e.primed) return;
    e.primed = true;
    if (e.gain) e.gain.gain.value = 0;
    const p = e.el.play();
    if (p) p.catch(() => {});
  });
};

const setPlayIcon = () => {
  const i = $('#playBtn i');
  if (i) i.innerHTML = ic(st.playing ? 'pause' : 'play');
};
const updTc = () => {
  tcEl.innerHTML = `${fmt(st.t)} <em>/ ${fmt(total())}</em>`;
};
const movePh = () => {
  ph.style.transform = `translateX(${HW + st.t * st.pps}px)`;
  drawRuler();
};
const follow = () => {
  const x = st.t * st.pps;
  const vis = tlView.clientWidth - HW;
  const sl = tlView.scrollLeft;
  if (x > sl + vis - 24) tlView.scrollLeft = x - 24;
  else if (x < sl) tlView.scrollLeft = Math.max(0, x - 24);
};
const leadT = () => {
  if (!lead) return null;
  const { c, e } = lead;
  const el = e.el;
  if (el.paused || el.seeking || el.readyState < 2 || els.get(c.id) !== e) return null;
  const t = c.start + (el.currentTime - c.in) / c.speed;
  return t >= c.start && t < c.start + c.len ? t : null;
};
const tick = (now) => {
  if (!st.playing) return;
  const T = total();
  const wall = tStart + (now - t0) / 1000;
  const lt = leadT();
  st.t = lt != null && Math.abs(lt - wall) < 0.6 ? Math.max(lt, st.t) : wall;
  tStart = st.t;
  t0 = now;
  if (st.t >= T) {
    st.t = T;
    pause();
    movePh();
    updTc();
    return;
  }
  syncMedia();
  drawPreview();
  movePh();
  updTc();
  follow();
  raf = requestAnimationFrame(tick);
};
const play = () => {
  if (st.playing || busy) return;
  const T = total();
  if (T <= 0) {
    toast('時間軸是空的');
    return;
  }
  unlock();
  if (st.t >= T - 0.02) st.t = 0;
  st.playing = true;
  prime();
  t0 = performance.now();
  tStart = st.t;
  setPlayIcon();
  syncMedia();
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(tick);
};
const pause = () => {
  st.playing = false;
  cancelAnimationFrame(raf);
  els.forEach((e) => e.el.pause());
  setPlayIcon();
  syncMedia();
  paint();
  updateBtns();
};
const toggle = () => (st.playing ? pause() : play());
const setT = (t) => {
  st.t = clamp(t, 0, Math.max(0, total()));
  if (st.playing) {
    tStart = st.t;
    t0 = performance.now();
  }
  syncMedia();
  paint();
  movePh();
  updTc();
  updateBtns();
};

const updateBtns = () => {
  $('#undoBtn').disabled = !undo.length;
  $('#redoBtn').disabled = !redo.length;
  const s = !!sel();
  $('#dupBtn').disabled = !s;
  $('#delBtn').disabled = !s;
  $('#splitBtn').disabled = !st.clips.some((c) => st.t > c.start + 0.05 && st.t < c.start + c.len - 0.05);
  $('[data-sheet="insp"]').classList.toggle('dot', s);
};

const drawRuler = () => {
  const cw = Math.max(0, tlView.clientWidth - HW);
  if (!cw) return;
  const dpr = window.devicePixelRatio || 1;
  if (ruler.width !== Math.round(cw * dpr) || ruler.height !== Math.round(30 * dpr)) {
    ruler.width = Math.round(cw * dpr);
    ruler.height = Math.round(30 * dpr);
    ruler.style.width = `${cw}px`;
  }
  const g = ruler.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, cw, 30);
  const p = st.pps;
  const sl = tlView.scrollLeft;
  const step = STEPS.find((s) => s * p >= 64) || 600;
  const sub = (step * p) / 5 >= 7 ? step / 5 : step / 2;
  const end = (sl + cw) / p + sub;
  g.font = '500 10px ui-monospace, "SF Mono", "Roboto Mono", monospace';
  g.textBaseline = 'top';
  g.lineWidth = 1;
  for (let i = Math.floor(sl / p / sub); i * sub <= end; i++) {
    const t = i * sub;
    const x = Math.round(t * p - sl) + 0.5;
    const major = Math.abs(t / step - Math.round(t / step)) < 1e-6;
    g.strokeStyle = major ? '#636366' : '#3a3a3c';
    g.beginPath();
    g.moveTo(x, major ? 16 : 23);
    g.lineTo(x, 30);
    g.stroke();
    if (major) {
      g.fillStyle = '#8e8e93';
      const n = Math.round(t);
      g.fillText(step < 1 ? `${t.toFixed(1)}s` : `${Math.floor(n / 60)}:${pad(n % 60)}`, x + 4, 5);
    }
  }
  const px = st.t * p - sl;
  if (px >= -8 && px <= cw + 8) {
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.moveTo(px - 6, 0);
    g.lineTo(px + 6, 0);
    g.lineTo(px, 9);
    g.closePath();
    g.fill();
  }
};

const clipHTML = (c) => {
  const m = mm.get(c.media);
  const p = st.pps;
  const ti = tIn(c);
  const to = tOut(c);
  let inner = '';
  if ((c.type === 'video' || c.type === 'image') && m?.thumb) inner += `<div class="face" style="background-image:url(${m.thumb})"></div>`;
  if (isAV(c) && m?.wave) inner += `<div class="wv" style="background-image:url(${m.wave});background-size:${(m.dur / c.speed) * p}px 100%;background-position:${-(c.in / c.speed) * p}px 0"></div>`;
  if (ti) inner += `<div class="tr l" style="width:${ti * p}px"></div>`;
  if (to) inner += `<div class="tr r" style="width:${to * p}px"></div>`;
  inner += `<div class="nm">${c.speed !== 1 ? `<u>${c.speed}x</u>` : ''}${esc(clipName(c))}</div><div class="h l"></div><div class="h r"></div>`;
  return `<div class="clip k-${c.type}${c.id === st.sel ? ' sel' : ''}" data-id="${c.id}" style="left:${c.start * p}px;width:${Math.max(2, c.len * p)}px">${inner}</div>`;
};
const rowHTML = (k) => {
  const list = st.clips.filter((c) => c.track === k.id).sort((a, b) => a.start - b.start).map(clipHTML).join('');
  const dim = k.kind === 'v' ? k.hidden : k.muted;
  return `<div class="row${k.kind === 'a' ? ' a' : ''}">
    <div class="head">
      <div class="tn">${ic(k.kind === 'v' ? 'film' : 'music')}<b>${esc(k.name)}</b></div>
      <div class="hb">
        ${k.kind === 'v' ? `<button class="mini${k.hidden ? ' off' : ''}" data-tk="${k.id}" data-act="hide" data-tip="${k.hidden ? '顯示軌道' : '隱藏軌道'}">${ic(k.hidden ? 'eyeOff' : 'eye')}</button>` : ''}
        <button class="mini${k.muted ? ' off' : ''}" data-tk="${k.id}" data-act="mute" data-tip="${k.muted ? '取消靜音' : '靜音'}">${ic(k.muted ? 'volOff' : 'vol')}</button>
        <button class="mini" data-tk="${k.id}" data-act="drop" data-tip="刪除軌道">${ic('x')}</button>
      </div>
    </div>
    <div class="lane${dim ? ' dim' : ''}" data-tk="${k.id}">${list}</div>
  </div>`;
};
const sizeTL = () => {
  const vis = Math.max(0, tlView.clientWidth - HW);
  tlIn.style.width = `${HW + Math.max((total() + 30) * st.pps, vis)}px`;
};
const renderTL = () => {
  rows.innerHTML = st.tracks.map(rowHTML).join('');
  sizeTL();
  movePh();
};
const refreshClip = (c) => {
  const el = rows.querySelector(`.clip[data-id="${c.id}"]`);
  if (el) el.outerHTML = clipHTML(c);
};
const fitClipEl = (el, c) => {
  const p = st.pps;
  el.style.left = `${c.start * p}px`;
  el.style.width = `${Math.max(2, c.len * p)}px`;
  const wv = $('.wv', el);
  if (wv) wv.style.backgroundPosition = `${-(c.in / c.speed) * p}px 0`;
};

const snapPts = (skip) => {
  const pts = [0, st.t];
  st.clips.forEach((c) => { if (c.id !== skip) pts.push(c.start, c.start + c.len); });
  return pts;
};
const snapT = (t, pts) => {
  if (!st.snap) return t;
  let best = t;
  let bd = 8 / st.pps;
  pts.forEach((p) => {
    const d = Math.abs(p - t);
    if (d < bd) { bd = d; best = p; }
  });
  return best;
};
const laneAt = (y) => $$('.lane', rows).find((l) => {
  const r = l.getBoundingClientRect();
  return y >= r.top && y < r.bottom;
});
const laneTop = (id) => rows.querySelector(`.lane[data-tk="${id}"]`)?.getBoundingClientRect().top || 0;

const clipDown = (e, el) => {
  const c = st.clips.find((x) => x.id === el.dataset.id);
  if (!c) return;
  if (e.pointerType !== 'mouse' && st.sel !== c.id) return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  e.preventDefault();
  if (st.sel !== c.id) select(c.id);
  const hEl = e.target.closest('.h');
  const side = hEl ? (hEl.classList.contains('l') ? 'l' : 'r') : null;
  const m = mm.get(c.media);
  const lim = isAV(c) && m?.dur ? m.dur : Infinity;
  const o = { start: c.start, len: c.len, in: c.in, track: c.track };
  const x0 = e.clientX;
  const y0 = e.clientY;
  const pts = snapPts(c.id);
  let moved = false;
  let tgt = c.track;
  const node = rows.querySelector(`.clip[data-id="${c.id}"]`) || el;
  const mv = (ev) => {
    if (!moved) {
      if (Math.abs(ev.clientX - x0) < 4 && Math.abs(ev.clientY - y0) < 8) return;
      moved = true;
      mark();
      node.classList.add('drag');
    }
    const dx = (ev.clientX - x0) / st.pps;
    if (!side) {
      let ns = Math.max(0, o.start + dx);
      const a = snapT(ns, pts);
      const b = snapT(ns + c.len, pts) - c.len;
      if (a !== ns && (b === ns || Math.abs(a - ns) <= Math.abs(b - ns))) ns = a;
      else if (b !== ns) ns = Math.max(0, b);
      c.start = ns;
      const lane = laneAt(ev.clientY);
      if (lane && trackOf(lane.dataset.tk)?.kind === kindOf(c.type)) tgt = lane.dataset.tk;
      node.style.transform = `translateY(${laneTop(tgt) - laneTop(o.track)}px)`;
    } else if (side === 'l') {
      const lo = Math.max(-o.start, lim === Infinity ? -Infinity : -o.in / c.speed);
      let d = clamp(dx, lo, o.len - 0.1);
      d = clamp(snapT(o.start + d, pts) - o.start, lo, o.len - 0.1);
      c.start = o.start + d;
      c.len = o.len - d;
      if (isAV(c)) c.in = Math.max(0, o.in + d * c.speed);
    } else {
      const hi = lim === Infinity ? Infinity : (lim - o.in) / c.speed;
      let nl = clamp(o.len + dx, 0.1, hi);
      nl = clamp(snapT(c.start + nl, pts) - c.start, 0.1, hi);
      c.len = nl;
    }
    fitClipEl(node, c);
    paint();
  };
  const up = () => {
    window.removeEventListener('pointermove', mv);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
    node.classList.remove('drag');
    node.style.transform = '';
    if (!moved) return;
    if (!side) c.track = tgt;
    commit();
  };
  window.addEventListener('pointermove', mv);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
};

const select = (id) => {
  st.sel = id;
  $$('.clip', rows).forEach((el) => el.classList.toggle('sel', el.dataset.id === id));
  renderInsp();
  paint();
  updateBtns();
};

const setZoom = (val, anchor) => {
  const p = clamp(Math.round(val), 10, 300);
  if (p === st.pps) return;
  const vis = tlView.clientWidth - HW;
  let ax = anchor;
  if (ax == null) {
    const px = st.t * st.pps - tlView.scrollLeft;
    ax = px >= 0 && px <= vis ? px : 0;
  }
  const ta = (tlView.scrollLeft + ax) / st.pps;
  st.pps = p;
  zoom.value = p;
  syncRangeFill(zoom);
  renderTL();
  tlView.scrollLeft = Math.max(0, ta * p - ax);
  drawRuler();
};

const freeAt = (track, s, len) => !st.clips.some((c) => c.track === track && c.start < s + len - 1e-6 && c.start + c.len > s + 1e-6);
const endOf = (track) => st.clips.filter((c) => c.track === track).reduce((m, c) => Math.max(m, c.start + c.len), 0);
const makeTrack = (kind) => {
  const used = new Set(st.tracks.map((k) => k.name));
  const pre = kind === 'v' ? 'V' : 'A';
  let i = 1;
  while (used.has(`${pre}${i}`)) i++;
  const k = { id: uid(), kind, name: `${pre}${i}`, muted: false, hidden: false };
  if (kind === 'v') st.tracks.unshift(k);
  else st.tracks.push(k);
  return k.id;
};
const pickTrack = (type) => {
  if (type === 'audio') return st.tracks.find((k) => k.kind === 'a')?.id || makeTrack('a');
  const vs = st.tracks.filter((k) => k.kind === 'v');
  if (!vs.length) return makeTrack('v');
  return type === 'text' ? vs[0].id : vs[vs.length - 1].id;
};
const addMedia = (m, at = null) => {
  let track = at?.track;
  if (!track || trackOf(track)?.kind !== kindOf(m.type)) track = pickTrack(m.type);
  const len = m.type === 'image' ? 5 : Math.max(0.1, m.dur || 5);
  const start = at ? at.start : (freeAt(track, st.t, len) ? st.t : endOf(track));
  const c = mkClip({ type: m.type, media: m.id, track, start, len });
  st.clips.push(c);
  return c;
};
const addText = (pre) => {
  let made = null;
  edit(() => {
    const track = pickTrack('text');
    const start = freeAt(track, st.t, 3) ? st.t : endOf(track);
    made = mkClip({ type: 'text', track, start, len: 3, ...pre });
    st.clips.push(made);
    st.sel = made.id;
  });
  fontsFor(made);
  toast('已加入文字');
};

const splitAt = () => {
  const t = st.t;
  const hit = (c) => t > c.start + 0.05 && t < c.start + c.len - 0.05;
  let list = st.clips.filter(hit);
  const s = sel();
  if (s && hit(s)) list = [s];
  if (!list.length) {
    toast('播放頭位置沒有片段');
    return;
  }
  edit(() => {
    list.forEach((c) => {
      const d = t - c.start;
      const b = { ...JSON.parse(JSON.stringify(c)), id: uid(), start: t, len: c.len - d, tinKind: 'none', afin: 0 };
      if (isAV(c)) b.in = c.in + d * c.speed;
      c.len = d;
      c.toutKind = 'none';
      c.afout = 0;
      st.clips.push(b);
    });
  });
};
const dupSel = () => {
  const c = sel();
  if (!c) return;
  edit(() => {
    const d = { ...JSON.parse(JSON.stringify(c)), id: uid(), start: c.start + c.len };
    st.clips.push(d);
    st.sel = d.id;
  });
  toast('已複製片段');
};
const delSel = () => {
  const c = sel();
  if (!c) return;
  edit(() => {
    st.clips = st.clips.filter((x) => x.id !== c.id);
    st.sel = null;
  });
};
const setSpeed = (c, v) => {
  const old = c.speed;
  if (old === v) return;
  let len = (c.len * old) / v;
  const m = mm.get(c.media);
  if (m?.dur) len = Math.min(len, (m.dur - c.in) / v);
  c.speed = v;
  c.len = Math.max(0.1, len);
};

const trackAct = async (id, a) => {
  const k = trackOf(id);
  if (!k) return;
  if (a === 'hide') {
    edit(() => { k.hidden = !k.hidden; });
    return;
  }
  if (a === 'mute') {
    edit(() => { k.muted = !k.muted; });
    return;
  }
  if (a !== 'drop') return;
  if (st.tracks.filter((x) => x.kind === k.kind).length <= 1) {
    toast(`至少要保留一條${k.kind === 'v' ? '影像' : '音訊'}軌`);
    return;
  }
  const n = st.clips.filter((c) => c.track === id).length;
  if (n) {
    const ok = await ask({ title: '刪除軌道', text: `「${esc(k.name)}」上還有 ${n} 個片段，會一起刪掉，確定嗎？`, btns: [{ label: '取消', v: 0 }, { label: '刪除', cls: 'danger', v: 1 }] });
    if (ok !== 1) return;
  }
  edit(() => {
    st.tracks = st.tracks.filter((x) => x.id !== id);
    st.clips = st.clips.filter((c) => c.track !== id);
    if (!sel()) st.sel = null;
  });
};

const kindOfFile = (f) => {
  const t = f.type || '';
  if (t.startsWith('video')) return 'video';
  if (t.startsWith('image')) return 'image';
  if (t.startsWith('audio')) return 'audio';
  const ext = (f.name.split('.').pop() || '').toLowerCase();
  if (['mp4', 'mov', 'webm', 'm4v', 'mkv'].includes(ext)) return 'video';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'avif', 'bmp'].includes(ext)) return 'image';
  if (['mp3', 'wav', 'm4a', 'aac', 'ogg', 'flac', 'opus'].includes(ext)) return 'audio';
  return null;
};
const snapThumb = (src, w, h) => {
  if (!w || !h) return '';
  const k = Math.min(1, 320 / Math.max(w, h));
  const cv = document.createElement('canvas');
  cv.width = Math.max(1, Math.round(w * k));
  cv.height = Math.max(1, Math.round(h * k));
  cv.getContext('2d').drawImage(src, 0, 0, cv.width, cv.height);
  return cv.toDataURL('image/jpeg', 0.72);
};
const loadImg = (url) => new Promise((res, rej) => {
  const img = new Image();
  img.onload = () => res(img);
  img.onerror = () => rej(new Error('圖片無法解碼'));
  img.src = url;
});
const within = (p, ms, msg) => Promise.race([p, sleep(ms).then(() => { throw new Error(msg); })]);
const boxKids = (dv, a, b) => {
  const out = [];
  let p = a;
  while (p + 8 <= b) {
    let size = dv.getUint32(p);
    const kind = String.fromCharCode(dv.getUint8(p + 4), dv.getUint8(p + 5), dv.getUint8(p + 6), dv.getUint8(p + 7));
    let head = 8;
    if (size === 1) {
      size = Number(dv.getBigUint64(p + 8));
      head = 16;
    } else if (size === 0) size = b - p;
    if (size < head || p + size > b) break;
    out.push([kind, p + head, p + size]);
    p += size;
  }
  return out;
};
const boxMeta = async (f) => {
  let p = 0;
  let moov = null;
  while (p + 8 <= f.size) {
    const dv = new DataView(await f.slice(p, p + 16).arrayBuffer());
    if (dv.byteLength < 8) break;
    let size = dv.getUint32(0);
    const kind = String.fromCharCode(dv.getUint8(4), dv.getUint8(5), dv.getUint8(6), dv.getUint8(7));
    let head = 8;
    if (size === 1 && dv.byteLength >= 16) {
      size = Number(dv.getBigUint64(8));
      head = 16;
    } else if (size === 0) size = f.size - p;
    if (size < head) break;
    if (kind === 'moov') {
      moov = [p + head, Math.min(f.size, p + size)];
      break;
    }
    p += size;
  }
  if (!moov || moov[1] - moov[0] > 64 * 1048576) return null;
  const dv = new DataView(await f.slice(moov[0], moov[1]).arrayBuffer());
  const top = boxKids(dv, 0, dv.byteLength);
  const mv = top.find(([k]) => k === 'mvhd');
  if (!mv) return null;
  const s = mv[1];
  const v1 = dv.getUint8(s) === 1;
  const scale = dv.getUint32(s + (v1 ? 20 : 12));
  const len = v1 ? Number(dv.getBigUint64(s + 24)) : dv.getUint32(s + 16);
  const out = { dur: scale ? len / scale : 0, w: 0, h: 0 };
  top.filter(([k]) => k === 'trak').forEach(([, a, b]) => {
    const tk = boxKids(dv, a, b).find(([k]) => k === 'tkhd');
    if (!tk || out.w) return;
    out.w = Math.round(dv.getUint32(tk[2] - 8) / 65536);
    out.h = Math.round(dv.getUint32(tk[2] - 4) / 65536);
  });
  return out;
};
const videoMeta = (url) => new Promise((res, rej) => {
  const v = document.createElement('video');
  v.muted = true;
  v.playsInline = true;
  v.setAttribute('playsinline', '');
  v.preload = 'metadata';
  const out = { dur: 0, w: 0, h: 0, thumb: '' };
  let fin = false;
  let to2 = 0;
  let to1 = 0;
  const end = (ok, err) => {
    if (fin) return;
    fin = true;
    clearTimeout(to1);
    clearTimeout(to2);
    v.removeAttribute('src');
    v.load();
    v.remove();
    if (ok) res(out);
    else rej(err);
  };
  to1 = setTimeout(() => end(false, new Error('瀏覽器沒有載入影片')), 10000);
  v.onloadedmetadata = () => {
    out.dur = v.duration;
    out.w = v.videoWidth;
    out.h = v.videoHeight;
    if (!Number.isFinite(out.dur) || out.dur <= 0) {
      end(false, new Error('讀不到影片長度'));
      return;
    }
    to2 = setTimeout(() => end(true), 4000);
    v.currentTime = Math.min(1, out.dur * 0.1);
  };
  v.onseeked = () => {
    let shot = false;
    const grab = () => {
      if (shot) return;
      shot = true;
      try {
        out.thumb = snapThumb(v, v.videoWidth, v.videoHeight);
      } catch (err) {
        console.error('擷取縮圖失敗', err);
      }
      end(true);
    };
    if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(grab);
    setTimeout(grab, 350);
  };
  v.onerror = () => end(false, Object.assign(new Error(v.error?.code === 4 ? '這個瀏覽器不支援此影片格式' : '影片無法解碼'), { hard: true }));
  pool.appendChild(v);
  v.src = url;
  v.load();
});
const audioDur = (url) => new Promise((res) => {
  const a = document.createElement('audio');
  a.preload = 'metadata';
  const to = setTimeout(() => res(0), 10000);
  a.onloadedmetadata = () => { clearTimeout(to); res(Number.isFinite(a.duration) ? a.duration : 0); };
  a.onerror = () => { clearTimeout(to); res(0); };
  a.src = url;
});
const decodeBuf = async (blob) => {
  const ab = await blob.arrayBuffer();
  const A = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const oc = new A(1, 1, 44100);
  return within(new Promise((res, rej) => {
    const p = oc.decodeAudioData(ab, res, rej);
    if (p?.then) p.then(res, rej);
  }), 30000, '解析音訊逾時');
};
const waveLater = async (m) => {
  const cap = (navigator.maxTouchPoints > 0 ? 40 : 150) * 1048576;
  if (m.type !== 'video' || m.wave || m.blob.size > cap) return;
  try {
    while (st.playing || busy) await sleep(800);
    m.wave = waveOf(await decodeBuf(m.blob), '#ffffff');
    if (!mm.has(m.id)) return;
    renderTL();
    const { url, img, ...rec } = m;
    put('media', rec).catch((err) => console.error('波形存檔失敗', err));
  } catch (err) {
    console.error('產生波形失敗', err);
  }
};
const waveOf = (buf, color) => {
  const n = clamp(Math.round(buf.duration * 40), 300, 4000);
  const h = 64;
  const ch = buf.getChannelData(0);
  const per = ch.length / n;
  const peaks = new Float32Array(n);
  let top = 0;
  for (let i = 0; i < n; i++) {
    const a = Math.floor(i * per);
    const b = Math.min(ch.length, Math.floor((i + 1) * per));
    const stride = Math.max(1, Math.floor((b - a) / 200));
    let mx = 0;
    for (let j = a; j < b; j += stride) {
      const v = Math.abs(ch[j]);
      if (v > mx) mx = v;
    }
    peaks[i] = mx;
    if (mx > top) top = mx;
  }
  const cv = document.createElement('canvas');
  cv.width = n;
  cv.height = h;
  const g = cv.getContext('2d');
  g.fillStyle = color;
  for (let i = 0; i < n; i++) {
    const bh = Math.max(1, (top ? peaks[i] / top : 0) * h * 0.94);
    g.fillRect(i, (h - bh) / 2, 1, bh);
  }
  return cv.toDataURL('image/png');
};
const addLib = (r) => {
  const m = { ...r, url: URL.createObjectURL(r.blob) };
  if (m.type === 'image') {
    m.img = new Image();
    m.img.onload = () => paint();
    m.img.src = m.url;
  }
  lib.push(m);
  mm.set(m.id, m);
  return m;
};
const probe = async (f) => {
  const type = kindOfFile(f);
  const r = { id: uid(), type, name: f.name, blob: f, dur: 0, w: 0, h: 0, thumb: '', wave: '' };
  const url = URL.createObjectURL(f);
  try {
    if (type === 'image') {
      const img = await loadImg(url);
      r.w = img.naturalWidth;
      r.h = img.naturalHeight;
      r.thumb = snapThumb(img, r.w, r.h);
    }
    if (type === 'video') {
      let why = '';
      const [el, box] = await Promise.all([
        videoMeta(url).catch((err) => { why = err; return null; }),
        boxMeta(f).catch((err) => { console.error('解析影片檔頭失敗', err); return null; }),
      ]);
      if (el && Number.isFinite(el.dur) && el.dur > 0) Object.assign(r, el);
      else if (box?.dur > 0 && !why?.hard) Object.assign(r, { dur: box.dur, w: el?.w || box.w, h: el?.h || box.h, thumb: el?.thumb || '' });
      else throw why || new Error('讀不到影片長度');
    }
    if (type === 'audio') {
      try {
        const b = await decodeBuf(f);
        r.dur = b.duration;
        r.wave = waveOf(b, '#8ef0aa');
      } catch (err) {
        r.dur = await audioDur(url);
      }
      r.thumb = r.wave;
    }
  } finally {
    URL.revokeObjectURL(url);
  }
  if (type !== 'image' && !(r.dur > 0)) throw new Error('讀不到長度');
  const m = addLib(r);
  put('media', r).catch((err) => {
    console.error('素材存檔失敗', err);
    toast('儲存空間不足，素材無法保留');
  });
  return m;
};
const addFiles = async (files) => {
  const list = files.filter(kindOfFile);
  if (!list.length) {
    toast('不支援的檔案格式');
    return;
  }
  const added = [];
  for (let i = 0; i < list.length; i++) {
    toast(`匯入中… ${i + 1} / ${list.length}`);
    try {
      added.push(await probe(list[i]));
      if (st.tab === 'media') renderSide();
    } catch (err) {
      console.error('匯入失敗', err);
      toast(`「${list[i].name}」無法讀取：${err?.message || '未知錯誤'}`);
      await sleep(2200);
    }
  }
  if (!added.length) return;
  edit(() => added.forEach((m) => addMedia(m)));
  toast(`已匯入 ${added.length} 個素材`);
  (async () => { for (const m of added) await waveLater(m); })();
};
const removeMedia = async (id) => {
  const m = mm.get(id);
  if (!m) return;
  const n = st.clips.filter((c) => c.media === id).length;
  const ok = await ask({
    title: '刪除素材',
    text: n ? `「${esc(m.name)}」在時間軸上有 ${n} 個片段，會一起移除。` : `要從素材庫移除「${esc(m.name)}」？`,
    btns: [{ label: '取消', v: 0 }, { label: '刪除', cls: 'danger', v: 1 }],
  });
  if (ok !== 1) return;
  const i = lib.indexOf(m);
  if (i >= 0) lib.splice(i, 1);
  mm.delete(id);
  edit(() => {
    st.clips = st.clips.filter((c) => c.media !== id);
    if (!sel()) st.sel = null;
  });
  URL.revokeObjectURL(m.url);
  drop('media', id).catch((err) => console.error('刪除素材失敗', err));
  renderSide();
};

const cardHTML = (m) => `<div class="card k-${m.type}" data-id="${m.id}" draggable="true">
  <div class="th k-${m.type}">
    ${m.thumb ? `<img src="${m.thumb}" alt="" draggable="false">` : ic(TYPE_IC[m.type])}
    <span class="kb"></span>
    ${m.type !== 'image' ? `<span class="du">${fmtDur(m.dur)}</span>` : ''}
    <div class="add"><i data-ic>${ic('plus')}</i></div>
  </div>
  <div class="cn">${esc(m.name)}</div>
  <button class="rm" data-rm data-tip="刪除素材">${ic('x')}</button>
</div>`;
const preStyle = (p) => [
  `font-family:${FONTS[p.font].replace(/"/g, "'")}`,
  `color:${p.color}`,
  `font-size:${clamp(p.size / 4.4, 13, 24)}px`,
  `font-weight:${p.bold ? 700 : 400}`,
  p.stroke ? 'text-shadow:0 0 2px #000,0 0 2px #000,0 0 3px #000' : '',
  p.bg ? 'background:rgba(0,0,0,.62);padding:3px 9px;border-radius:6px' : '',
].filter(Boolean).join(';');
const renderSide = () => {
  $$('#sideTab button').forEach((b) => b.classList.toggle('on', b.dataset.tab === st.tab));
  if (st.tab === 'media') {
    sideView.innerHTML = `<button class="drop" data-pick-file>${ic('plus')}匯入</button>
      ${lib.length ? `<div class="lib">${lib.map(cardHTML).join('')}</div>` : `<div class="empty">${ic('film')}<span>沒有素材</span></div>`}`;
    return;
  }
  sideView.innerHTML = `<div class="presets">${PRESETS.map((p, i) => `<button class="pre" data-pre="${i}"><span style="${preStyle(p)}">${esc(p.text)}</span></button>`).join('')}</div>`;
};

const rr = (label, c, k) => {
  const r = RNG[k];
  const v = getK(c, k);
  return `<div class="rr"><span>${label}</span><input type="range" class="ios-range" data-k="${k}" min="${r.min}" max="${r.max}" step="${r.step}" value="${v}"><b>${r.f(v)}</b></div>`;
};
const grp = (title, body) => `<div class="grp"><h4>${title}</h4>${body}</div>`;
const chips = (pick, list, cur) => `<div class="chips" data-pick="${pick}">${list.map(([v, l]) => `<button data-v="${v}" class="${String(cur) === String(v) ? 'on' : ''}">${l}</button>`).join('')}</div>`;
const lookOn = (f, look) => {
  const t = { ...BASE_F, ...look };
  return Object.keys(BASE_F).every((k) => Math.abs((f[k] ?? BASE_F[k]) - t[k]) < 0.005);
};
const lookIdx = (f) => LOOKS.findIndex(([, l]) => lookOn(f, l));
const blankHTML = () => `<div class="blank">${ic('pointer')}<span>未選取</span></div>`;
const renderInsp = () => {
  const c = sel();
  $('#inspTitle').textContent = c ? `編輯${TYPE_LABEL[c.type]}` : '編輯';
  if (!c) {
    inspBody.innerHTML = blankHTML();
    return;
  }
  const media = c.type === 'video' || c.type === 'image';
  let h = `<div class="ihead k-${c.type}"><div class="kd">${ic(TYPE_IC[c.type])}</div><div><b>${esc(clipName(c))}</b><small>${fmt(c.start)} → ${fmt(c.start + c.len)} · ${c.len.toFixed(2)} 秒</small></div></div>`;
  if (c.type === 'text') {
    h += grp('文字', `
      <div class="line up"><span class="lb">內容</span><textarea class="ta" data-k="text" rows="2">${esc(c.text)}</textarea></div>
      <div class="line"><span class="lb">字型</span><div class="seg" data-pick="font">${[['hei', '黑體'], ['ming', '明體'], ['kai', '文楷']].map(([v, l]) => `<button data-v="${v}" class="${c.font === v ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      ${rr('字級', c, 'size')}
      <div class="line"><span class="lb">顏色</span><div class="sw" data-pick="color">${COLORS.map((v) => `<button data-v="${v}" style="--v:${v}" class="${c.color.toLowerCase() === v ? 'on' : ''}"></button>`).join('')}<label><input type="color" data-k="color" value="${c.color}"></label></div></div>
      <div class="line"><span class="lb">粗體</span><button class="tg${c.bold ? ' on' : ''}" data-tg="bold"></button></div>
      <div class="line"><span class="lb">描邊</span><button class="tg${c.stroke ? ' on' : ''}" data-tg="stroke"></button></div>
      <div class="line"><span class="lb">底色</span><button class="tg${c.bg ? ' on' : ''}" data-tg="bg"></button></div>
      <div class="line"><span class="lb">位置</span>${chips('pos', [['0.15', '上'], ['0.5', '中'], ['0.85', '下']], c.x === 0.5 ? String(c.y) : '')}</div>`);
  }
  if (c.type !== 'audio') {
    h += grp('畫面', `
      ${rr('縮放', c, 'scale')}
      ${rr('透明', c, 'opacity')}
      ${media ? `<div class="line"><span class="lb">比例</span><div class="seg" data-pick="fit"><button data-v="contain" class="${c.fit === 'contain' ? 'on' : ''}">完整顯示</button><button data-v="cover" class="${c.fit === 'cover' ? 'on' : ''}">填滿畫面</button></div></div>
      <div class="line"><span class="lb">位置</span>${chips('center', [['1', '回到正中央']], '')}</div>` : ''}`);
  }
  if (media) {
    h += grp('濾鏡', `
      ${chips('look', LOOKS.map(([n], i) => [i, n]), lookIdx(c.filter))}
      ${rr('亮度', c, 'filter.bright')}
      ${rr('對比', c, 'filter.contrast')}
      ${rr('飽和', c, 'filter.sat')}
      ${rr('黑白', c, 'filter.gray')}
      ${rr('懷舊', c, 'filter.sepia')}`);
  }
  if (c.type !== 'audio') {
    h += grp('轉場', `
      <div class="line"><span class="lb">進場</span>${chips('tinKind', [['none', '無'], ['fade', '淡入'], ['slide', '滑入'], ['zoom', '放大']], c.tinKind)}</div>
      ${rr('長度', c, 'tin')}
      <div class="line"><span class="lb">出場</span>${chips('toutKind', [['none', '無'], ['fade', '淡出'], ['slide', '滑出'], ['shrink', '縮小']], c.toutKind)}</div>
      ${rr('長度', c, 'tout')}`);
  }
  if (isAV(c)) {
    h += grp('音訊', `${rr('音量', c, 'volume')}${rr('淡入', c, 'afin')}${rr('淡出', c, 'afout')}`);
    h += grp('速度', chips('speed', [0.25, 0.5, 1, 1.5, 2, 3].map((v) => [v, `${v}x`]), c.speed));
  }
  h += `<div class="acts"><button class="btn" data-act="split">${ic('scissors')}分割</button><button class="btn" data-act="dup">${ic('copy')}複製</button><button class="btn danger" data-act="del">${ic('trash')}刪除</button></div>`;
  inspBody.innerHTML = h;
  requestAnimationFrame(() => $$('.ios-range', inspBody).forEach(syncRangeFill));
};

let typing = false;
const onInspInput = (e) => {
  const k = e.target.dataset.k;
  const c = sel();
  if (!k || !c) return;
  if (!typing) {
    mark();
    typing = true;
    updateBtns();
  }
  const isRange = e.target.type === 'range';
  const v = isRange ? Number(e.target.value) : e.target.value;
  setK(c, k, v);
  if (isRange) {
    syncRangeFill(e.target);
    const b = e.target.nextElementSibling;
    if (b) b.textContent = RNG[k].f(v);
  }
  if (k === 'color') $$('.sw button', inspBody).forEach((b) => b.classList.toggle('on', b.dataset.v === String(v).toLowerCase()));
  if (k === 'text') {
    fontsFor(c);
    const b = $('.ihead b', inspBody);
    if (b) b.textContent = clipName(c);
  }
  if (k.startsWith('filter.')) {
    const i = lookIdx(c.filter);
    $$('[data-pick="look"] button', inspBody).forEach((b) => b.classList.toggle('on', Number(b.dataset.v) === i));
  }
  if (['tin', 'tout', 'text'].includes(k)) refreshClip(c);
  if (['volume', 'afin', 'afout'].includes(k)) syncMedia();
  paint();
};
const onInspClick = (e) => {
  const c = sel();
  if (!c) return;
  const a = e.target.closest('[data-act]');
  if (a) {
    if (a.dataset.act === 'split') splitAt();
    if (a.dataset.act === 'dup') dupSel();
    if (a.dataset.act === 'del') delSel();
    return;
  }
  const tg = e.target.closest('[data-tg]');
  if (tg) {
    edit(() => { c[tg.dataset.tg] = !c[tg.dataset.tg]; });
    if (tg.dataset.tg === 'bold') fontsFor(c);
    return;
  }
  const b = e.target.closest('button[data-v]');
  const box = b?.closest('[data-pick]');
  if (!box) return;
  const pick = box.dataset.pick;
  const v = b.dataset.v;
  edit(() => {
    if (pick === 'font') c.font = v;
    if (pick === 'color') c.color = v;
    if (pick === 'pos') { c.x = 0.5; c.y = Number(v); }
    if (pick === 'fit') c.fit = v;
    if (pick === 'center') { c.x = 0.5; c.y = 0.5; }
    if (pick === 'look') c.filter = { ...BASE_F, ...LOOKS[Number(v)][1] };
    if (pick === 'tinKind') c.tinKind = v;
    if (pick === 'toutKind') c.toutKind = v;
    if (pick === 'speed') setSpeed(c, Number(v));
  });
  if (pick === 'font') fontsFor(c);
};

const sheet = (name) => {
  const side = $('#side');
  const insp = $('#insp');
  const cur = side.classList.contains('open') ? st.tab : insp.classList.contains('open') ? 'insp' : null;
  const next = name && name !== cur ? name : null;
  side.classList.remove('open');
  insp.classList.remove('open');
  if (next === 'insp') insp.classList.add('open');
  else if (next) {
    st.tab = next;
    renderSide();
    side.classList.add('open');
  }
  $$('#mnav button').forEach((b) => b.classList.toggle('on', b.dataset.sheet === next));
  requestAnimationFrame(() => $$('.ios-range').forEach(syncRangeFill));
};

const encodeMp4 = async (opt, prog, stopped) => {
  const k = opt.res === '1080' ? 1.5 : 1;
  const w = Math.round((W * k) / 2) * 2;
  const h = Math.round((H * k) / 2) * 2;
  const fps = opt.fps;
  const T = total();
  const n = Math.max(1, Math.ceil(T * fps));
  prog(0, '載入編碼器…');
  const { Muxer, ArrayBufferTarget } = await import('https://cdn.jsdelivr.net/npm/mp4-muxer@5.2.1/+esm');
  const bitrate = k > 1 ? (fps > 30 ? 12e6 : 8e6) : (fps > 30 ? 8e6 : 5e6);
  let vc = null;
  for (const codec of ['avc1.64002a', 'avc1.640033', 'avc1.640028', 'avc1.4d0028', 'avc1.42002a', 'avc1.42001f']) {
    const cfg = { codec, width: w, height: h, bitrate, framerate: fps, avc: { format: 'avc' } };
    try {
      const s = await VideoEncoder.isConfigSupported(cfg);
      if (s.supported) {
        vc = cfg;
        break;
      }
    } catch (err) {
      console.error('檢查編碼設定失敗', codec, err);
    }
  }
  if (!vc) throw new Error('這台裝置找不到可用的 H.264 編碼設定');
  const acfg = { codec: 'mp4a.40.2', sampleRate: 48000, numberOfChannels: 2, bitrate: 192000 };
  const wantAudio = st.clips.some((c) => isAV(c) && c.volume > 0 && !trackOf(c.track)?.muted);
  let canAudio = false;
  if (wantAudio && typeof AudioEncoder !== 'undefined' && typeof AudioData !== 'undefined') {
    canAudio = await AudioEncoder.isConfigSupported(acfg).then((s) => s.supported).catch(() => false);
  }
  let pcm = null;
  if (canAudio) {
    prog(0.01, '混音中…');
    pcm = await mixdown(T, stopped);
  }
  if (stopped()) return null;
  const target = new ArrayBufferTarget();
  const muxer = new Muxer({
    target,
    video: { codec: 'avc', width: w, height: h, frameRate: fps },
    ...(pcm ? { audio: { codec: 'aac', numberOfChannels: 2, sampleRate: 48000 } } : {}),
    fastStart: 'in-memory',
    firstTimestampBehavior: 'offset',
  });
  let fail = null;
  if (pcm) {
    const ae = new AudioEncoder({ output: (ch, meta) => muxer.addAudioChunk(ch, meta), error: (err) => { fail = err; } });
    ae.configure(acfg);
    const L = pcm.getChannelData(0);
    const R = pcm.numberOfChannels > 1 ? pcm.getChannelData(1) : L;
    for (let i = 0; i < pcm.length; i += 4800) {
      const len = Math.min(4800, pcm.length - i);
      const buf = new Float32Array(len * 2);
      buf.set(L.subarray(i, i + len), 0);
      buf.set(R.subarray(i, i + len), len);
      const ad = new AudioData({ format: 'f32-planar', sampleRate: 48000, numberOfFrames: len, numberOfChannels: 2, timestamp: Math.round((i / 48000) * 1e6), data: buf });
      ae.encode(ad);
      ad.close();
    }
    await ae.flush();
    ae.close();
  }
  if (fail) throw fail;
  await Promise.all(st.clips.filter((c) => c.type === 'text').map(fontsFor));
  const ve = new VideoEncoder({ output: (ch, meta) => muxer.addVideoChunk(ch, meta), error: (err) => { fail = err; } });
  ve.configure(vc);
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const cx = cv.getContext('2d');
  const begin = performance.now();
  for (let i = 0; i < n; i++) {
    if (stopped()) {
      try { ve.close(); } catch (err) { console.error(err); }
      return null;
    }
    if (fail) throw fail;
    const t = Math.min(i / fps, T - 1e-4);
    await seekFor(t);
    render(cx, w, h, t, false);
    const fr = new VideoFrame(cv, { timestamp: Math.round((i * 1e6) / fps), duration: Math.round(1e6 / fps) });
    ve.encode(fr, { keyFrame: i % (fps * 2) === 0 });
    fr.close();
    while (ve.encodeQueueSize > 10) await sleep(2);
    if (i % 4 === 0 || i === n - 1) {
      const spent = (performance.now() - begin) / 1000;
      const left = (spent / (i + 1)) * (n - i - 1);
      prog(0.03 + (0.95 * (i + 1)) / n, `${Math.round(((i + 1) / n) * 100)}% · 第 ${i + 1} / ${n} 格 · 剩約 ${Math.ceil(left)} 秒`);
    }
  }
  await ve.flush();
  ve.close();
  if (fail) throw fail;
  muxer.finalize();
  prog(1, '完成');
  return { blob: new Blob([target.buffer], { type: 'video/mp4' }), lost: wantAudio && !pcm };
};
const mixdown = async (T, stopped) => {
  const list = st.clips.filter((c) => isAV(c) && c.volume > 0 && !trackOf(c.track)?.muted && mm.get(c.media));
  if (!list.length) return null;
  const A = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const oc = new A(2, Math.max(1, Math.ceil(T * 48000)), 48000);
  const bufs = new Map();
  let any = false;
  for (const c of list) {
    if (stopped()) return null;
    if (!bufs.has(c.media)) {
      try {
        bufs.set(c.media, await oc.decodeAudioData(await mm.get(c.media).blob.arrayBuffer()));
      } catch (err) {
        bufs.set(c.media, null);
      }
    }
    const buf = bufs.get(c.media);
    if (!buf || c.in >= buf.duration) continue;
    const src = oc.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = c.speed;
    const g = oc.createGain();
    const v = c.volume;
    const end = c.start + c.len;
    const fi = Math.min(c.afin, c.len / 2);
    const fo = Math.min(c.afout, c.len / 2);
    g.gain.setValueAtTime(fi > 0 ? 0 : v, c.start);
    if (fi > 0) g.gain.linearRampToValueAtTime(v, c.start + fi);
    if (fo > 0) {
      g.gain.setValueAtTime(v, end - fo);
      g.gain.linearRampToValueAtTime(0, end);
    }
    src.connect(g);
    g.connect(oc.destination);
    src.start(c.start, c.in, c.len * c.speed);
    any = true;
  }
  if (!any) return null;
  return oc.startRendering();
};
const seekEl = (el, want) => new Promise((res) => {
  const go = () => {
    if (Math.abs(el.currentTime - want) < 0.0005 && el.readyState >= 2) {
      res();
      return;
    }
    let to = 0;
    const done = () => {
      clearTimeout(to);
      el.removeEventListener('seeked', done);
      res();
    };
    to = setTimeout(done, 3000);
    el.addEventListener('seeked', done);
    el.currentTime = want;
  };
  if (el.readyState >= 1) {
    go();
    return;
  }
  const to = setTimeout(res, 6000);
  el.addEventListener('loadedmetadata', () => { clearTimeout(to); go(); }, { once: true });
});
const seekFor = async (t) => {
  const waits = [];
  for (const c of st.clips) {
    if (c.type !== 'video') continue;
    if (c.start + c.len < t - 0.5 && els.size > 6) dropEl(c.id);
    if (t < c.start || t >= c.start + c.len || trackOf(c.track)?.hidden) continue;
    const e = getEl(c);
    if (!e) continue;
    if (!e.el.paused) e.el.pause();
    const d = Number.isFinite(e.el.duration) ? e.el.duration - 0.001 : Infinity;
    waits.push(seekEl(e.el, Math.min(c.in + (t - c.start) * c.speed, d)));
  }
  await Promise.all(waits);
};
const exportDlg = () => {
  if (busy) return;
  if (!total()) {
    toast('時間軸是空的');
    return;
  }
  if (typeof VideoEncoder === 'undefined' || typeof VideoFrame === 'undefined') {
    ask({ title: '無法匯出', text: '此瀏覽器不支援 WebCodecs，請改用最新版 Chrome、Edge 或 Safari 17 以上。', btns: [{ label: '好', cls: 'primary', v: 1 }] });
    return;
  }
  if (st.playing) pause();
  const opt = { res: '720', fps: 30 };
  const dims = () => `${Math.round((W * (opt.res === '1080' ? 1.5 : 1)) / 2) * 2} × ${Math.round((H * (opt.res === '1080' ? 1.5 : 1)) / 2) * 2}`;
  let go = null;
  const md = modal({
    title: '匯出',
    wide: true,
    lock: true,
    html: `<div class="ex-row"><span>解析度</span><div class="seg" data-o="res"><button data-v="720" class="on">720p</button><button data-v="1080">1080p</button></div></div>
      <div class="ex-row"><span>影格率</span><div class="seg" data-o="fps"><button data-v="30" class="on">30 fps</button><button data-v="60">60 fps</button></div></div>
      <div class="ex-row"><span>長度</span><b>${fmt(total())}</b></div>
      <div class="ex-row"><span>畫面</span><b data-dims>${dims()}</b></div>
      <p class="modal-text">匯出期間請停留在此分頁</p>`,
    btns: [{ label: '取消', v: 0 }, { label: '開始匯出', cls: 'primary', keep: true, on: () => go() }],
  });
  md.box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-o] button');
    if (!b || busy) return;
    const o = b.parentElement.dataset.o;
    opt[o] = o === 'fps' ? Number(b.dataset.v) : b.dataset.v;
    $$('button', b.parentElement).forEach((x) => x.classList.toggle('on', x === b));
    const d = $('[data-dims]', md.box);
    if (d) d.textContent = dims();
  });
  go = async () => {
    if (busy) return;
    busy = true;
    const body = $('.modal-body', md.box);
    const acts = $('.modal-actions', md.box);
    body.innerHTML = '<div class="bar"><i></i></div><div class="ex-info">準備中…</div>';
    acts.innerHTML = '<button class="modal-btn ghost" data-x>取消匯出</button>';
    const bar = $('.bar i', body);
    const info = $('.ex-info', body);
    let stop = false;
    $('[data-x]', acts).onclick = () => { stop = true; info.textContent = '正在取消…'; };
    try {
      const out = await encodeMp4(opt, (p, msg) => { bar.style.width = `${p * 100}%`; info.textContent = msg; }, () => stop);
      if (!out) {
        md.close();
        toast('已取消匯出');
        return;
      }
      const name = `aki-cut-${new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '')}.mp4`;
      const url = URL.createObjectURL(out.blob);
      const file = new File([out.blob], name, { type: 'video/mp4' });
      const share = !!navigator.canShare?.({ files: [file] });
      body.innerHTML = `<video class="ex-vid" src="${url}" controls playsinline></video><div class="ex-row"><span>檔案大小</span><b>${(out.blob.size / 1048576).toFixed(1)} MB</b></div>${out.lost ? '<p class="modal-text">此瀏覽器不支援音訊編碼，僅匯出畫面</p>' : ''}`;
      acts.innerHTML = `<button class="modal-btn ghost" data-x>關閉</button>${share ? '<button class="modal-btn ghost" data-sh>分享</button>' : ''}<button class="modal-btn primary" data-dl>下載 MP4</button>`;
      $('[data-x]', acts).onclick = () => {
        md.close();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      };
      $('[data-dl]', acts).onclick = () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      const sh = $('[data-sh]', acts);
      if (sh) sh.onclick = () => navigator.share({ files: [file], title: 'AkiCut' }).catch(() => {});
    } catch (err) {
      console.error('匯出失敗', err);
      body.innerHTML = `<p class="modal-text">匯出失敗：${esc(err?.message || err)}</p>`;
      acts.innerHTML = '<button class="modal-btn primary" data-x>關閉</button>';
      $('[data-x]', acts).onclick = () => md.close();
    } finally {
      busy = false;
      syncMedia();
      paint();
    }
  };
};

const newProject = async () => {
  const v = await ask({
    title: '開新專案',
    text: '「全部清除」會一併刪除素材庫，無法復原。',
    btns: [{ label: '取消', v: 0 }, { label: '全部清除', cls: 'danger', v: 2 }, { label: '只清時間軸', cls: 'primary', v: 1 }],
  });
  if (!v) return;
  if (st.playing) pause();
  st.t = 0;
  edit(() => {
    st.clips = [];
    st.tracks = freshTracks();
    st.sel = null;
  });
  if (v === 2) {
    undo.length = 0;
    redo.length = 0;
    lib.splice(0).forEach((m) => URL.revokeObjectURL(m.url));
    mm.clear();
    tx('media', 'readwrite', (s) => s.clear()).catch((err) => console.error('清除素材失敗', err));
    renderSide();
    updateBtns();
  }
  toast('已開新專案');
};

const onKey = (e) => {
  if (busy || $('.modal-backdrop')) return;
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  const mod = e.ctrlKey || e.metaKey;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (k === ' ') {
    e.preventDefault();
    if (document.activeElement?.tagName === 'BUTTON') document.activeElement.blur();
    toggle();
  } else if (mod && k === 'z') {
    e.preventDefault();
    if (e.shiftKey) doRedo();
    else doUndo();
  } else if (mod && k === 'y') {
    e.preventDefault();
    doRedo();
  } else if (mod && k === 'd') {
    e.preventDefault();
    dupSel();
  } else if (k === 'Delete' || k === 'Backspace') {
    if (st.sel) {
      e.preventDefault();
      delSel();
    }
  } else if (!mod && k === 's') {
    splitAt();
  } else if (k === 'ArrowLeft' || k === 'ArrowRight') {
    e.preventDefault();
    const d = e.shiftKey ? 1 : 1 / 30;
    setT(st.t + (k === 'ArrowLeft' ? -d : d));
  } else if (k === 'Home') {
    e.preventDefault();
    setT(0);
  } else if (k === 'End') {
    e.preventDefault();
    setT(total());
  }
};

const bind = () => {
  $('#ratio').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-r]');
    if (!b) return;
    setRatio(b.dataset.r);
    renderInsp();
    save();
  });
  $('#newBtn').addEventListener('click', newProject);
  $('#exBtn').addEventListener('click', exportDlg);
  $('#sideTab').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-tab]');
    if (!b) return;
    st.tab = b.dataset.tab;
    renderSide();
    $$('#mnav button').forEach((x) => { if (x.classList.contains('on') && x.dataset.sheet !== 'insp') x.classList.toggle('on', x.dataset.sheet === st.tab); });
  });
  $$('[data-close]').forEach((b) => b.addEventListener('click', () => sheet(null)));
  $('#mnav').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-sheet]');
    if (b) sheet(b.dataset.sheet);
  });
  sideView.addEventListener('click', (e) => {
    if (e.target.closest('[data-pick-file]')) {
      fileIn.click();
      return;
    }
    const rm = e.target.closest('[data-rm]');
    if (rm) {
      removeMedia(rm.closest('.card').dataset.id);
      return;
    }
    const card = e.target.closest('.card');
    if (card) {
      const m = mm.get(card.dataset.id);
      if (!m) return;
      let c = null;
      edit(() => { c = addMedia(m); });
      toast(`已加入「${m.name}」`);
      if (c) select(c.id);
      return;
    }
    const pre = e.target.closest('[data-pre]');
    if (pre) addText(PRESETS[Number(pre.dataset.pre)]);
  });
  sideView.addEventListener('dragstart', (e) => {
    const card = e.target.closest?.('.card');
    if (!card) return;
    e.dataTransfer.setData('text/aki', card.dataset.id);
    e.dataTransfer.effectAllowed = 'copy';
  });
  fileIn.addEventListener('change', () => {
    const fs = [...fileIn.files];
    fileIn.value = '';
    if (fs.length) addFiles(fs);
  });

  $('#playBtn').addEventListener('click', toggle);
  $('#goStart').addEventListener('click', () => setT(0));
  $('#goEnd').addEventListener('click', () => setT(total()));
  $('#stepBack').addEventListener('click', () => setT(st.t - 1 / 30));
  $('#stepFwd').addEventListener('click', () => setT(st.t + 1 / 30));

  $('#undoBtn').addEventListener('click', doUndo);
  $('#redoBtn').addEventListener('click', doRedo);
  $('#splitBtn').addEventListener('click', splitAt);
  $('#dupBtn').addEventListener('click', dupSel);
  $('#delBtn').addEventListener('click', delSel);
  $('#snapBtn').addEventListener('click', (e) => {
    st.snap = !st.snap;
    e.currentTarget.classList.toggle('on', st.snap);
    toast(st.snap ? '吸附：開' : '吸附：關');
  });
  $('#addTrack').addEventListener('click', async () => {
    const v = await ask({ title: '新增軌道', text: '影像軌放影片、圖片和文字，越上面的軌道會疊在越上層；音訊軌放音樂和音效。', btns: [{ label: '取消', v: 0 }, { label: '音訊軌', v: 'a' }, { label: '影像軌', cls: 'primary', v: 'v' }] });
    if (v === 'v' || v === 'a') edit(() => makeTrack(v));
  });
  $('#zoomOut').addEventListener('click', () => setZoom(st.pps * 0.8));
  $('#zoomIn').addEventListener('click', () => setZoom(st.pps * 1.25));
  zoom.addEventListener('input', () => setZoom(Number(zoom.value)));

  rows.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.mini')) return;
    const el = e.target.closest('.clip');
    if (el) clipDown(e, el);
  });
  rows.addEventListener('click', (e) => {
    const mini = e.target.closest('.mini');
    if (mini) {
      trackAct(mini.dataset.tk, mini.dataset.act);
      return;
    }
    const el = e.target.closest('.clip');
    if (el) {
      if (st.sel !== el.dataset.id) select(el.dataset.id);
      return;
    }
    const lane = e.target.closest('.lane');
    if (!lane) return;
    if (st.sel) select(null);
    setT((e.clientX - lane.getBoundingClientRect().left) / st.pps);
  });
  rows.addEventListener('dragover', (e) => {
    if (!e.dataTransfer.types.includes('text/aki')) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });
  rows.addEventListener('drop', (e) => {
    const id = e.dataTransfer.getData('text/aki');
    const m = mm.get(id);
    if (!m) return;
    e.preventDefault();
    e.stopPropagation();
    const lane = e.target.closest('.lane');
    const x = lane ? e.clientX - lane.getBoundingClientRect().left : 0;
    const start = snapT(Math.max(0, x / st.pps), snapPts(null));
    let c = null;
    edit(() => { c = addMedia(m, { track: lane?.dataset.tk, start }); });
    if (c) select(c.id);
  });
  $('.rul').addEventListener('pointerdown', (e) => {
    if (e.target.closest('.corner')) return;
    e.preventDefault();
    const go = (ev) => setT((ev.clientX - ruler.getBoundingClientRect().left + tlView.scrollLeft) / st.pps);
    go(e);
    const up = () => {
      window.removeEventListener('pointermove', go);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    window.addEventListener('pointermove', go);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  });
  let rq = false;
  tlView.addEventListener('scroll', () => {
    if (rq) return;
    rq = true;
    requestAnimationFrame(() => { rq = false; drawRuler(); });
  }, { passive: true });
  tlView.addEventListener('wheel', (e) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setZoom(st.pps * (e.deltaY < 0 ? 1.12 : 1 / 1.12), e.clientX - tlView.getBoundingClientRect().left - HW);
  }, { passive: false });
  let pinch = null;
  const span = (ts) => Math.hypot(ts[0].clientX - ts[1].clientX, ts[0].clientY - ts[1].clientY);
  tlView.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 2) return;
    const mid = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    pinch = { d: span(e.touches), p: st.pps, ax: mid - tlView.getBoundingClientRect().left - HW };
  }, { passive: true });
  tlView.addEventListener('touchmove', (e) => {
    if (!pinch || e.touches.length !== 2) return;
    e.preventDefault();
    setZoom(pinch.p * (span(e.touches) / pinch.d), pinch.ax);
  }, { passive: false });
  tlView.addEventListener('touchend', (e) => { if (e.touches.length < 2) pinch = null; });

  view.addEventListener('pointerdown', (e) => {
    if (st.playing) return;
    const r = view.getBoundingClientRect();
    const k = PW / r.width;
    const px = (e.clientX - r.left) * k;
    const py = (e.clientY - r.top) * k;
    let hit = null;
    for (let i = boxes.length - 1; i >= 0; i--) {
      const b = boxes[i];
      if (px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h) {
        hit = b;
        break;
      }
    }
    if (!hit) {
      if (st.sel) select(null);
      return;
    }
    e.preventDefault();
    if (st.sel !== hit.id) select(hit.id);
    const c = sel();
    if (!c) return;
    const ox = c.x;
    const oy = c.y;
    let moved = false;
    try { view.setPointerCapture(e.pointerId); } catch (err) { console.error(err); }
    const mv = (ev) => {
      if (!moved) {
        if (Math.hypot(ev.clientX - e.clientX, ev.clientY - e.clientY) < 3) return;
        moved = true;
        mark();
      }
      let nx = ox + ((ev.clientX - e.clientX) * k) / PW;
      let ny = oy + ((ev.clientY - e.clientY) * k) / PH;
      guide = { x: false, y: false };
      if (st.snap && Math.abs(nx - 0.5) < 0.015) { nx = 0.5; guide.x = true; }
      if (st.snap && Math.abs(ny - 0.5) < 0.015) { ny = 0.5; guide.y = true; }
      c.x = clamp(nx, -0.5, 1.5);
      c.y = clamp(ny, -0.5, 1.5);
      paint();
    };
    const up = () => {
      view.removeEventListener('pointermove', mv);
      view.removeEventListener('pointerup', up);
      view.removeEventListener('pointercancel', up);
      guide = null;
      if (moved) commit();
      else paint();
    };
    view.addEventListener('pointermove', mv);
    view.addEventListener('pointerup', up);
    view.addEventListener('pointercancel', up);
  });

  inspBody.addEventListener('input', onInspInput);
  inspBody.addEventListener('change', (e) => {
    if (!e.target.dataset.k) return;
    typing = false;
    save();
    const c = sel();
    if (c && e.target.dataset.k === 'text') refreshClip(c);
  });
  inspBody.addEventListener('click', onInspClick);

  document.addEventListener('pointerdown', (e) => {
    const r = e.target.closest?.('.ios-range');
    if (r) r.classList.add('is-dragging');
    unlock();
  });
  const release = () => $$('.ios-range.is-dragging').forEach((r) => r.classList.remove('is-dragging'));
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  document.addEventListener('keydown', onKey);
  document.addEventListener('gesturestart', (e) => e.preventDefault());

  let dragN = 0;
  const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes('Files');
  window.addEventListener('dragenter', (e) => {
    if (!hasFiles(e)) return;
    dragN++;
    document.body.classList.add('dropping');
  });
  window.addEventListener('dragleave', (e) => {
    if (!hasFiles(e)) return;
    dragN--;
    if (dragN <= 0) {
      dragN = 0;
      document.body.classList.remove('dropping');
    }
  });
  window.addEventListener('dragover', (e) => { if (hasFiles(e)) e.preventDefault(); });
  window.addEventListener('drop', (e) => {
    dragN = 0;
    document.body.classList.remove('dropping');
    const fs = [...(e.dataTransfer?.files || [])];
    if (!fs.length) return;
    e.preventDefault();
    addFiles(fs);
  });

  document.addEventListener('visibilitychange', () => { if (document.hidden && st.playing) pause(); });
  window.addEventListener('pagehide', () => {
    clearTimeout(saveT);
    saveNow();
  });
  window.addEventListener('resize', () => requestAnimationFrame(() => $$('.ios-range').forEach(syncRangeFill)));
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => { fitView(); paint(); }).observe($('#screen'));
    new ResizeObserver(() => {
      HW = readHW();
      sizeTL();
      movePh();
    }).observe(tlView);
  }
};

const load = async () => {
  try {
    navigator.storage?.persist?.().catch(() => {});
    const [ms, pj] = await Promise.all([getAll('media'), getOne('proj', 'cur')]);
    (ms || []).forEach((r) => { if (r?.blob) addLib(r); });
    if (pj && Array.isArray(pj.tracks) && pj.tracks.length) {
      st.tracks = pj.tracks;
      st.clips = (pj.clips || []).filter((c) => c.type === 'text' || mm.has(c.media)).map((c) => mkClip(c));
      setRatio(pj.ratio);
    }
    st.clips.filter((c) => c.type === 'text').forEach(fontsFor);
  } catch (err) {
    console.error('讀取專案失敗', err);
    toast('無法讀取上次的專案');
  }
};

const init = async () => {
  $$('i[data-ic]').forEach((i) => { if (i.dataset.ic) i.innerHTML = ic(i.dataset.ic); });
  initGlobalTip();
  attachUiScrollbar($('#side .host'), sideView);
  attachUiScrollbar($('#insp .host'), inspBody);
  attachUiScrollbar($('.tl .host'), tlView);
  HW = readHW();
  st.tracks = freshTracks();
  setRatio('16:9');
  bind();
  await load();
  renderSide();
  renderTL();
  renderInsp();
  updTc();
  updateBtns();
  syncRangeFill(zoom);
  syncMedia();
  paint();
};

init().catch((err) => console.error('初始化失敗', err));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch((err) => console.error('Service Worker 註冊失敗', err));
  });
}

const footer = document.getElementById('aki-footer');
if (footer) {
    const text = footer.textContent;
    footer.textContent = '';
    const spans = [];
    for (const char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        if (char === ' ') span.style.width = '0.5em';
        span.className = 'char-span';
        footer.appendChild(span);
        spans.push(span);
    }

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        spans.forEach(span => {
            const rect = span.getBoundingClientRect();
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;
            const distX = mouseX - charX;
            const distY = mouseY - charY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            const maxDist = 60;

            if (distance < maxDist) {
                const force = (maxDist - distance) / maxDist;
                const moveX = -(distX / distance) * force * 10;
                const moveY = -(distY / distance) * force * 10;
                span.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                span.style.transform = 'translate(0, 0)';
            }
        });
    });
}
