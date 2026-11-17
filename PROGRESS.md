# SHOP CITY — Progress

Updated: 2026-11-17

## Verified
- Dedicated GitHub repository exists: reydereditor-del/shop-city.
- Connected GitHub has read/write permission.
- Planning documents are being proposed on branch docs/shop-city-foundation.
- Repository visibility was PUBLIC at inspection; user should review whether to switch to PRIVATE.

## Not yet done
- No production storefront, database, authentication, real retailer photography, deployment, or payments confirmed.
- No rights/contract from the retailer confirmed.
- No desktop/mobile design direction approved.

## Next actions
1. Review/merge documentation PR after user approval.
2. Connect Codex Web to repo and use a planning task that reads docs/constraints.
3. Present three genuine desktop/mobile art directions, then obtain approval.
4. Build one secure admin-to-storefront product lifecycle as first code slice.
5. Add catalog, product UI and editorial homepage; benchmark and iterate.

## Acceptance evidence needed
PR links, commit hashes, screenshots/recordings, test commands/results, known gaps and next handoff.

## Issue #3 · Prototype review

- Three runnable design routes are implemented on `codex/shop-city-design-prototypes` based on `docs/shop-city-foundation`.
- Typecheck, production build and six Edge cases passed. Full-page captures are in `evidence/`. See `DESIGN_REVIEW.md` for scope and limitations.
- Media and inventory are fictional placeholders. No application backend or hosted deployment was added.
- Next: compare the six captures and select a direction before implementation. Keep the foundation and design PRs unmerged pending user review.

## Issue #5 · Hybrid review

Added `/concepts/hybrid` on `codex/shop-city-hybrid`, based on the unmerged PR #4 prototype commit `b7d4a1f`. The review PR targets `docs/shop-city-foundation` as requested and includes the prototype dependency. Typecheck, production build, and eight Edge viewport checks passed. Six new captures document the hybrid and its scroll transition. See [design review](DESIGN_REVIEW.md#issue-5--hybrid-study-in-charcoal). Review the visual direction before application or hosting work.
