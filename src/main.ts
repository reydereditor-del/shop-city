import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/bricolage-grotesque/700.css';
import './style.css';

type Product = { name: string; color: string; price: number; image: string; description: string; sizes: string[] };
type Concept = { key: string; route: string; name: string; headline: string; intro: string; caption: string; heroAlt: string; products: Product[] };

const concepts: Concept[] = [
  {
    key: 'frame', route: 'frame-noir', name: 'Frame / Noir', headline: 'Cut after dark',
    intro: 'A study in volume, sharp shoulders and the clothes that hold their shape.',
    caption: 'The evening edit', heroAlt: 'Side-lit model in a charcoal jacket against a plum studio wall',
    products: [
      { name: 'Sculpted jacket', color: 'Charcoal', price: 749000, image: 'one', description: 'An oversized shoulder and a straight hem define the silhouette.', sizes: ['S', 'M', 'L'] },
      { name: 'Pleated trouser', color: 'Black', price: 389000, image: 'two', description: 'A deep front pleat opens into a wide, straight leg.', sizes: ['S', 'M', 'L'] },
      { name: 'Fine knit top', color: 'Ink', price: 239000, image: 'three', description: 'A fine-gauge layer with a close neckline and a neat cuff.', sizes: ['S', 'M', 'L'] },
    ],
  },
  {
    key: 'studio', route: 'studio-object', name: 'Studio / Object', headline: 'A closer look',
    intro: 'Start with the shape. Look closer at the seams, the grain and the way it falls.',
    caption: 'The material edit', heroAlt: 'Sage twill jacket photographed against a cool gray studio backdrop',
    products: [
      { name: 'Twill chore jacket', color: 'Sage', price: 489000, image: 'hero', description: 'A straight-cut jacket with topstitched seams and practical patch pockets.', sizes: ['S', 'M', 'L'] },
      { name: 'Everyday overshirt', color: 'Stone', price: 369000, image: 'two', description: 'An easy shirt cut with room for a light layer underneath.', sizes: ['S', 'M', 'L'] },
      { name: 'Petrol crewneck', color: 'Petrol', price: 319000, image: 'three', description: 'A relaxed knit with a ribbed neck and cuffs.', sizes: ['S', 'M', 'L'] },
    ],
  },
  {
    key: 'city', route: 'city-edit', name: 'City / Edit', headline: 'Between addresses',
    intro: 'Workwear shapes, blue denim and easy layers in the space between destinations.',
    caption: 'The street edit', heroAlt: 'Two models wearing cobalt and indigo in a concrete pedestrian passage',
    products: [
      { name: 'Transit overshirt', color: 'Cobalt', price: 429000, image: 'one', description: 'A roomy workwear layer with two front patch pockets.', sizes: ['S', 'M', 'L'] },
      { name: 'Straight denim', color: 'Indigo', price: 379000, image: 'two', description: 'A straight leg and dark rinse give this sample jean its clean line.', sizes: ['28', '30', '32'] },
      { name: 'Canvas shoulder bag', color: 'Asphalt', price: 219000, image: 'three', description: 'A compact canvas bag with a short adjustable strap.', sizes: ['One size'] },
    ],
  },
];

const frame = concepts[0];
const hybrid: Concept = {
  key: 'hybrid', route: 'hybrid', name: 'Hybrid', headline: 'Study in charcoal',
  intro: 'A sculpted shoulder, seen first in shadow and then in the light.',
  caption: 'The studio rail', heroAlt: frame.heroAlt, products: frame.products,
};
concepts.push(hybrid);

