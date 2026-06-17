import type { ReactNode } from 'react';
import {
  Button,
  ProjectCard,
  Status,
  Tag,
  Text,
  TextField,
} from './components';
import { colors, colorRoles, radius, spacing } from './tokens';

function Section({
  label,
  title,
  note,
  children,
}: {
  label: string;
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-stone py-16">
      <div className="mx-auto max-w-[1080px] px-6">
        <Text variant="mono" as="div" className="mb-2.5 normal-case tracking-[0.08em]">
          {label}
        </Text>
        <Text variant="h2" className="mb-2 text-[26px]">
          {title}
        </Text>
        <p className="mb-10 max-w-[60ch] text-base text-warm-grey">{note}</p>
        {children}
      </div>
    </section>
  );
}

export function App() {
  return (
    <main>
      {/* ---- Masthead ---- */}
      <header className="border-b border-stone pb-14 pt-24">
        <div className="mx-auto max-w-[1080px] px-6">
          <Text variant="mono" as="div" className="tracking-[0.08em]">
            Portfolio Design System · v2
          </Text>
          <h1 className="mt-5 max-w-[16ch] text-[52px] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
            Decide once. Apply everywhere.
          </h1>
          <p className="mt-5 max-w-[54ch] text-[19px] text-warm-grey">
            The tokens and components for Breno Sampaio's portfolio. Built for consistency, so the
            case studies — not the interface — hold attention.
          </p>
        </div>
      </header>

      {/* ---- Color ---- */}
      <Section
        label="Foundations"
        title="Color"
        note="Warm neutral base, not cold white. One accent (Deep Moss) does all the work. Vermilion is held back for a single alert state — when it appears, it means something."
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
          {(Object.keys(colors) as (keyof typeof colors)[]).map((key) => (
            <div key={key} className="overflow-hidden rounded-md border border-stone bg-ivory">
              <div className="h-[84px]" style={{ background: colors[key] }} />
              <div className="px-3.5 py-3">
                <div className="text-sm font-medium text-ink">{key}</div>
                <div className="mt-0.5 font-mono text-xs text-warm-grey">{colors[key]}</div>
                <div className="mt-1.5 text-xs leading-[1.4] text-muted-grey">
                  {colorRoles[key]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Typography ---- */}
      <Section
        label="Foundations"
        title="Typography"
        note="Geist Sans for everything human; Geist Mono for what is technical — metadata, tags, numbers, labels. Hierarchy comes from size, weight and space — almost never from colour."
      >
        <div className="max-w-[840px]">
          {(
            [
              ['Display · 56/600', 'display', 'Service clarity'],
              ['H1 · 44/600', 'h1', 'Designing for operations'],
              ['H2 · 32/600', 'h2', 'The problem, stated plainly'],
              ['H3 · 24/500', 'h3', 'Role and scope'],
              ['Body L · 20/400', 'body-lg', 'A practical, implementation-aware approach to product.'],
              ['Body · 16/400', 'body', 'Front-desk teams lose time when requests and handovers live across disconnected tools.'],
              ['Small · 14/400', 'small', 'Supporting caption and secondary detail.'],
              ['Mono label · 12', 'mono', 'B2B · Service Operations · 2026'],
            ] as const
          ).map(([tag, variant, sample]) => (
            <div
              key={variant}
              className="flex items-baseline gap-6 border-t border-stone py-4 first:border-t-0"
            >
              <span className="w-[130px] flex-shrink-0 font-mono text-xs text-warm-grey">{tag}</span>
              <Text variant={variant}>{sample}</Text>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Spacing & Radius ---- */}
      <Section
        label="Foundations"
        title="Spacing & Radius"
        note="A 4/8 scale gives rhythm; vertical spacing stays on 8px multiples. Radius lives in 16–20px for cards. Nested elements stay concentric: inner radius equals outer minus padding."
      >
        <div className="mb-12 flex flex-wrap items-end gap-6">
          {Object.entries(spacing).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="w-7 rounded-xs bg-moss" style={{ height: value }} />
              <div className="mt-2 font-mono text-xs text-warm-grey">{parseInt(value, 10)}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
          {(['xs', 'sm', 'md', 'lg'] as const).map((key) => (
            <div key={key} className="text-center">
              <div
                className="h-20 border border-stone bg-ivory"
                style={{ borderRadius: radius[key] }}
              />
              <div className="mt-2 font-mono text-xs text-warm-grey">
                {key} · {parseInt(radius[key], 10)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Buttons ---- */}
      <Section
        label="Components"
        title="Buttons"
        note="One primary action per view. Deep Moss carries it; everything else recedes to neutral."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">View selected work</Button>
          <Button variant="secondary">Download CV</Button>
          <Button variant="ghost">Contact</Button>
          <Button variant="link">Next case →</Button>
        </div>
      </Section>

      {/* ---- Tags & Status ---- */}
      <Section
        label="Components"
        title="Tags & Status"
        note="Mono tags label domain and discipline, all neutral. Status stays neutral too — only a genuine exception (an urgent incident) earns Vermilion."
      >
        <div className="mb-6 flex flex-wrap gap-2">
          {['UX Flow', 'Design System', 'Prototype', 'B2B', 'Service Operations', 'Handoff'].map(
            (t) => (
              <Tag key={t}>{t}</Tag>
            ),
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Status variant="urgent">Urgent incident</Status>
          <Status>In progress</Status>
          <Status variant="done">Resolved</Status>
        </div>
      </Section>

      {/* ---- Project card ---- */}
      <Section
        label="Components"
        title="Project card"
        note="Reads like a product, not a Dribbble shot: problem first, role explicit, tags honest. The preview is an honest empty frame until a real screen exists — no faked image. Hover lifts gently, 180ms."
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          <ProjectCard
            title="Service Operations Dashboard"
            problem="Front-desk teams lose visibility when incidents and handovers scatter across tools and informal notes."
            tags={['B2B', 'Service Ops', 'Design System']}
            role="Concept · Product Design, flows, UI · 2026"
          />
          <ProjectCard
            title="Field Service Flow"
            problem="Technicians need to log tasks, evidence and status from the field without extra admin friction."
            tags={['B2B', 'Mobile', 'Prototype']}
            role="Concept · UX flows, prototype · 2026"
          />
        </div>
      </Section>

      {/* ---- Input ---- */}
      <Section
        label="Components"
        title="Input"
        note="Visible focus is non-negotiable — accessibility is part of the craft you're selling. Focus uses the one accent."
      >
        <TextField
          label="Email"
          type="email"
          placeholder="you@example.com"
          help="I read every message. Expect a reply within two days."
        />
      </Section>

      {/* ---- Footer ---- */}
      <footer className="pb-24 pt-12">
        <div className="mx-auto max-w-[1080px] px-6">
          <p className="font-mono text-xs text-muted-grey">
            Breno Sampaio · Portfolio Design System v2 · Geist + warm neutral · One accent (Moss),
            one alert (Vermilion), everything else quiet.
          </p>
        </div>
      </footer>
    </main>
  );
}
