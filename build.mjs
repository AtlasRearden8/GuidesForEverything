#!/usr/bin/env node
/**
 * Guides for Everything — Markdown → print-ready PDF manuals.
 *
 *   node build.mjs                 build every manual in content/
 *   node build.mjs claude-code     build one manual (by slug = file name)
 *   node build.mjs --list          list manuals
 *   node build.mjs --html          also keep the intermediate HTML in output/
 *
 * Pipeline: content/<slug>.md → (front matter + Markdown extensions) → HTML
 * → templates/manual.html + styles/manual.css → Paged.js pagination inside
 * headless Chromium (Playwright) → output/<slug>.pdf
 *
 * Browser: Playwright's bundled Chromium by default. To use an installed
 * browser instead set BROWSER_CHANNEL=msedge (or chrome), or CHROME_PATH to an
 * executable.
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { Marked } from 'marked';
import hljs from 'highlight.js';
import { chromium } from 'playwright';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.join(ROOT, 'content');
const OUTPUT = path.join(ROOT, 'output');
const TEMPLATE = path.join(ROOT, 'templates', 'manual.html');

/* ------------------------------------------------------------------ utils */

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const stripTags = (s) => String(s).replace(/<[^>]*>/g, '');

function slugify(text, used) {
  let base =
    stripTags(text)
      .toLowerCase()
      .replace(/&[a-z]+;/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

/** Parse a trailing `{#id .class .class2}` attribute block from heading text. */
function splitAttrs(raw) {
  const m = raw.match(/\s*\{([^}]*)\}\s*$/);
  if (!m) return { text: raw, id: null, classes: [] };
  const attrs = m[1].trim().split(/\s+/);
  return {
    text: raw.slice(0, m.index),
    id: (attrs.find((a) => a.startsWith('#')) || '').slice(1) || null,
    classes: attrs.filter((a) => a.startsWith('.')).map((a) => a.slice(1)),
  };
}

const ICONS = {
  note: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6M12 7.2v.1"/></svg>',
  tip: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/></svg>',
  important: '<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg>',
  warning: '<svg viewBox="0 0 24 24"><path d="M12 3.5L2.5 20h19z"/><path d="M12 10v4.5M12 17.2v.1"/></svg>',
  caution: '<svg viewBox="0 0 24 24"><path d="M8.2 3h7.6L21 8.2v7.6L15.8 21H8.2L3 15.8V8.2z"/><path d="M12 7.5v5.5M12 16.2v.1"/></svg>',
  example: '<svg viewBox="0 0 24 24"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/></svg>',
};
const CALLOUT_LABELS = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Danger',
  danger: 'Danger',
  example: 'Example',
};

/* --------------------------------------------------------- inline syntax */

/**
 * Inline extensions applied to rendered HTML text (outside code):
 *   {{Free}} {{Freemium}} {{Paid}} {{any label}}  → pricing / status badge
 *   [[Settings > Privacy > Data]]                → menu-path chips
 */
function inlineExtensions(html) {
  // Leave code untouched.
  const parts = html.split(/(<code[\s\S]*?<\/code>|<pre[\s\S]*?<\/pre>)/g);
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part;
      part = smartQuotes(part);
      return part
        .replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, label) => {
          const cls = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return `<span class="badge badge-${cls}">${label}</span>`;
        })
        .replace(/\[\[([^\]]+?)\]\]/g, (_, p) => {
          const steps = p.split(/\s*(?:&gt;|>|›)\s*/).filter(Boolean);
          return (
            '<span class="menu">' +
            steps.map((s) => `<span class="menu-item">${s}</span>`).join('<span class="menu-sep">›</span>') +
            '</span>'
          );
        });
    })
    .join('');
}

