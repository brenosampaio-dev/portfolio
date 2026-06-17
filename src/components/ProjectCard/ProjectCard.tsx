import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { Tag } from '@/components/Tag';

export interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  /** The work, named like a product — not a Dribbble shot. */
  title: string;
  /** Problem first: what was broken or hard before the work. */
  problem: string;
  /** Honest labels for domain and discipline. */
  tags?: string[];
  /** Role and scope line, e.g. "Concept · Product Design, flows, UI · 2026". */
  role?: string;
  /** Optional preview image. Omit for an honest empty frame — never a faked screenshot. */
  previewSrc?: string;
  /** Caption shown inside the empty frame when no `previewSrc` is given. */
  previewLabel?: string;
}

/**
 * ProjectCard — reads like a product: problem first, role explicit, tags honest.
 * The preview is an honest empty frame until a real screen exists. Hover lifts
 * gently (180ms).
 *
 * @example
 * <ProjectCard
 *   title="Service Operations Dashboard"
 *   problem="Front-desk teams lose visibility when incidents scatter across tools."
 *   tags={['B2B', 'Service Ops', 'Design System']}
 *   role="Concept · Product Design, flows, UI · 2026"
 * />
 */
export function ProjectCard({
  title,
  problem,
  tags = [],
  role,
  previewSrc,
  previewLabel = 'case preview',
  className,
  ...props
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border border-stone bg-ivory',
        'transition-[transform,box-shadow] duration-base ease-smooth',
        'hover:-translate-y-0.5 hover:shadow-card',
        className,
      )}
      {...props}
    >
      <div className="flex h-[150px] items-center justify-center border-b border-stone bg-ivory">
        {previewSrc ? (
          <img src={previewSrc} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-[64%] w-[72%] items-center justify-center rounded-xs border border-muted-grey">
            <span className="font-mono text-[11px] tracking-[0.04em] text-muted-grey">
              {previewLabel}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="text-lg font-semibold tracking-[-0.01em] text-ink">{title}</div>
        <p className="mt-2 text-sm leading-[1.5] text-warm-grey">{problem}</p>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}

        {role && (
          <div className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.04em] text-muted-grey">
            {role}
          </div>
        )}
      </div>
    </div>
  );
}
