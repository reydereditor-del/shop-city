# Issue #3 design review

## Visual decisions

| Direction | Typography and crop | Grid, spacing and shopping path | Motion and critique |
| --- | --- | --- | --- |
| FRAME / NOIR | Barlow Condensed on a dark plum split frame. Wide side-lit image at desktop and a tighter portrait crop above the copy on mobile. | Generous desktop gutters and a high-contrast cut to a bone-colored editorial and regular product grid. Shop the edit jumps to items, then each card opens the sample detail. | The CTA arrow follows the link direction on hover and focus. The dark campaign and oversized condensed headline are familiar fashion devices. The crop and shoulder silhouette carry most of the identity. |
| STUDIO / OBJECT | Instrument Serif headline and Instrument Sans labels. A studio garment and its twill macro share the desktop spread. Mobile puts the headline and CTA first, with the smaller macro after the garment. | A staggered two-column spread folds into a single reading column. Browse garments goes straight to the grid, and the editorial seam story links to the matching product detail. | A short fade marks the user-initiated product image change. The pale studio grid can look conventional when viewed alone. Retain the specific fabric/detail pairing. |
| CITY / EDIT | Bricolage Grotesque with cobalt navigation rules. A fictional street portrait, narrow garment crop and named look index form the desktop spread. | A shallow masthead and a dense editorial band give way to a cobalt story block and catalog. Mobile keeps the portrait and garment links in a single column. The index opens the corresponding detail directly. | Index arrows move toward their destinations on focus and hover. The cobalt streetwear treatment can read as a generic campaign without recognizable, authorized locations and stronger local styling. |

The prototypes share Instrument Sans for controls, an inline sample product detail, the catalog layout at narrow widths, and the footer. This keeps the shopping interactions comparable. For a selected design, refine the card rhythm and product detail through that direction's strongest motif. STUDIO / OBJECT remains the practical starting point for repeatable product photography. The review decision is pending.

The motion uses CSS and respects reduced motion. The static compositions and short directional cues were sufficient for this review, so the prototypes use neither GSAP nor 3D.

## Media provenance

All 12 WebP photos in `public/media` are original generated placeholders made for this prototype using the built-in OpenAI image generation tool. Three fictional four-panel source sheets were sliced into separate assets and compressed to WebP. No retailer photos, logos, product records, or reference-brand image assets were used. CITY's passage is fictional. The display name is plain text, and pages identify themselves as independent concept demos. The browser evidence includes the same placeholders. Typeface assets come from Fontsource packages distributed under the SIL Open Font License. Replace placeholders and confirm retailer, product, location and photography permissions before any public storefront presentation or deployment.

## Verification

- `npm run typecheck` passed with TypeScript.
- `npm run build` passed with Vite. The JS bundle is approximately 3.5 kB gzip and the CSS approximately 4 kB gzip. Those are bundle sizes, not measured load times.
- `npm run verify:browser` passed all six Edge Chromium 157.0.4341.60 cases at 1440 × 900 and 390 × 844. The checks cover route HTTP status, expected headline, three cards and product preview, image decode, horizontal overflow, first-screen CTA, keyboard skip focus, shopping links, focus transfer into the product preview, size selection, and uncaught page/request errors. CITY also checks a named look link. Desktop checks compare the CTA motion with reduced motion, and STUDIO checks its product reveal animation.
- Reviewed the six browser captures for composition, image crops, editorial order, catalog rhythm and detail visibility. Fixed a keyboard focus transfer issue, a wardrobe crop and CITY reduced-motion specificity during review.
- Edge mobile mode emulates viewport and touch. Physical devices, Safari and Firefox, assistive technologies, complete WCAG conformance, font coverage for Uzbek Latin and Russian, and measured Core Web Vitals remain unverified.

The issue stops at visual review. No backend, accounts, checkout, payments or hosted preview are part of this branch.
