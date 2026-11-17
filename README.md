# SHOP CITY storefront concept review

Independent design exploration for GitHub Issue #3. Product names, images, prices and availability are fictional samples.

## Run locally

Requires Node 20.19+ or 22.12+ and npm. Browser verification uses a locally installed Microsoft Edge.

```sh
npm ci
npm run dev
```

Open the localhost address printed by Vite. The review hub links to the original concepts:

- `/concepts/frame-noir`
- `/concepts/studio-object`
- `/concepts/city-edit`

Run `npm run typecheck`, `npm run build`, then `npm run verify:browser`. The verification script starts and stops its own local preview on port 4173 and writes PNGs to `evidence/`. Set `SHOP_CITY_EVIDENCE` to a different directory to preserve the tracked images. Set `SHOP_CITY_EDGE` if the Edge executable is installed in a nonstandard location.

## Browser evidence

These are full-page Edge screenshots, captured with desktop and emulated mobile viewports.

| Direction | 1440 × 900 viewport | 390 × 844 viewport |
| --- | --- | --- |
| FRAME / NOIR | [Desktop](evidence/frame-noir-desktop.png) | [Mobile](evidence/frame-noir-mobile.png) |
| STUDIO / OBJECT | [Desktop](evidence/studio-object-desktop.png) | [Mobile](evidence/studio-object-mobile.png) |
| CITY / EDIT | [Desktop](evidence/city-edit-desktop.png) | [Mobile](evidence/city-edit-mobile.png) |

See [design and verification notes](DESIGN_REVIEW.md) for media provenance, art direction, browser assertions and remaining review work.

The hybrid is also available at `/concepts/hybrid`. See [hybrid screenshots and test notes](DESIGN_REVIEW.md#issue-5--hybrid-study-in-charcoal).
