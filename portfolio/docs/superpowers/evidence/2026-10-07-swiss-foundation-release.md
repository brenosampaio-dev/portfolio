# Release 0 — Swiss portfolio foundation evidence

Completed on 2026-10-08 in the existing SSD checkout. This release is a surface-level lapidation of the current portfolio, not a structural redesign.

## Commit range

- Baseline: `d8df144adb3d86732b6979fcd0c3ef5fbdff93cf`
- Verified implementation head: `0ceb19f628a32d054f094f0076db6fb5137a8d7e`
- Range: `d8df144..0ceb19f`

Implementation commits:

1. `06e7961` — center the Product Designer narrative
2. `0a43d53` — introduce the Swiss editorial type system
3. `efbdb9b` — brighten and rebalance the color system
4. `4cbd19c` — align every hub with Product Design
5. `29fed01` — refine the Swiss grid and surfaces
6. `0ceb19f` — align discovery with Product Design

## What changed

- Repositioned the portfolio around Product Design, complex workflows, interaction, systems and working prototypes.
- Rewrote the canonical EN/FR Home, Work, Labs, About and contact copy without presenting unfinished work as complete.
- Introduced Geist for functional UI/body text, Instrument Serif for editorial display text and Geist Mono for technical labels through `next/font`.
- Rebalanced the light and dark palettes around white/near-black pages, restrained neutral surfaces and one warm orange accent.
- Refined the existing grid, spacing, labels, status panels and capability surfaces while preserving the current layout, routes, cards, portrait and responsive architecture.
- Aligned localized metadata, Person schema and the stable social-image route with Product Design.
- Removed runtime Google Fonts fetching from the social image. The card intentionally uses ImageResponse's deterministic fallback in Release 0.

## Automated verification

The final gate was run sequentially from the portfolio directory after the implementation commits:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS — zero warnings |
| `npm run test:unit` | PASS — 7 files, 43 tests |
| `npm run build` | PASS — 20 routes generated; `/opengraph-image` static |
| `npm run test:e2e` | PASS — 28 navigation and interaction tests |
| `npm run test:a11y` | PASS — 14 accessibility/reflow tests; no serious or critical Axe findings on Home |
| `npm run test:visual` | PASS — 85 capture scenarios |
| `git diff --check` | PASS |

The visual matrix covered Home, Work, Labs and About in EN and FR, light and dark, at `360×800`, `601×900`, `768×1024`, `1280×900` and `1440×1000`. Each route asserted zero horizontal overflow. Additional captures covered the mobile header, dock/rail states, contact protection, reduced motion, case disclosure/evidence, code veil and effective 200% reflow.

## Manual visual review

The generated screenshots were visually inspected at representative extremes and intermediate widths:

- EN light: Home at 360 and 1440; Work at 1440.
- EN dark: Home at 1440; Work at 601.
- FR light: Home at 360.
- FR dark: Home at 768.

Observed results: the first screen identifies Product Design clearly; typography renders with the intended editorial/functional hierarchy; titles and CTAs do not clip; the portrait stays secondary; light and dark contrast remains legible; the French copy reflows without overflow; and the existing composition remains recognizable.

Keyboard focus, CTA destinations, locale retention, contact validation, header controls, rail/dock behavior and reduced-motion behavior were exercised by the Playwright navigation and accessibility suites. A manual screen-reader session was not performed and is not claimed.

## Protected motion proof

The protected motion files were compared with the baseline commit and produced no changed paths. A zero-context diff of `globals.css` and `signature.css` was also filtered for animation, transition, transform, scroll-behavior, duration and easing declarations and produced no matches.

Therefore the existing reveal, scramble, smooth scroll, progress, code veil, dock/rail and reduced-motion implementations were not changed by Release 0.

## Explicitly deferred

- Relay, Basis and Signalroom remain honest in-development case directions; none is presented as finished client or production work.
- Case research, case-page construction, validation and GPT-generated case imagery are not part of Release 0.
- The social card uses a deterministic fallback font; bundling the exact site fonts into ImageResponse can be revisited only if it remains build-stable.
- No deployment or push was performed.

Unrelated untracked directories at the parent repository root — `docs/`, `hertwill-shopify-store-ops/`, `portfolio/output/` and `triageai/` — were left untouched.