/** Curly quotes and apostrophes in text nodes only (never inside tags). */
function smartQuotes(html) {
  return html
    .split(/(<[^>]*>)/g)
    .map((seg, i) => {
      if (i % 2 === 1) return seg;
      return seg
        .replace(/&quot;|&#34;/g, '"')
        .replace(/&#39;|&#x27;/g, "'")
        .replace(/(^|[\s(\[{—–\/])"/g, '$1“')
        .replace(/"/g, '”')
        .replace(/(^|[\s(\[{—–\/])'/g, '$1‘')
        .replace(/'/g, '’');
    })
    .join('');
}

/* ------------------------------------------------------ Markdown → HTML */

function renderManual(markdown, meta) {
  const usedIds = new Set();
  const toc = []; // { level, text, id, number }
  let chapterNo = 0;
  let sectionNo = 0;
  const numbered = meta.numbered !== false;

  const marked = new Marked({ gfm: true });

  marked.use({
    renderer: {
      heading({ depth, text }) {
        const { text: rawText, id: wantedId, classes } = splitAttrs(text);
        // Re-render inline content of the cleaned heading text.
        const inner = this.parser.parseInline(marked.Lexer.lexInline(rawText));
        const id = wantedId || slugify(rawText, usedIds);
        if (wantedId) usedIds.add(wantedId);
        const unnumbered = classes.includes('unnumbered') || !numbered;

        if (depth === 1) {
          sectionNo = 0;
          let number = null;
          if (!unnumbered) number = ++chapterNo;
          toc.push({ level: 1, text: inner, id, number });
          const label = number ? `<span class="chapter-label">Chapter ${number}</span>` : '';
          return `</section><section class="chapter${unnumbered ? ' chapter-unnumbered' : ''}${meta.chapter_break === false ? ' flow' : ''}" id="ch-${id}">\n<h1 id="${id}" class="chapter-title ${classes.join(' ')}" data-chapter="${escapeHtml(stripTags(inner))}">${label}<span class="chapter-name">${inner}</span></h1>\n`;
        }
        if (depth === 2) {
          const inNumberedChapter = toc.length && toc.filter((t) => t.level === 1).at(-1)?.number;
          let number = null;
          if (inNumberedChapter && !classes.includes('unnumbered')) number = `${chapterNo}.${++sectionNo}`;
          toc.push({ level: 2, text: inner, id, number });
          const num = number ? `<span class="sec-num">${number}</span>` : '';
          return `<h2 id="${id}" class="${classes.join(' ')}">${num}${inner}</h2>\n`;
        }
        return `<h${depth} id="${id}" class="${classes.join(' ')}">${inner}</h${depth}>\n`;
      },

      code({ text, lang }) {
        const [language, ...flags] = (lang || '').trim().split(/\s+/);
        const title = flags.join(' ').replace(/^title=/, '').replace(/^"|"$/g, '');
        let body;
        if (language && hljs.getLanguage(language)) {
          body = hljs.highlight(text, { language, ignoreIllegals: true }).value;
        } else {
          body = escapeHtml(text);
        }
        const labels = {
          bash: 'Terminal', sh: 'Terminal', shell: 'Terminal', zsh: 'Terminal',
          powershell: 'PowerShell', ps1: 'PowerShell', cmd: 'Command Prompt',
          json: 'JSON', jsonc: 'JSON', yaml: 'YAML', yml: 'YAML', toml: 'TOML',
          js: 'JavaScript', javascript: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript',
          python: 'Python', py: 'Python', html: 'HTML', css: 'CSS', md: 'Markdown', markdown: 'Markdown',
          text: 'Text', plaintext: 'Text', ini: 'Config', env: '.env', diff: 'Diff', sql: 'SQL', prompt: 'Prompt',
        };
        const label = title || labels[language] || (language ? language.toUpperCase() : '');
        const lines = text.split('\n').length;
        const size = lines <= 18 ? 'short' : 'long';
        return `<figure class="code code-${size} lang-${escapeHtml(language || 'none')}">${
          label ? `<figcaption>${escapeHtml(label)}</figcaption>` : ''
        }<pre><code class="hljs">${body}</code></pre></figure>\n`;
      },

      blockquote({ tokens }) {
        const html = this.parser.parse(tokens);
        const m = html.match(/^\s*<p>\[!(\w+)\][ \t]*([^\n<]*)(?:\n|<br>)?/i);
        if (!m) return `<blockquote>${html}</blockquote>\n`;
        const kind = m[1].toLowerCase() === 'danger' ? 'caution' : m[1].toLowerCase();
        const title = m[2].trim() || CALLOUT_LABELS[kind] || kind;
        let body = '<p>' + html.slice(m[0].length);
        body = body.replace(/^<p>\s*<\/p>/, '');
        return `<aside class="callout callout-${kind}"><div class="callout-head"><span class="callout-icon">${
          ICONS[kind] || ICONS.note
        }</span><span class="callout-title">${title}</span></div><div class="callout-body">${body}</div></aside>\n`;
      },

      table(token) {
        // Use marked's default table rendering, wrapped for styling.
        const html = marked.Renderer.prototype.table.call(this, token);
        return `<div class="table-wrap">${html}</div>\n`;
      },
    },
  });

  // Container blocks:  :::name [title]  …  :::
  const blocks = [];
  const src = markdown.replace(/\r\n/g, '\n');
  const lines = src.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const open = lines[i].match(/^:::\s*([\w-]+)\s*(.*)$/);
    if (open) {
      const [, name, title] = open;
      const buf = [];
      let depth = 1;
      i++;
      while (i < lines.length) {
        if (/^:::\s*[\w-]+/.test(lines[i])) depth++;
        else if (/^:::\s*$/.test(lines[i])) {
          depth--;
          if (depth === 0) break;
        }
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing :::
      blocks.push({ name, title: title.trim(), body: buf.join('\n') });
      out.push('', `<!--BLOCK:${blocks.length - 1}-->`, '');
      continue;
    }
    out.push(lines[i]);
    i++;
  }

  let html = marked.parse(out.join('\n'));

  const renderBlock = (b) => {
    const titleHtml = b.title ? `<div class="block-title">${marked.parseInline(b.title)}</div>` : '';
    if (b.name === 'glossary') {
      // Term
      // : Definition
      const items = [];
      let cur = null;
      for (const line of b.body.split('\n')) {
        if (/^:\s+/.test(line)) {
          if (cur) cur.def.push(line.replace(/^:\s+/, ''));
        } else if (/^\s{2,}\S/.test(line) && cur) {
          cur.def.push(line.trim());
        } else if (line.trim()) {
          cur = { term: line.trim(), def: [] };
          items.push(cur);
        }
      }
      items.sort((a, b2) => a.term.localeCompare(b2.term, 'en', { sensitivity: 'base' }));
      return `<dl class="glossary">${items
        .map((it) => `<div class="gl-item"><dt>${marked.parseInline(it.term)}</dt><dd>${marked.parse(it.def.join(' '))}</dd></div>`)
        .join('')}</dl>`;
    }
    const inner = marked.parse(b.body);
    if (b.name === 'steps') {
      return `<div class="steps-block">${titleHtml}${inner.replace(/<ol(\s[^>]*)?>/, '<ol class="steps"$1>')}</div>`;
    }
    return `<div class="block block-${b.name}">${titleHtml}${inner}</div>`;
  };
  html = html.replace(/<!--BLOCK:(\d+)-->/g, (_, n) => renderBlock(blocks[Number(n)]));
  // Steps: turn a leading **bold** phrase of each step into a step title.
  html = html.replace(/<ol class="steps"[\s\S]*?<\/ol>/g, (ol) =>
    ol.replace(/<li>(\s*<p>)?\s*<strong>([\s\S]*?)<\/strong>(\s*(?:[—–:-]\s*|<br>\s*)?)/g, (m, p, t, sep) => {
      // A bold phrase that is a complete sentence becomes a block step title;
      // otherwise it stays inline so the sentence reads naturally.
      const isTitle = /[.:!?]["”’)\]]*\s*$/.test(stripTags(t)) || /^[—–:-]/.test(sep.trim());
      return isTitle ? `<li>${p || ''}<span class="step-title">${t}</span> ` : `<li>${p || ''}<span class="step-title step-title-inline">${t}</span>${sep}`;
    }),
  );

  html = inlineExtensions(html);
  html = `<section class="chapter chapter-intro">${html}</section>`.replace(/<section class="chapter chapter-intro">\s*<\/section>/, '');
  return { html, toc };
}

/* ----------------------------------------------------------------- cover */

function hashString(s) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

/** Deterministic geometric cover art, varied per manual. */
function coverArt(slug, motif) {
  const rnd = (() => {
    let x = hashString(slug) || 1;
    return () => ((x = Math.imul(x ^ (x >>> 15), 2246822507) ^ Math.imul(x ^ (x >>> 13), 3266489909)) >>> 0) / 4294967296;
  })();
  const W = 816, H = 600;
  const parts = [];
  const style = motif || ['orbits', 'grid', 'waves', 'blocks'][hashString(slug) % 4];

  if (style === 'orbits') {
    const cx = W * (0.62 + rnd() * 0.12), cy = H * 0.52;
    for (let r = 40; r < 560; r += 34) {
      const o = Math.max(0.08, 0.9 - r / 620);
      parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--accent)" stroke-width="${r % 68 === 40 ? 2.2 : 1}" opacity="${o.toFixed(2)}"/>`);
    }
    for (let k = 0; k < 9; k++) {
      const r = 74 + Math.floor(rnd() * 14) * 34, a = rnd() * Math.PI * 2;
      parts.push(`<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="${(5 + rnd() * 9).toFixed(1)}" fill="${k % 3 ? 'var(--accent)' : 'var(--accent-2)'}"/>`);
    }
    parts.push(`<circle cx="${cx}" cy="${cy}" r="30" fill="var(--accent)"/>`);
  } else if (style === 'grid') {
    const s = 34;
    for (let y = s; y < H; y += s)
      for (let x = s; x < W; x += s) {
        const d = Math.hypot(x - W * 0.75, y - H * 0.45) / 520;
        const v = rnd();
        if (v > 0.9 - (1 - d) * 0.35) parts.push(`<rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="4" fill="${v > 0.97 ? 'var(--accent-2)' : 'var(--accent)'}" opacity="${Math.max(0.15, 1 - d).toFixed(2)}"/>`);
        else parts.push(`<circle cx="${x}" cy="${y}" r="1.6" fill="var(--accent)" opacity="${Math.max(0.12, 0.7 - d).toFixed(2)}"/>`);
      }
  } else if (style === 'waves') {
    for (let k = 0; k < 22; k++) {
      const y0 = 60 + k * 24, amp = 20 + rnd() * 40, ph = rnd() * 6;
      let d = `M -10 ${y0}`;
      for (let x = 0; x <= W + 20; x += 16) d += ` L ${x} ${(y0 + Math.sin(x / 90 + ph + k * 0.25) * amp * (x / W)).toFixed(1)}`;
      parts.push(`<path d="${d}" fill="none" stroke="${k % 5 === 2 ? 'var(--accent-2)' : 'var(--accent)'}" stroke-width="${k % 5 === 2 ? 3 : 1.4}" opacity="${(0.25 + (k / 22) * 0.75).toFixed(2)}"/>`);
    }
  } else {
    // blocks
    let x = 300;
    while (x < W) {
      const w = 40 + rnd() * 110;
      let y = 40 + rnd() * 120;
      while (y < H - 20) {
        const h = 30 + rnd() * 160;
        const c = rnd();
        parts.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(w - 10).toFixed(1)}" height="${(h - 10).toFixed(1)}" rx="6" fill="${c > 0.8 ? 'var(--accent-2)' : 'var(--accent)'}" opacity="${(0.2 + c * 0.8).toFixed(2)}"/>`);
        y += h;
      }
      x += w;
    }
  }
  return `<svg class="cover-art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${parts.join('')}</svg>`;
}

/* --------------------------------------------------------------- template */

function buildToc(toc, depth) {
  const items = [];
  let open = false;
  for (const t of toc) {
    if (t.level === 1) {
      if (open) items.push('</ol></li>');
      const num = t.number ? `<span class="toc-num">${String(t.number).padStart(2, '0')}</span>` : '<span class="toc-num"></span>';
      items.push(`<li class="toc-chapter"><a href="#${t.id}">${num}<span class="toc-text">${smartQuotes(t.text)}</span><span class="toc-fill"></span></a><ol>`);
      open = true;
    } else if (t.level === 2 && depth >= 2) {
      const num = t.number ? `<span class="toc-snum">${t.number}</span>` : '';
      items.push(`<li class="toc-section"><a href="#${t.id}">${num}<span class="toc-text">${smartQuotes(t.text)}</span><span class="toc-fill"></span></a></li>`);
    }
  }
  if (open) items.push('</ol></li>');
  return `<ol class="toc-list">${items.join('')}</ol>`;
}

function fill(template, vars) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (k in vars ? vars[k] : ''));
}

function manualHtml(slug, file) {
  const raw = fs.readFileSync(file, 'utf8');
  const { data: meta, content } = matter(raw);
  const { html, toc } = renderManual(content, meta);
  const template = fs.readFileSync(TEMPLATE, 'utf8');
  const accent = meta.accent || '#D97757';
  const accent2 = meta.accent2 || '#1F6FEB';
  const series = meta.series || 'Guides for Everything';
  const vars = {
    slug,
    title: escapeHtml(meta.title || slug),
    title_html: meta.title_html || escapeHtml(meta.title || slug),
    subtitle: escapeHtml(meta.subtitle || ''),
    kicker: escapeHtml(meta.kicker || 'A Beginner’s Manual'),
    series: escapeHtml(series),
    volume: meta.volume ? `Vol. ${String(meta.volume).padStart(2, '0')}` : '',
    edition: escapeHtml(meta.edition || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })),
    audience: escapeHtml(meta.audience || 'For complete beginners'),
    blurb: meta.blurb ? marked(meta.blurb) : '',
    accent,
    accent2,
    cover_theme: meta.cover === 'light' ? 'light' : 'dark',
    cover_art: coverArt(slug, meta.motif),
    chapter_break: meta.chapter_break === false ? 'no-chapter-break' : 'chapter-break',
    toc: buildToc(toc, meta.toc_depth ?? 2),
    toc_class: (meta.toc_depth ?? 2) >= 2 ? 'toc-deep' : 'toc-shallow',
    body: html,
    disclaimer: escapeHtml(
      meta.disclaimer ||
        `Facts, prices, and menu paths were checked against official documentation in ${meta.edition || 'the edition month'}. Software changes quickly — when something on screen doesn’t match, trust the product’s current docs.`,
    ),
  };
  return fill(template, vars);
}

// `marked` default export shim for blurb rendering.
function marked(md) {
  return new Marked({ gfm: true }).parse(md);
}

/* ---------------------------------------------------------------- server */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

function startServer(pages) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (pages.has(url)) {
      res.writeHead(200, { 'content-type': MIME['.html'] });
      return res.end(pages.get(url));
    }
    const fp = path.join(ROOT, url);
    if (!fp.startsWith(ROOT) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
      res.writeHead(404);
      return res.end('not found');
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(fp)] || 'application/octet-stream' });
    fs.createReadStream(fp).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

/* ------------------------------------------------------------------ main */

async function main() {
  const args = process.argv.slice(2);
  const keepHtml = args.includes('--html');
  const all = fs
    .readdirSync(CONTENT)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort();

  if (args.includes('--list')) {
    for (const s of all) {
      const { data } = matter(fs.readFileSync(path.join(CONTENT, `${s}.md`), 'utf8'));
      console.log(`${s.padEnd(28)} ${data.title || ''}`);
    }
    return;
  }

  const wanted = args.filter((a) => !a.startsWith('--')).map((a) => a.replace(/\.md$/, '').replace(/^content\//, ''));
  const slugs = wanted.length ? wanted : all;
  for (const s of slugs) if (!fs.existsSync(path.join(CONTENT, `${s}.md`))) throw new Error(`No manual named "${s}" in content/ (have: ${all.join(', ')})`);

  fs.mkdirSync(OUTPUT, { recursive: true });
  const pages = new Map();
  const server = await startServer(pages);
  const base = `http://127.0.0.1:${server.address().port}`;

  const launch = { headless: true };
  if (process.env.BROWSER_CHANNEL) launch.channel = process.env.BROWSER_CHANNEL;
  if (process.env.CHROME_PATH) launch.executablePath = process.env.CHROME_PATH;
  const browser = await chromium.launch(launch);

  try {
    for (const slug of slugs) {
      const t0 = Date.now();
      const html = manualHtml(slug, path.join(CONTENT, `${slug}.md`));
      const route = `/__render/${slug}.html`;
      pages.set(route, html);
      if (keepHtml) fs.writeFileSync(path.join(OUTPUT, `${slug}.html`), html);

      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      await page.goto(base + route, { waitUntil: 'load' });
      await page.waitForFunction(() => window.__pagedDone === true, null, { timeout: 300_000 });
      const pageCount = await page.evaluate(() => document.querySelectorAll('.pagedjs_page').length);
      const pdfPath = path.join(OUTPUT, `${slug}.pdf`);
      await page.pdf({
        path: pdfPath,
        preferCSSPageSize: true,
        printBackground: true,
        outline: true,
        tagged: true,
      });
      await page.close();
      if (errors.length) console.warn(`  ! ${slug}: ${errors.length} browser message(s):\n    ${errors.slice(0, 5).join('\n    ')}`);
      console.log(`✓ ${slug.padEnd(26)} ${String(pageCount).padStart(3)} pages  ${((Date.now() - t0) / 1000).toFixed(1)}s  → output/${slug}.pdf`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