const formatUZS = new Intl.NumberFormat('en-US');
const priceLabel = (price: number) => formatUZS.format(price).replaceAll(',', ' ') + ' UZS';
const image = (concept: Concept, slot: string, alt: string, priority = false) =>
  `<img src="/media/${concept.key === 'hybrid' ? 'frame' : concept.key}-${slot}.webp" alt="${alt}" width="768" height="512" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const route = (concept: Concept) => '/concepts/' + concept.route;
const current = concepts.find((concept) => route(concept) === location.pathname.replace(/\/$/, ''));
const app = document.querySelector<HTMLDivElement>('#app')!;

function header(concept?: Concept) {
  return `<a class="skip" href="#main">Skip to content</a>
    <header class="masthead"><a class="wordmark" href="/">SHOP CITY</a>
    <span class="demo">Concept demo</span>
    <nav aria-label="Page navigation">${concept ? '<a href="#collection">Shop</a><a href="#editorial">Editorial</a>' : ''}<a href="/#concepts">Concepts</a></nav></header>`;
}

function footer(concept?: Concept) {
  return `<footer><span>Independent concept demo · fictional products and prices</span>
    <nav aria-label="All concepts">${concepts.map((item) => `<a href="${route(item)}"${concept === item ? ' aria-current="page"' : ''}>${item.name}</a>`).join('')}</nav></footer>`;
}

function hero(concept: Concept) {
  const copy = (cta: string) => `<div class="hero-copy"><p class="eyebrow">${concept.name}</p>
    <h1>${concept.headline}</h1><p class="intro">${concept.intro}</p><a class="cta" href="#collection">${cta} <span aria-hidden="true">↘</span></a></div>`;
  const photo = `<figure class="hero-photo">${image(concept, 'hero', concept.heroAlt, true)}</figure>`;
  if (concept.key === 'hybrid') return `<section class="hero hybrid-hero" aria-labelledby="hybrid-title">
    <figure class="hero-photo">${image(concept, 'hero', concept.heroAlt, true)}</figure>
    <div class="hero-copy"><p class="eyebrow">The charcoal edit</p><h1 id="hybrid-title">Study in <br>charcoal</h1>
      <p class="intro">${concept.intro}</p><a class="cta" href="#collection">Explore the edit <span aria-hidden="true">↘</span></a></div>
    <p class="hybrid-credit">Sculpted jacket <span aria-hidden="true">/</span> Charcoal</p>
    </section>`;
  if (concept.key === 'frame') return `<section class="hero frame-hero">${photo}${copy('Shop the edit')}</section>`;
  if (concept.key === 'studio') return `<section class="hero studio-hero">${copy('Browse garments')}${photo}
    <figure class="hero-detail">${image(concept, 'one', 'Close view of a topstitched seam on sage twill')}<figcaption>Twill · seam detail</figcaption></figure></section>`;
  return `<section class="hero city-hero">${copy('Shop these looks')}<div class="city-spread">${photo}
    <figure class="city-inset">${image(concept, 'one', 'Cobalt overshirt from the edit')}</figure>
    <nav class="look-index" aria-label="Garments in the edit"><p>In this look</p>
    ${concept.products.map((item, index) => `<a href="#product" data-product="${index}">${item.name} <span aria-hidden="true">↗</span></a>`).join('')}</nav>
    </div></section>`;
}

function editorial(concept: Concept) {
  if (concept.key === 'hybrid') return `<section class="editorial hybrid-editorial" id="editorial" aria-labelledby="light-title">
    <div class="hybrid-editorial-copy"><p class="eyebrow">From campaign to studio</p><h2 id="light-title">See it in light.</h2>
      <p>Side light traces the shoulder. A closer studio view shows how the lapel folds across the front.</p>
      <a href="#product" data-product="0">Inspect the sculpted jacket <span aria-hidden="true">↗</span></a></div>
    <figure class="hybrid-study"><div class="hybrid-study-image">${image(concept, 'one', 'Close studio view showing the jacket’s layered lapel and shoulder')}</div>
      <figcaption>Studio view · Sculpted jacket</figcaption></figure></section>`;
  if (concept.key === 'frame') return `<section class="editorial frame-editorial" id="editorial"><p class="eyebrow">The evening edit</p><h2>Shape, then shadow.</h2><p>A jacket with an emphatic shoulder. A straight line through the trouser. Three pieces built around silhouette.</p></section>`;
  if (concept.key === 'studio') return `<section class="editorial studio-editorial" id="editorial"><p class="eyebrow">The material edit</p><h2>Read the garment.</h2><p>Start with the straight cut of the jacket, then follow the topstitching along the edge. What you see here carries through to the product gallery.</p><a href="#product" data-product="0">Inspect the chore jacket <span aria-hidden="true">↗</span></a></section>`;
  return `<section class="editorial city-editorial" id="editorial"><p class="eyebrow">The street edit</p><h2>The blue layer.</h2><p>A cobalt overshirt gives dark denim a clear edge. The outfit breaks down into three garments you can browse individually.</p></section>`;
}

function collection(concept: Concept) {
  return `<section class="collection" id="collection" aria-labelledby="collection-title">
    <div class="section-heading"><h2 id="collection-title">${concept.caption}</h2><span>3 sample pieces</span></div>
    <ul class="product-grid">${concept.products.map((item, index) => `<li><a class="card" href="#product" data-product="${index}">
    <figure>${image(concept, item.image, '')}</figure><div class="card-meta"><h3>${item.name}</h3><p>${priceLabel(item.price)}</p></div><p class="swatch-label">${item.color}</p></a></li>`).join('')}</ul></section>`;
}

function detail(concept: Concept, index: number) {
  const item = concept.products[index];
  const extra = concept.key === 'studio' && index === 0
    ? `<figure class="detail-macro">${image(concept, 'one', 'Topstitching on the sage twill jacket')}</figure>`
    : concept.key === 'hybrid' && index === 0
      ? `<figure class="detail-macro hybrid-macro" aria-hidden="true">${image(concept, 'one', '')}</figure>` : '';
  return `<div class="detail-visual"><figure>${image(concept, item.image, item.name + ' in ' + item.color)}</figure>${extra}</div>
    <div class="detail-copy"><p class="eyebrow">Product preview</p><h2 id="product-title" tabindex="-1">${item.name}</h2>
    <p class="price">${priceLabel(item.price)}</p><p>${item.description}</p>
    <dl><div><dt>Color</dt><dd>${item.color}</dd></div></dl>
    <fieldset><legend>Choose a sample size</legend><div class="sizes">${item.sizes.map((size, position) =>
      `<label><input type="radio" name="size" value="${size}" ${position === 0 ? 'checked' : ''}><span>${size}</span></label>`).join('')}</div></fieldset>
    <p class="status" role="status">${item.sizes[0]} · Sample availability</p>
    <a href="#collection">Back to the edit <span aria-hidden="true">↑</span></a></div>`;
}

if (current) {
  document.title = current.name + ' · SHOP CITY concepts';
  document.body.className = current.key;
  app.innerHTML = header(current) + `<main id="main">${hero(current)}${editorial(current)}${collection(current)}
    <section class="product-detail" id="product" aria-labelledby="product-title">${detail(current, 0)}</section></main>` + footer(current);
  const product = document.querySelector<HTMLElement>('#product')!;
  const showProduct = (index: number) => {
    product.dataset.selected = String(index);
    product.innerHTML = detail(current, index);
    if (location.hash !== '#product') history.pushState(null, '', '#product');
    product.scrollIntoView();
    document.querySelector<HTMLElement>('#product-title')?.focus({ preventScroll: true });
  };
  document.querySelectorAll<HTMLAnchorElement>('[data-product]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      event.preventDefault();
      showProduct(Number(link.dataset.product));
    });
  });
  product.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || event.target.name !== 'size') return;
    product.querySelector<HTMLElement>('.status')!.textContent = event.target.value + ' · Sample availability';
  });
} else {
  app.innerHTML = header() + `<main id="main" class="hub"><p class="eyebrow">Storefront design review</p>
    <h1>Storefront concept studies</h1><div class="hub-grid" id="concepts">
    ${concepts.map((item) => `<a href="${route(item)}">${image(item, 'hero', item.heroAlt)}<h2>${item.name} ↗</h2><p>${item.intro}</p></a>`).join('')}
    </div></main>` + footer();
}
