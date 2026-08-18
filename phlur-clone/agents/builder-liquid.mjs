/**
 * AGENT 4b: CODE BUILDER — Liquid emitter
 * Shopify sections, snippets and JSON templates. Every section carries a
 * {% schema %} so it is editable in the theme customizer.
 */

export function buildLiquid(spec) {
  const f = {};
  const w = (rel, s) => { f[rel] = s; };

  /* ─────────────────────────── SNIPPETS ─────────────────────────── */

  w('snippets/pl-button.liquid', `{%- comment -%}
  Button. Maps to siwa-design-system 'button-primary / secondary / ghost'.
  Geometry measured off phlur.com: 40px tall, 30px inline padding, 12px
  uppercase mono at 0.8px tracking, 0px radius.

  Params:
    label    (string, required)
    href     (string)  renders <a> when present, <button> otherwise
    variant  (string)  primary | inverse | ghost   default: primary
    type     (string)  submit | button             default: button
    full     (boolean) stretch to container
    disabled (boolean)
{%- endcomment -%}

{%- liquid
  assign v = variant | default: 'primary'
  assign classes = 'pl-button pl-button--' | append: v
  if full
    assign classes = classes | append: ' pl-button--full'
  endif
-%}

{%- if href -%}
  <a class="{{ classes }}"
     href="{{ href }}"
     {% if disabled %}aria-disabled="true" tabindex="-1"{% endif %}>
    {{ label }}
  </a>
{%- else -%}
  <button class="{{ classes }}"
          type="{{ type | default: 'button' }}"
          {% if disabled %}disabled{% endif %}>
    {{ label }}
  </button>
{%- endif -%}
`);

  w('snippets/pl-badge.liquid', `{%- comment -%}
  Badge stamp. Maps to siwa-design-system 'badge-stamp'.
  Measured: 19px tall, 4px/6px padding, 11px mono uppercase, 0.7px tracking.

  Params: label (string), variant (default | ink | outline)
{%- endcomment -%}
{%- if label != blank -%}
  <span class="pl-badge pl-badge--{{ variant | default: 'default' }}">{{ label }}</span>
{%- endif -%}
`);

  w('snippets/pl-product-card.liquid', `{%- comment -%}
  Product card. Maps to siwa-design-system 'product-card'.
  Measured: 299x420, 1:1 media on --pl-surface, 0px radius, no shadow.

  Params:
    product      (product, required)
    show_price   (boolean, default true)
    badge        (string) overrides the auto badge
    lazy         (boolean, default true)
{%- endcomment -%}

{%- liquid
  assign auto_badge = badge
  if auto_badge == blank
    if product.available == false
      assign auto_badge = 'Sold out'
    elsif product.compare_at_price > product.price
      assign auto_badge = 'Sale'
    elsif product.tags contains 'new'
      assign auto_badge = 'New'
    elsif product.tags contains 'bestseller'
      assign auto_badge = 'Bestseller'
    endif
  endif
  assign loading = 'lazy'
  if lazy == false
    assign loading = 'eager'
  endif
-%}

<a class="pl-card" href="{{ product.url }}">
  <div class="pl-card__media">
    {%- if auto_badge != blank -%}
      <span class="pl-badge-slot">
        {%- render 'pl-badge', label: auto_badge -%}
      </span>
    {%- endif -%}

    {%- if product.featured_media -%}
      {{ product.featured_media
         | image_url: width: 800
         | image_tag:
             class: 'pl-card__image',
             loading: loading,
             widths: '300,450,600,800',
             sizes: '(max-width: 749px) 62vw, 300px',
             alt: product.featured_media.alt | default: product.title | escape }}
    {%- else -%}
      {{ 'product-1' | placeholder_svg_tag: 'pl-card__image' }}
    {%- endif -%}
  </div>

  <div class="pl-card__body">
    <h3 class="pl-card__title">{{ product.title }}</h3>

    {%- if product.metafields.custom.subtitle -%}
      <p class="pl-card__subtitle">{{ product.metafields.custom.subtitle }}</p>
    {%- elsif product.type != blank -%}
      <p class="pl-card__subtitle">{{ product.type }}</p>
    {%- endif -%}

    {%- if show_price != false -%}
      <p class="pl-card__price">
        {%- if product.compare_at_price > product.price -%}
          <del>{{ product.compare_at_price | money }}</del>
          <span class="pl-card__price--sale">{{ product.price | money }}</span>
        {%- else -%}
          {{ product.price | money }}
        {%- endif -%}
      </p>
    {%- endif -%}
  </div>
</a>
`);

  /* ─────────────────────────── SECTIONS ─────────────────────────── */

  w('sections/pl-hero-banner.liquid', `{{ 'section-hero-banner.css' | asset_url | stylesheet_tag }}
{{ 'component-button.css' | asset_url | stylesheet_tag }}

{%- liquid
  assign align = section.settings.alignment
  assign hero_class = 'pl-hero'
  if align == 'center'
    assign hero_class = hero_class | append: ' pl-hero--center'
  elsif align == 'end'
    assign hero_class = hero_class | append: ' pl-hero--end'
  endif
  if section.settings.text_color == 'dark'
    assign hero_class = hero_class | append: ' pl-hero--dark'
  endif
-%}

<section class="{{ hero_class }}"
         style="--pl-hero-h: {{ section.settings.height }}px;"
         {% if section.settings.heading != blank %}aria-label="{{ section.settings.heading | escape }}"{% endif %}>

  <div class="pl-hero__media">
    {%- if section.settings.video != blank -%}
      {{ section.settings.video
         | video_tag: autoplay: true, loop: true, muted: true, controls: false,
                      playsinline: true, image_size: '1920x' }}
    {%- elsif section.settings.image != blank -%}
      {{ section.settings.image
         | image_url: width: 3000
         | image_tag:
             loading: 'eager',
             fetchpriority: 'high',
             widths: '750,1100,1500,1920,2400,3000',
             sizes: '100vw',
             alt: section.settings.image.alt | default: section.settings.heading | escape }}
    {%- else -%}
      {{ 'lifestyle-1' | placeholder_svg_tag }}
    {%- endif -%}
  </div>

  {%- if section.settings.show_scrim -%}
    <div class="pl-hero__scrim" aria-hidden="true"></div>
  {%- endif -%}

  <div class="pl-hero__content">
    {%- if section.settings.heading != blank -%}
      <h2 class="pl-hero__heading">{{ section.settings.heading }}</h2>
    {%- endif -%}

    {%- if section.settings.subheading != blank -%}
      <p class="pl-hero__subheading">{{ section.settings.subheading }}</p>
    {%- endif -%}

    {%- comment -%}
      siwa-design-system principle 1 — one offering per fold. phlur.com measured
      exactly 1 CTA in the hero, so a single button is both the faithful and the
      compliant choice. Deliberately not repeatable via blocks.
    {%- endcomment -%}
    {%- if section.settings.cta_label != blank -%}
      {%- render 'pl-button',
            label: section.settings.cta_label,
            href: section.settings.cta_url,
            variant: section.settings.cta_variant -%}
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Hero banner",
  "tag": "section",
  "class": "shopify-section--pl-hero",
  "settings": [
    { "type": "image_picker", "id": "image", "label": "Background image" },
    { "type": "video", "id": "video", "label": "Background video (overrides image)" },
    { "type": "range", "id": "height", "min": 320, "max": 900, "step": 10,
      "unit": "px", "label": "Height", "default": 620,
      "info": "phlur.com measures 623px at desktop." },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Vanilla Canyon" },
    { "type": "text", "id": "subheading", "label": "Subheading" },
    { "type": "text", "id": "cta_label", "label": "Button label", "default": "Shop now" },
    { "type": "url", "id": "cta_url", "label": "Button link" },
    { "type": "select", "id": "cta_variant", "label": "Button style", "default": "inverse",
      "options": [
        { "value": "inverse", "label": "White on image" },
        { "value": "primary", "label": "Black" },
        { "value": "ghost", "label": "Outline" }
      ] },
    { "type": "select", "id": "alignment", "label": "Content position", "default": "start",
      "options": [
        { "value": "start", "label": "Bottom left" },
        { "value": "center", "label": "Bottom center" },
        { "value": "end", "label": "Bottom right" }
      ] },
    { "type": "select", "id": "text_color", "label": "Text colour", "default": "light",
      "options": [
        { "value": "light", "label": "White" },
        { "value": "dark", "label": "Black" }
      ] },
    { "type": "checkbox", "id": "show_scrim", "label": "Darken behind text", "default": true,
      "info": "Keeps the heading above 4.5:1 contrast on light imagery." }
  ],
  "presets": [{ "name": "Hero banner" }]
}
{% endschema %}
`);

  w('sections/pl-product-carousel.liquid', `{{ 'section-product-carousel.css' | asset_url | stylesheet_tag }}
{{ 'component-product-card.css' | asset_url | stylesheet_tag }}
{{ 'component-badge-stamp.css' | asset_url | stylesheet_tag }}

{%- liquid
  assign coll = collections[section.settings.collection]
  assign limit = section.settings.product_limit
-%}

<section class="pl-carousel">
  <div class="pl-carousel__inner">
    <div class="pl-carousel__head">
      {%- if section.settings.title != blank -%}
        <h2 class="pl-carousel__title">{{ section.settings.title }}</h2>
      {%- endif -%}

      {%- if section.settings.show_view_all and coll != blank -%}
        <a class="pl-carousel__link" href="{{ coll.url }}">
          {{ section.settings.view_all_label | default: 'Shop All' }}
        </a>
      {%- endif -%}
    </div>

    {%- if coll.products.size > 0 -%}
      <ul class="pl-carousel__track" role="list"
          {% if section.settings.title != blank %}aria-label="{{ section.settings.title | escape }}"{% endif %}>
        {%- for product in coll.products limit: limit -%}
          <li class="pl-carousel__item">
            {%- render 'pl-product-card',
                  product: product,
                  show_price: section.settings.show_price,
                  lazy: forloop.index > 4 -%}
          </li>
        {%- endfor -%}
      </ul>
    {%- else -%}
      <ul class="pl-carousel__track" role="list">
        {%- for i in (1..5) -%}
          <li class="pl-carousel__item">
            <div class="pl-card">
              <div class="pl-card__media">{{ 'product-1' | placeholder_svg_tag: 'pl-card__image' }}</div>
              <div class="pl-card__body"><h3 class="pl-card__title">Product title</h3></div>
            </div>
          </li>
        {%- endfor -%}
      </ul>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Product carousel",
  "tag": "section",
  "class": "shopify-section--pl-carousel",
  "settings": [
    { "type": "text", "id": "title", "label": "Heading", "default": "Bestsellers" },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "product_limit", "min": 4, "max": 16, "step": 1,
      "label": "Products shown", "default": 12 },
    { "type": "checkbox", "id": "show_view_all", "label": "Show \\"Shop All\\" link", "default": true },
    { "type": "text", "id": "view_all_label", "label": "Link label", "default": "Shop All" },
    { "type": "checkbox", "id": "show_price", "label": "Show price", "default": true }
  ],
  "presets": [{ "name": "Product carousel" }]
}
{% endschema %}
`);

  w('sections/pl-collection-grid.liquid', `{{ 'section-collection-grid.css' | asset_url | stylesheet_tag }}

<section class="pl-grid-section">
  <div class="pl-grid-section__inner">
    {%- if section.settings.title != blank -%}
      <h2 class="pl-grid-section__title">{{ section.settings.title }}</h2>
    {%- endif -%}

    <div class="pl-grid pl-grid--{{ section.settings.columns }}">
      {%- for block in section.blocks -%}
        {%- liquid
          assign c = collections[block.settings.collection]
          assign img = block.settings.image | default: c.featured_image
          assign label = block.settings.label | default: c.title
        -%}
        <a class="pl-tile" href="{{ c.url | default: block.settings.url }}" {{ block.shopify_attributes }}>
          {%- if img != blank -%}
            {{ img | image_url: width: 1200
                   | image_tag: loading: 'lazy',
                                widths: '400,600,900,1200',
                                sizes: '(max-width: 749px) 50vw, 33vw',
                                alt: label | escape }}
          {%- else -%}
            {{ 'collection-1' | placeholder_svg_tag }}
          {%- endif -%}
          {%- if label != blank -%}
            <span class="pl-tile__label">{{ label }}</span>
          {%- endif -%}
        </a>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Collection grid",
  "tag": "section",
  "class": "shopify-section--pl-collection-grid",
  "settings": [
    { "type": "text", "id": "title", "label": "Heading", "default": "Featured Collections" },
    { "type": "select", "id": "columns", "label": "Columns", "default": "3",
      "options": [
        { "value": "2", "label": "2" },
        { "value": "3", "label": "3" },
        { "value": "4", "label": "4" }
      ] }
  ],
  "blocks": [
    { "type": "tile", "name": "Collection tile", "settings": [
      { "type": "collection", "id": "collection", "label": "Collection" },
      { "type": "image_picker", "id": "image", "label": "Image override" },
      { "type": "text", "id": "label", "label": "Label override" },
      { "type": "url", "id": "url", "label": "Link (if no collection)" }
    ] }
  ],
  "max_blocks": 12,
  "presets": [{
    "name": "Collection grid",
    "blocks": [{ "type": "tile" }, { "type": "tile" }, { "type": "tile" }]
  }]
}
{% endschema %}
`);

  w('sections/pl-editorial.liquid', `{{ 'section-editorial.css' | asset_url | stylesheet_tag }}

<section class="pl-editorial{% if section.settings.dark %} pl-editorial--dark{% endif %}">
  <div class="pl-editorial__inner">
    {%- if section.settings.quote != blank -%}
      <blockquote class="pl-editorial__quote">{{ section.settings.quote }}</blockquote>
    {%- endif -%}
    {%- if section.settings.attribution != blank -%}
      <p class="pl-editorial__attribution">{{ section.settings.attribution }}</p>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Editorial quote",
  "tag": "section",
  "class": "shopify-section--pl-editorial",
  "settings": [
    { "type": "textarea", "id": "quote", "label": "Quote",
      "default": "Modern fragrances inspired by memory." },
    { "type": "text", "id": "attribution", "label": "Attribution" },
    { "type": "checkbox", "id": "dark", "label": "Dark background", "default": false }
  ],
  "presets": [{ "name": "Editorial quote" }]
}
{% endschema %}
`);

  w('sections/pl-header.liquid', `{{ 'section-site-header.css' | asset_url | stylesheet_tag }}

{%- if section.settings.announcement != blank -%}
  <div class="pl-announce">{{ section.settings.announcement }}</div>
{%- endif -%}

<header class="pl-header{% if section.settings.transparent %} pl-header--transparent{% endif %}">
  <div class="pl-header__inner">
    <nav class="pl-header__nav" aria-label="Primary">
      {%- for link in linklists[section.settings.menu].links -%}
        <a href="{{ link.url }}">{{ link.title }}</a>
      {%- endfor -%}
    </nav>

    <button class="pl-header__actions pl-header__burger" type="button"
            aria-label="Open menu" aria-expanded="false" aria-controls="pl-menu-drawer">
      &#9776;
    </button>

    <a class="pl-header__logo" href="{{ routes.root_url }}">
      {%- if section.settings.logo != blank -%}
        {%- assign logo_alt = shop.name | escape -%}
        {{ section.settings.logo | image_url: width: 400
           | image_tag: loading: 'eager', alt: logo_alt }}
      {%- else -%}
        {{ shop.name }}
      {%- endif -%}
    </a>

    <div class="pl-header__actions">
      <a href="{{ routes.search_url }}" aria-label="Search">Search</a>
      <a href="{{ routes.account_url }}" aria-label="Account">Account</a>
      <a href="{{ routes.cart_url }}" aria-label="Cart">
        Cart ({{ cart.item_count }})
      </a>
    </div>
  </div>
</header>

{% schema %}
{
  "name": "Header",
  "settings": [
    { "type": "image_picker", "id": "logo", "label": "Logo" },
    { "type": "link_list", "id": "menu", "label": "Menu", "default": "main-menu" },
    { "type": "text", "id": "announcement", "label": "Announcement bar",
      "default": "Complimentary shipping on orders over $75" },
    { "type": "checkbox", "id": "transparent", "label": "Transparent over hero", "default": false,
      "info": "Only enable on templates whose first section is a hero banner." }
  ]
}
{% endschema %}
`);

  w('sections/pl-footer.liquid', `{{ 'section-site-footer.css' | asset_url | stylesheet_tag }}
{{ 'component-button.css' | asset_url | stylesheet_tag }}

<footer class="pl-footer">
  <div class="pl-footer__inner">
    <div>
      <h2 class="pl-footer__title">{{ section.settings.signup_title | default: 'Stay in touch' }}</h2>
      {%- form 'customer', class: 'pl-footer__signup-form' -%}
        <input type="hidden" name="contact[tags]" value="newsletter">
        <div class="pl-footer__signup">
          <label class="visually-hidden" for="pl-newsletter">Email</label>
          <input id="pl-newsletter" type="email" name="contact[email]"
                 placeholder="Email address" autocomplete="email" required>
          {%- render 'pl-button', label: 'Sign up', type: 'submit', variant: 'ghost' -%}
        </div>
      {%- endform -%}
    </div>

    {%- for block in section.blocks -%}
      <div {{ block.shopify_attributes }}>
        <h2 class="pl-footer__title">{{ block.settings.title }}</h2>
        <ul class="pl-footer__list" role="list">
          {%- for link in linklists[block.settings.menu].links -%}
            <li><a href="{{ link.url }}">{{ link.title }}</a></li>
          {%- endfor -%}
        </ul>
      </div>
    {%- endfor -%}
  </div>

  <div class="pl-footer__bottom">
    <span>&copy; {{ 'now' | date: '%Y' }} {{ shop.name }}</span>
    <span>{{ section.settings.legal }}</span>
  </div>
</footer>

{% schema %}
{
  "name": "Footer",
  "settings": [
    { "type": "text", "id": "signup_title", "label": "Signup heading", "default": "Stay in touch" },
    { "type": "text", "id": "legal", "label": "Legal line" }
  ],
  "blocks": [
    { "type": "menu", "name": "Link column", "settings": [
      { "type": "text", "id": "title", "label": "Title", "default": "Shop" },
      { "type": "link_list", "id": "menu", "label": "Menu" }
    ] }
  ],
  "max_blocks": 4,
  "presets": [{
    "name": "Footer",
    "blocks": [{ "type": "menu" }, { "type": "menu" }, { "type": "menu" }]
  }]
}
{% endschema %}
`);

  w('sections/pl-main-product.liquid', `{{ 'section-main-product.css' | asset_url | stylesheet_tag }}
{{ 'component-button.css' | asset_url | stylesheet_tag }}
{{ 'component-badge-stamp.css' | asset_url | stylesheet_tag }}

<section class="pl-pdp">
  <div class="pl-pdp__media">
    {%- for media in product.media limit: section.settings.gallery_limit -%}
      <figure>
        {{ media | image_url: width: 1400
                 | image_tag: loading: forloop.first ? 'eager' : 'lazy',
                              widths: '500,700,1000,1400',
                              sizes: '(max-width: 989px) 100vw, 55vw',
                              alt: media.alt | default: product.title | escape }}
      </figure>
    {%- else -%}
      <figure>{{ 'product-1' | placeholder_svg_tag }}</figure>
    {%- endfor -%}
  </div>

  <div class="pl-pdp__info">
    <h1 class="pl-pdp__title">{{ product.title }}</h1>

    {%- if product.type != blank -%}
      <p class="pl-pdp__subtitle">{{ product.type }}</p>
    {%- endif -%}

    <p class="pl-pdp__price">
      {%- if product.compare_at_price > product.price -%}
        <del>{{ product.compare_at_price | money }}</del>
        {{ product.price | money }}
      {%- else -%}
        {{ product.price | money }}
      {%- endif -%}
    </p>

    {%- form 'product', product -%}
      {%- unless product.has_only_default_variant -%}
        {%- for option in product.options_with_values -%}
          <fieldset class="pl-pdp__variants">
            <legend class="visually-hidden">{{ option.name }}</legend>
            {%- for value in option.values -%}
              <label class="pl-pdp__variant"
                     aria-checked="{% if option.selected_value == value %}true{% else %}false{% endif %}">
                <input class="visually-hidden" type="radio"
                       name="option-{{ option.position }}" value="{{ value | escape }}"
                       {% if option.selected_value == value %}checked{% endif %}>
                {{ value }}
              </label>
            {%- endfor -%}
          </fieldset>
        {%- endfor -%}
      {%- endunless -%}

      <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">

      <button class="pl-button pl-button--primary pl-pdp__atc" type="submit"
              {% unless product.available %}disabled{% endunless %}>
        {% if product.available %}Add to bag{% else %}Sold out{% endif %}
      </button>
    {%- endform -%}

    <div class="pl-pdp__accordion">
      {%- for block in section.blocks -%}
        <details {{ block.shopify_attributes }}>
          <summary>{{ block.settings.title }}</summary>
          <div class="pl-pdp__panel">
            {%- if block.settings.use_description -%}
              {{ product.description }}
            {%- else -%}
              {{ block.settings.content }}
            {%- endif -%}
          </div>
        </details>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Product",
  "tag": "section",
  "settings": [
    { "type": "range", "id": "gallery_limit", "min": 1, "max": 8, "step": 1,
      "label": "Gallery images", "default": 4 }
  ],
  "blocks": [
    { "type": "panel", "name": "Accordion panel", "settings": [
      { "type": "text", "id": "title", "label": "Title", "default": "Details" },
      { "type": "checkbox", "id": "use_description", "label": "Use product description", "default": false },
      { "type": "richtext", "id": "content", "label": "Content" }
    ] }
  ],
  "presets": [{
    "name": "Product",
    "blocks": [{ "type": "panel" }, { "type": "panel" }]
  }]
}
{% endschema %}
`);

  w('sections/pl-main-collection.liquid', `{{ 'section-collection-grid.css' | asset_url | stylesheet_tag }}
{{ 'component-product-card.css' | asset_url | stylesheet_tag }}
{{ 'component-badge-stamp.css' | asset_url | stylesheet_tag }}

<section class="pl-grid-section">
  <div class="pl-grid-section__inner">
    <h1 class="pl-grid-section__title">{{ collection.title }}</h1>

    {%- if collection.description != blank and section.settings.show_description -%}
      <div class="pl-collection__description">{{ collection.description }}</div>
    {%- endif -%}

    {%- paginate collection.products by section.settings.per_page -%}
      <div class="pl-grid pl-grid--{{ section.settings.columns }}">
        {%- for product in collection.products -%}
          {%- render 'pl-product-card', product: product, lazy: forloop.index > 8 -%}
        {%- else -%}
          <p>No products found.</p>
        {%- endfor -%}
      </div>

      {%- if paginate.pages > 1 -%}
        <nav class="pl-pagination" aria-label="Pagination">
          {{ paginate | default_pagination }}
        </nav>
      {%- endif -%}
    {%- endpaginate -%}
  </div>
</section>

{% schema %}
{
  "name": "Collection",
  "tag": "section",
  "settings": [
    { "type": "select", "id": "columns", "label": "Columns", "default": "4",
      "options": [
        { "value": "2", "label": "2" },
        { "value": "3", "label": "3" },
        { "value": "4", "label": "4" }
      ] },
    { "type": "range", "id": "per_page", "min": 8, "max": 48, "step": 4,
      "label": "Products per page", "default": 24 },
    { "type": "checkbox", "id": "show_description", "label": "Show description", "default": true }
  ]
}
{% endschema %}
`);

  /* ─────────────────────────── TEMPLATES ─────────────────────────── */

  w('templates/index.json', JSON.stringify({
    sections: {
      hero: { type: 'pl-hero-banner', settings: { heading: 'Vanilla Canyon', subheading: 'A soulful vanilla that wears like the freedom of the open road', cta_label: 'Shop now', cta_variant: 'inverse', alignment: 'start', height: 620, show_scrim: true } },
      bestsellers: { type: 'pl-product-carousel', settings: { title: 'Bestsellers', product_limit: 12, show_view_all: true } },
      quote: { type: 'pl-editorial', settings: { quote: 'Modern fragrances inspired by memory.' } },
      members: { type: 'pl-hero-banner', settings: { heading: 'Members get more', cta_label: 'Join', cta_variant: 'inverse', alignment: 'center', height: 610 } },
      trending: { type: 'pl-product-carousel', settings: { title: 'Trending now', product_limit: 12, show_view_all: true } },
      collections: { type: 'pl-collection-grid', settings: { title: 'Featured collections', columns: '3' }, blocks: { t1: { type: 'tile' }, t2: { type: 'tile' }, t3: { type: 'tile' } }, block_order: ['t1', 't2', 't3'] },
    },
    order: ['hero', 'bestsellers', 'quote', 'members', 'trending', 'collections'],
  }, null, 2) + '\n');

  w('templates/product.json', JSON.stringify({
    sections: {
      main: { type: 'pl-main-product', settings: { gallery_limit: 4 }, blocks: { d: { type: 'panel', settings: { title: 'Details', use_description: true } }, n: { type: 'panel', settings: { title: 'Notes' } } }, block_order: ['d', 'n'] },
      related: { type: 'pl-product-carousel', settings: { title: 'You may also like', product_limit: 8, show_view_all: false } },
    },
    order: ['main', 'related'],
  }, null, 2) + '\n');

  w('templates/collection.json', JSON.stringify({
    sections: { main: { type: 'pl-main-collection', settings: { columns: '4', per_page: 24 } } },
    order: ['main'],
  }, null, 2) + '\n');

  return f;
}
