# SHOP CITY — Project brief
Status: planning; no application implementation or deployment confirmed.
Repository: https://github.com/reydereditor-del/shop-city
Retailer: Shopcity uz, Yunusobod 13-mavze, Tashkent, Uzbekistan. Retailer involvement, branding rights, catalog data, and ownership agreement are NOT confirmed.

## Objective
Create a distinctive, high-end, mobile-first fashion-commerce demonstration that is not a generic AI-generated template. Prove both compelling editorial design and real, secure product administration. The demo is a proposal to the retailer, not an authorized official website.

## Demo (P0–P3)
- Original homepage with campaign storytelling, carefully designed typography, strong imagery, and purposeful motion.
- Product listing with server-driven filters, search and sorting; product detail with image gallery, variants, and availability.
- Invite-only authenticated admin: create draft product, upload approved images, manage size/color SKUs and stock, publish, edit, and archive.
- Persistent database and access-control enforcement; demo/synthetic product data only until rights and values are confirmed.
- Responsive desktop/mobile experiences, keyboard accessibility, reduced-motion fallback, and measured performance.
- Clearly label demonstration and sample data; do not impersonate the retailer or accept real orders/payments.

## Out of scope for initial demo
Live Click/Payme, real checkout, customer information collection, production inventory sync, multi-store management, real business analytics. Design extension points but do not claim they exist.

## Acceptance scenario
Authorized admin signs in → creates draft with two variants and image → publishes → product appears publicly → edits and archives → product is removed from public view. A non-admin cannot create, edit, publish, or access draft data. Repeat after refresh and restart.

## Approval gates
1. Compare at least three bespoke visual directions with desktop and mobile mockups.
2. Approve one visual system and media licensing before major build.
3. Prove secure admin slice before broader catalog functionality.
4. Run automated and visual verification; no production release without retailer contract and separate production review.

## Non-negotiables
No secrets in Git. Do not modify unrelated repositories. Never mark work tested without real evidence. Store editable project continuity documents in repository. Owner/user approves significant scope and brand decisions.
