# Editorial shell — spacing and motion contract

Scope: Home, Work selection and About, in English and French. Existing case implementations and their tokens remain unchanged.

## Spacing

Use a 4px base. Component spacing: 8, 16, 24, 32 and 48px. A paragraph's line height is typographic, not a spacing-grid constraint. Borders remain 1px.

- Desktop section padding: 96px above and below; mobile: 56px.
- Grid gutters: 48px desktop, 32px tablet; stack columns at 700px.
- Capability cards: 24px gutters, 32px padding (24px on narrow phones), 16px title/body separation. They are informational, without click or hover affordances.
- Header and content use the same `--max-content` container and horizontal gutters. Header: 88px desktop, 72px mobile.
- Controls: at least 44px high. Keyboard focus appears immediately.
- Hero art occupies 56% of the desktop grid, aligned to its right edge, and fills the mobile column. It keeps a 5:3 slot to reserve layout space before image loading. Text is always HTML; image generation does not determine its positioning.
- Let longer French copy wrap naturally. At extreme 160px/400% zoom, allow words and actions to wrap instead of clipping.

## Motion

Reuse existing Reveal behavior, scoped by the editorial shell. No new animation dependency.

| Purpose | Duration | Movement |
| --- | --- | --- |
| Link/button feedback | 160ms | Color/border changes |
| Existing mobile menu entrance | 180ms | Short fade/translate, ease-out |
| One-time content entrance | 480ms | Opacity plus 8px translation, cubic-bezier(.16,1,.3,1) |
| Keyboard focus | Immediate | Visible outline |
| Reduced motion | Immediate | Content visible; no translation, delays or transition |

Controls remain usable during transitions. Cards have no bounce, parallax, continuous movement or stagger delays. Reveal keeps real text in the DOM and existing no-JavaScript behavior.

## Visual reference and provenance

Approved source: `sintese-minimalismo-humanismo.png`, 2026-10-16 visual studies. White canvas, Cormorant Garamond headings, DM Sans body/UI, mineral blue/sage with a small terracotta accent. Artwork is a separate generated raster asset, never a screenshot used as the interface.

Apple's [Motion HIG](https://developer.apple.com/design/human-interface-guidelines/motion) informs purpose, precision, optional motion and allowing interaction without waiting. [Anthropic](https://www.anthropic.com/) informs restrained editorial composition. The pixel values and timings above are portfolio choices, not claimed internal Apple or Anthropic specifications.

The approved mock only illustrates Hero and Capabilities. The implementation intentionally retains all six authorized blocks: Hero, Selected Work, Value + Capabilities, Way of Working, Experience + About, Contact. No existing projects are reintroduced into the selection.
