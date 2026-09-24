# Portfolio v2 Implementation Log

## Recovery

- Public baseline: `d8877d697ef7637921571726f11f65e5eb2bd500`
- Recovery tag: `portfolio-public-pre-v2-2026-09-21`
- Tag verified locally: 2026-09-22

## Deployment protection

- Method: Vercel Authentication
- Scope: All Deployments
- Password Protection: disabled
- Configuration verified through the Vercel API: `ssoProtection.deploymentType = all`
- Signed-out verification: protected (`302` redirect to Vercel authentication)
- Authorized verification: accessible (`200` through authenticated Vercel CLI)
- Verified: 2026-09-22

## Phase validation

| Phase | Commit | Lint | Unit | Build | Audit | Browser | Axe | Visual | Status |
|---|---|---|---|---|---|---|---|---|---|
| Lock and recovery | documentation-only | n/a | n/a | n/a | n/a | protected | n/a | current baseline | complete |
| Non-case v2 foundation | Task 12 verification commit | pass | 21 pass | 19 routes | 0 vulnerabilities | 10 pass | 13 pass | 83 scenarios pass | complete |

## Non-case v2 verification

Verified locally on 2026-09-23 against the current protected rebuild branch:

- `npm run lint`: passed with zero warnings.
- `npm run test:unit`: 5 files and 21 tests passed.
- `npm run build`: production build passed; 19 routes generated.
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities.
- `npm run test:e2e`: 13 navigation, metadata, locale, 404, keyboard, and touch-flow tests passed.
- `npm run test:a11y`: 13 tests passed, including Axe, reduced motion, no-JavaScript content, all eight non-case routes at 320px, and effective 200% zoom reflow at 160px.
- `npm run test:visual`: 83 scenarios passed: eight non-case routes at five widths in both themes, plus protected interaction, desktop/reduced-motion, and 200% reflow states. The two affected supplemental scenarios were rerun after the final reflow correction.

Human inspection covered the regenerated Home, Work, About, French mobile, touch navigation, desktop progress rail, contact dock, and 200% reflow evidence. Corrections made during inspection:

- French capability status labels now stack without horizontal overflow at 320px.
- Primary and inline actions retain usable touch targets.
- Full-page visual captures wait for motion and reveal off-screen sections before recording evidence.
- At an effective 160px layout viewport, the header collapses to the wordmark and complete navigation trigger; intrinsic CTA, contact, and footer widths no longer force horizontal scrolling.

## Final review corrections

The final independent code review found no critical issues and three important functional gaps. Each was reproduced with a failing browser test before correction and then verified by the complete quality suite:

- The English About contact action now returns to `/#contact`; the French action remains correctly localized at `/fr#contact`.
- Same-page Contact navigation now closes the mobile More/Plus panel while preserving smooth scrolling and the destination hash.
- Unknown English and French URLs now return a localized, server-rendered `404` document with Home and Work recovery links even when JavaScript is disabled.

Post-review verification on 2026-09-24: lint passed; 5 unit files and 21 tests passed; the production build passed with 19 generated routes; the production dependency audit found 0 vulnerabilities; 13 navigation tests, 13 accessibility tests, and all 83 visual scenarios passed.

## Signature, portrait and editorial refinement

Implemented and verified on 2026-09-24 on the protected rebuild branch:

- Reduced the portrait to a supporting editorial role: no more than 380px on desktop, 320px on tablet, and 270px on mobile; the About portrait follows a separate 320/280/250px scale.
- Rewrote the non-case English and French portfolio copy around one honest proposition: operational complexity becomes clear, accessible interfaces, with frontend practice presented as work in progress.
- Kept case selection explicitly paused. The Work page now defines the publication standard — scope, decisions, contribution and evidence — without implying that a case has already been approved.
- Added the desktop-only Code Veil signature: a non-interactive abstract code layer revealed by fine-pointer movement. It is absent on touch/narrow layouts and disabled under `prefers-reduced-motion`.
- Added dedicated light/dark visual evidence for the Code Veil and regression coverage for pointer behaviour, responsive portrait limits, localized hero navigation, dark-theme hydration and 200% reflow.
- Refined the Code Veil after pointer review: its field was reduced from 420px to 168px, and pointer coordinates now update synchronously instead of waiting for the next animation frame.
- Corrected the new headline at an effective 160px layout viewport so complete words remain visible without horizontal scrolling.

Verification: lint passed with zero warnings; 5 unit files and 21 tests passed; the production build generated 19 routes; the production dependency audit found 0 vulnerabilities; 20 navigation tests, 13 accessibility tests and all 84 visual scenarios passed. Representative Home, Work, About, French mobile, light/dark Code Veil and 200% reflow captures were inspected manually.

## Accepted framework warning

Next.js 16.3.4 emits one non-failing `metadataBase` warning while resolving the framework-level `/_not-found` social image under multiple locale root layouts. Every served non-case route provides its own `metadataBase`, canonical URL, reciprocal language alternatives, Open Graph data, and browser-tested metadata. Avoiding the warning would require experimental global-not-found behavior and is not justified for this protected foundation.

## Scope and release state

- The three existing case-study routes remain preserved and directly reachable, but are not promoted in the new navigation or sitemap.
- Case selection and rewriting remain deliberately paused for a later phase.
- Production remains behind Vercel Authentication.
- This phase is prepared for review only; it does not authorize merging, removing protection, or publishing publicly.

## Non-case handoff

- Production protection: still enabled; signed-out requests to both the current preview and public production alias return a `302` Vercel Authentication redirect.
- Remote review: draft PR [#33](https://github.com/brenosampaio-dev/portfolio/pull/33) targets `main` from `portfolio-v2-protected-rebuild`; CI, CodeQL, and Vercel checks passed for the signature refinement commit `75abc62`.
- Protected preview: `portfolio-kqlqcufhs-brenosampayo.vercel.app` redirects signed-out access to Vercel Authentication (`302`); authenticated Home, French Home and the Code Veil asset return `200`.
- Deployed interaction smoke test: dark-theme toggle, French route switch, complete mobile More menu, seven-section touch dock, and localized document language passed; no application console errors or page exceptions were observed. Vercel's preview feedback script produced two platform-only CSP warnings and did not affect the application.
- Production main: intentionally unchanged pending review; the verified v2 exists only on the protected preview branch.
- Case selection: intentionally not started; legacy routes remain preserved but unpromoted.
- Public release: blocked pending case decision, case evidence, full release QA, merge approval, and explicit Breno approval to remove protection.
