/**
 * MAISON LUMIÈRE — Dynamic Journal Detail Renderer
 * Reads ?post=<slug> from the URL, renders that article's content into the
 * detail page template. Falls back to the tourbillon article when no or an
 * invalid slug is provided.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const posts = window.ML_BLOG_POSTS;
    if (!posts) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('post');
    const post = posts[slug] || posts.tourbillon;

    render(post);
  });

  function esc(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render(post) {
    document.title = post.title + ' | Maison Lumière Journal';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', post.metaExcerpt || post.title);

    renderHero(post);
    renderBody(post);
    renderAuthor(post);
    renderQuote(post);
    renderCurator(post);
    renderSidebar(post);
    renderRelated(post);

    if (typeof initScrollReveal === 'function') initScrollReveal();
  }

  /* ── SECTION 1: HERO ── */
  function renderHero(post) {
    const img = document.getElementById('detail-hero-img');
    if (img) { img.src = post.heroImg; img.alt = post.heroAlt; }

    const tag = document.getElementById('detail-hero-tag');
    if (tag) tag.textContent = post.tag;

    const title = document.getElementById('detail-hero-title');
    if (title) title.textContent = post.title;

    const meta = document.getElementById('detail-hero-meta');
    if (meta) meta.innerHTML =
      `<span>${esc(post.author)}</span>` +
      `<span aria-hidden="true">·</span>` +
      `<time datetime="${esc(post.isoDate)}">${esc(post.date)}</time>` +
      `<span aria-hidden="true">·</span>` +
      `<span>${esc(post.readTime)}</span>`;
  }

  /* ── SECTION 2: ARTICLE BODY ── */
  function renderBody(post) {
    const container = document.getElementById('article-body');
    if (!container) return;

    const blocks = post.body.map(block => {
      switch (block.type) {
        case 'h2':
          return `<h2>${esc(block.text)}</h2>`;
        case 'blockquote':
          return `<blockquote>${esc(block.text)}</blockquote>`;
        case 'figure':
          return (
            `<figure>` +
              `<img src="${esc(block.src)}" alt="${esc(block.alt)}" class="zoom-container" data-lightbox="${esc(block.src)}" loading="lazy">` +
              `<figcaption>${esc(block.caption)}</figcaption>` +
            `</figure>`
          );
        default:
          return `<p>${esc(block.text)}</p>`;
      }
    }).join('');

    const tags = post.tags
      .map(tag => `<a href="blog.html" class="article-tag">${esc(tag)}</a>`)
      .join('');

    container.innerHTML =
      blocks +
      `<div class="article-tags" aria-label="Article tags">` + tags + `</div>`;
  }

  /* ── SECTION 2: AUTHOR CARD ── */
  function renderAuthor(post) {
    const container = document.getElementById('author-card');
    if (!container) return;

    container.innerHTML =
      `<div class="author-card reveal delay-1">` +
        `<div class="author-avatar" style="overflow:hidden">` +
          `<img src="${esc(post.authorImg)}" alt="${esc(post.author)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">` +
        `</div>` +
        `<div>` +
          `<p style="font-size:0.7rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--champagne-dark);margin-bottom:0.5rem">About the Author</p>` +
          `<h3 style="font-family:var(--font-display);font-size:1.25rem;margin-bottom:0.5rem">${esc(post.author)}</h3>` +
          `<p style="font-size:0.875rem;color:var(--text-muted);line-height:1.65">${esc(post.authorBio)}</p>` +
        `</div>` +
      `</div>`;
  }

  /* ── SECTION 3: PULL QUOTE ── */
  function renderQuote(post) {
    const container = document.getElementById('pull-quote');
    if (!container) return;

    container.innerHTML =
      `<p style="font-family:var(--font-display);font-size:clamp(1.5rem,3.5vw,2.5rem);font-style:italic;color:var(--ivory);line-height:1.35">${esc(post.quote)}</p>` +
      `<p style="margin-top:1.5rem;font-size:0.75rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--champagne-dark)">— ${esc(post.quoteBy)}</p>`;
  }

  /* ── SIDEBAR: PRIVATE ENQUIRY CARD ── */
  function renderSidebar(post) {
    const title = document.getElementById('detail-sidebar-title');
    const text  = document.getElementById('detail-sidebar-text');
    if (!title || !text) return;

    const topic = post.tags.length ? post.tags[0] : post.tag;
    title.textContent = 'Interested in ' + topic + '?';
    text.textContent = 'Our specialists can arrange a private viewing of available ' +
      topic.toLowerCase() + ' pieces — including rare references not listed publicly.';
  }

  function renderCurator(post) {
    const container = document.getElementById('curator-section');
    if (!container) return;
    const c = post.curator;

    const stats = c.stats.map(stat =>
      `<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center">` +
        `<p style="font-family:var(--font-display);font-size:2.5rem;font-weight:700;color:var(--champagne-dark)">${esc(stat.value)}</p>` +
        `<p style="font-size:0.7rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-muted)">${esc(stat.label)}</p>` +
      `</div>`
    ).join('');

    container.innerHTML =
      `<div class="responsive-split">` +
        `<div class="reveal-left">` +
          `<span class="eyebrow">${esc(c.eyebrow)}</span>` +
          `<h2 style="font-family:var(--font-display);font-size:clamp(1.75rem,3vw,2.5rem);margin-top:1rem;margin-bottom:1rem">${esc(c.name)}<br><em style="font-style:italic">${esc(c.surname)}</em></h2>` +
          `<p style="color:var(--text-muted);line-height:1.75;margin-bottom:1.5rem">${esc(c.bio)}</p>` +
          `<div style="display:flex;gap:0.75rem">` +
            `<a href="blog.html" class="btn btn--teal btn--sm"><span>More Articles</span></a>` +
            `<a href="about.html" class="btn btn--outline btn--sm"><span>About the Maison</span></a>` +
          `</div>` +
        `</div>` +
        `<div class="reveal-right responsive-grid-2">` + stats + `</div>` +
      `</div>`;
  }

  /* ── SECTION 5: RELATED ARTICLES ── */
  function renderRelated(post) {
    const container = document.getElementById('related-grid');
    if (!container) return;
    const posts = window.ML_BLOG_POSTS;

    const cards = (post.related || [])
      .map(slug => posts[slug])
      .filter(Boolean)
      .map((p, i) =>
        `<a href="blog-detail.html?post=${esc(p.slug)}" class="blog-card reveal delay-${i + 1}">` +
          `<div class="blog-card__media"><img src="${esc(p.heroImg)}" alt="${esc(p.heroAlt)}" loading="lazy"></div>` +
          `<div class="blog-card__body">` +
            `<span class="blog-card__tag">${esc(p.tag)}</span>` +
            `<h3 class="blog-card__title">${esc(p.title)}</h3>` +
            `<div class="blog-card__meta"><span>${esc(p.author)}</span><div class="blog-card__meta-dot"></div><span>${esc(p.date)}</span></div>` +
          `</div>` +
        `</a>`
      ).join('');

    container.innerHTML = cards;
  }
})();