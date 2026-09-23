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
- `npm run test:e2e`: 10 navigation, metadata, locale, 404, keyboard, and touch-flow tests passed.
- `npm run test:a11y`: 13 tests passed, including Axe, reduced motion, no-JavaScript content, all eight non-case routes at 320px, and effective 200% zoom reflow at 160px.
- `npm run test:visual`: 83 scenarios passed: eight non-case routes at five widths in both themes, plus protected interaction, desktop/reduced-motion, and 200% reflow states. The two affected supplemental scenarios were rerun after the final reflow correction.

Human inspection covered the regenerated Home, Work, About, French mobile, touch navigation, desktop progress rail, contact dock, and 200% reflow evidence. Corrections made during inspection:

- French capability status labels now stack without horizontal overflow at 320px.
- Primary and inline actions retain usable touch targets.
- Full-page visual captures wait for motion and reveal off-screen sections before recording evidence.
- At an effective 160px layout viewport, the header collapses to the wordmark and complete navigation trigger; intrinsic CTA, contact, and footer widths no longer force horizontal scrolling.

## Accepted framework warning

Next.js 16.3.4 emits one non-failing `metadataBase` warning while resolving the framework-level `/_not-found` social image under multiple locale root layouts. Every served non-case route provides its own `metadataBase`, canonical URL, reciprocal language alternatives, Open Graph data, and browser-tested metadata. Avoiding the warning would require experimental global-not-found behavior and is not justified for this protected foundation.

## Scope and release state

- The three existing case-study routes remain preserved and directly reachable, but are not promoted in the new navigation or sitemap.
- Case selection and rewriting remain deliberately paused for a later phase.
- Production remains behind Vercel Authentication.
- This phase is prepared for review only; it does not authorize merging, removing protection, or publishing publicly.
