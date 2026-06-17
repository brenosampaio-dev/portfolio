# Portfolio Design System — v2

The tokens and components for **Breno Sampaio's** portfolio. Built for
consistency, so the case studies — not the interface — hold attention.

> **Decide once. Apply everywhere.**

## Philosophy

- **Warm neutral base, not cold white.** The page sits on Paper (`#F7F5F0`); cards lift to Ivory.
- **One accent does all the work.** Deep Moss (`#465242`) carries every action and focus state.
- **Vermilion is alert-only.** Held back for a single exception state — when it appears, it means something.
- **Hierarchy from size, weight and space — almost never colour.** Tracking tightens as type grows.
- **Motion is almost invisible.** Functional, ≤220ms, and it respects `prefers-reduced-motion`.

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite 6** — dev server and build
- **Tailwind CSS v4** — tokens exposed via `@theme`, so every value is a utility (`bg-moss`, `rounded-md`, `font-mono`)
- **Storybook 8** — component docs + accessibility (`addon-a11y`) checks
- **Geist** / **Geist Mono** (Google Fonts)

## Getting started

```bash
npm install
npm run dev          # Vite dev server — the design-system showcase page
npm run storybook    # Storybook on :6006 — component explorer + docs
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Run the showcase page (`src/App.tsx`) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run typecheck` | Type-check only |
| `npm run storybook` | Storybook dev server on port 6006 |
| `npm run build-storybook` | Static Storybook to `storybook-static/` |

## Project layout

```
src/
├── styles/
│   ├── tokens.css      # single source of truth — @theme tokens + CSS variables
│   └── global.css      # Tailwind import, base layer, reduced-motion
├── tokens/index.ts     # typed mirror of the tokens (for TS / inline styles)
├── utils/cn.ts         # Tailwind-aware className merge
├── components/
│   ├── Button/         # primary · secondary · ghost · link (+ disabled)
│   ├── Tag/            # neutral mono label
│   ├── Status/         # default · done · urgent (the only Vermilion)
│   ├── ProjectCard/    # problem-first card with honest empty preview frame
│   ├── TextField/      # labelled input, visible focus ring (a11y)
│   └── Text/           # the type scale as a component
├── stories/            # Foundations stories (color, spacing, radius)
├── App.tsx             # the design-system showcase, rebuilt from components
└── index.ts            # library entry point
```

## Tokens

Defined once in [`src/styles/tokens.css`](src/styles/tokens.css) and mirrored,
typed, in [`src/tokens/index.ts`](src/tokens/index.ts).

### Color

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#111111` | Primary text, titles |
| `charcoal` | `#1C1C1A` | Dark surfaces, code |
| `paper` | `#F7F5F0` | Main background |
| `ivory` | `#FBFAF7` | Cards, raised surfaces |
| `stone` | `#E6E2D8` | Borders, dividers |
| `warm-grey` | `#8A8781` | Secondary text |
| `muted-grey` | `#C9C5BC` | Lines, disabled |
| `moss` | `#465242` | **The accent** — actions, focus |
| `moss-dark` | `#3A463A` | Accent hover |
| `vermilion` | `#C84A31` | **Alert state only** |

### Type scale

`display 56/600` · `h1 44/600` · `h2 32/600` · `h3 24/500` · `body-lg 20/400` ·
`body 16/400` · `small 14/400` · `mono 12`. Geist Sans for everything human;
Geist Mono for the technical (metadata, tags, numbers, labels).

### Spacing & radius

4 / 8 rhythm (`4 8 12 16 24 32 48 64 96`), mapped to Tailwind's default scale
(`p-1 … p-24`). Radius: `xs 6` · `sm 10` · `md 16` · `lg 20` · `full`.

### Elevation & motion

`shadow-subtle` (hairline) and `shadow-card` (lift on hover). Motion uses
`--ease-smooth` over `--duration-base` (180ms).

## Usage

```tsx
import { Button, ProjectCard, Status, Tag, TextField, Text } from '@/components';

<Text variant="display">Service clarity</Text>

<Button variant="primary">View selected work</Button>

<ProjectCard
  title="Service Operations Dashboard"
  problem="Front-desk teams lose visibility when incidents scatter across tools."
  tags={['B2B', 'Service Ops', 'Design System']}
  role="Concept · Product Design, flows, UI · 2026"
/>

<Status variant="urgent">Urgent incident</Status>
```

## Notes from the v1 → v2 port

The source HTML had a few token inconsistencies, fixed here so the tokens are a
genuine single source of truth:

- `--radius-xs` (6px) was used but missing from the published token block — now included.
- `shadow-subtle` / `shadow-card` were defined but absent from the published block — now exported.
- The 4/8 spacing scale was only shown visually — now real tokens (`--space-*`).
- `--moss-dark` casing was inconsistent (`#3a463a` vs `#3A463A`) — normalised.
- Added a `disabled` button state to complete the component.
