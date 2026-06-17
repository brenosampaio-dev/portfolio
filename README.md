# Breno Sampaio — Portfolio v1

Personal portfolio for **Breno Sampaio, Product Designer** (service operations & B2B operational tools). Implemented from the Claude Design handoff bundle (`Portfolio.dc.html`) into a production stack.

## Stack

- **Next.js 15 (App Router)** with **static export** (`output: "export"`) → plain HTML for fast first paint, SEO and recruiter/ATS parsing.
- **React 19 + TypeScript**
- **Tailwind CSS v4** (design tokens exposed via `@theme` in `app/globals.css`)
- **Geist + Geist Mono** via `next/font` (self-hosted, no FOUT)

Real routes (not the prototype's in-page switcher):

| Route | Page |
|---|---|
| `/` | Home — hero, selected work, approach, about teaser |
| `/work/service-operations-dashboard` | Case study (concept) |
| `/about` | About + languages |
| `/contact` | Contact details + minimal form |

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

`npm run build` writes a fully static site to `out/`. Deploy that folder to Vercel, Netlify, GitHub Pages, or any static host.

## Design system

Ported faithfully from the Breno Sampaio design system bundle:

- **Tokens** — warm-neutral palette, one **Moss** accent (actions + focus), **Vermilion** for the single alert state only. All in `app/globals.css` (`:root`).
- **Primitives** — `components/ui/`: `Button` (primary/secondary/ghost/link, polymorphic to a link when given `href`), `Tag`, `Status` (default/done/urgent), `TextField`, `ProjectCard`.
- **Chrome** — `Dock` (floating liquid-glass nav, the one JS island), `SiteFooter`, `GlassFilter` (SVG), `RevealManager` (per-route fade-up reveal with a visibility safety net).

Discipline kept from the brief: hierarchy from size/weight/space; hairlines before shadows; motion ≤ 320ms, ease-out, `prefers-reduced-motion`-aware; visible focus rings everywhere; no AI-startup gradients/glows/3D.

## Content — what's placeholder

All case-study copy is intentionally bracketed (`[ ... ]`) for Breno to replace — **no invented metrics, clients, or outcomes**, per the brief. Image areas are honest empty frames. Impact is framed as "to validate."

To finish v1, replace:

- `[email — to add]` / `[linkedin.com/in/...]` in `components/site-footer.tsx` and `app/contact/page.tsx`
- All `[ ... ]` placeholders in `app/work/service-operations-dashboard/page.tsx` and `app/about/page.tsx`
- Drop a real CV at `public/breno-sampaio-cv.pdf` (the Download CV buttons point at `/breno-sampaio-cv.pdf` — see `components/cv.ts`)
- Wire the contact form's success path to a real handler (Formspree, a serverless function, etc.) in `components/contact-form.tsx`

## Notes

- Built as a static export, so there's no server runtime — the contact form validates client-side and needs an external submit handler.
- The dock uses `backdrop-filter` + an SVG displacement filter; both degrade gracefully where unsupported.
