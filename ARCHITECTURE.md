# SHOP CITY — Architecture proposal (not implemented)

## Candidate stack
Next.js App Router + TypeScript + Tailwind; PostgreSQL, Supabase Auth/Storage with Row Level Security; GSAP only for vetted interactive sections. Evaluate hosting/commercial terms before retailer deployment. Do not enable live payments for the demo.

## Trust boundaries
- Public server-rendered storefront can read only published, approved product data.
- Authentication is invite-only for admin. Server verifies both identity and active role for EVERY mutation; database and storage policies provide defense-in-depth.
- Secrets remain in server-side deployment environment variables, never public frontend, repo, or client logs.
- Avoid leaking drafts, archived items and raw private media to anonymous users.
- Distinguish authentication (who) from authorization (what they may do).

## Planned relational data model
products(id, slug, category_id, status[draft,published,archived], base_price_uzs, revision, timestamps)
categories(id, slug, sort_order)
product_translations(product_id, locale, name, description, fit, care)
colors(id, name, swatch)
sizes(id, label, sort_order)
product_variants(id, product_id, color_id, size_id, sku UNIQUE, price_override_uzs, active)
locations(id, label)
inventory(location_id, variant_id, on_hand CHECK >= 0, updated_at)
product_images(id, product_id, color_id?, storage_key, rendition metadata, alt, sort_order, state)
admin_memberships(user_id, role, active)
audit_events(actor_id, action, entity, entity_id, request_id, timestamp, safe delta)

Enforce unique product/color/size, active variants and referential integrity. Store prices as integer UZS. Inventory matching across size/color/stock must refer to the same variant (SKU). Treat edit collisions using revision checks, keeping audit updates atomic with domain updates.

## Upload flow
Validate file signature, size and decoded format. Re-encode, strip metadata and create optimized derivatives; stage privately, publish only verified approved images. Handle retries, partial failures, orphan cleanup, and public CDN cache policy. Do not put copyright-unlicensed files in public catalog.

## Demo testing
- Unit: filter parsing, search normalization, price/sort, variant availability.
- Integration/RLS: anonymous/non-admin denial, revoked admin, draft/archive visibility, inventory constraints, revision conflict, uploads, audit transaction.
- Browser: admin product lifecycle and shopper search/filter/product path, responsive and keyboard.
- Visual/perf: screenshots 320/390/768/1440, reduced motion; Lighthouse mobile under production build. Target LCP <=2.5s, CLS <=0.1; optimize based on measurement rather than promises.

## Production extensions (not built)
Orders, checkout, fulfillment, stock reservations/expiry, payment callbacks/refunds/idempotency, POS sync, privacy/retention policies, backup restore drill, billing and ownership transfer.
