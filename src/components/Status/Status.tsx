import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type StatusVariant = 'default' | 'urgent' | 'done';

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * `default` (neutral, in progress) · `done` (resolved, ✓) ·
   * `urgent` — the only variant that earns Vermilion. Reserve it for a genuine
   * exception (e.g. an urgent incident); when it shows up, it should mean something.
   * @default 'default'
   */
  variant?: StatusVariant;
  children: ReactNode;
}

const container: Record<StatusVariant, string> = {
  default: 'border-stone bg-ivory text-warm-grey',
  done: 'border-stone bg-ivory text-warm-grey',
  urgent: 'border-vermilion/20 bg-vermilion/[0.07] text-vermilion',
};

function Indicator({ variant }: { variant: StatusVariant }) {
  if (variant === 'done') {
    return <span className="text-[11px] leading-none text-warm-grey">✓</span>;
  }
  return (
    <span
      aria-hidden
      className={cn(
        'h-1.5 w-1.5 rounded-full',
        variant === 'urgent' ? 'bg-vermilion' : 'bg-muted-grey',
      )}
    />
  );
}

/**
 * Status — neutral by default; colour only for the exception.
 *
 * @example
 * <Status>In progress</Status>
 * <Status variant="done">Resolved</Status>
 * <Status variant="urgent">Urgent incident</Status>
 */
export function Status({ variant = 'default', className, children, ...props }: StatusProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-xs',
        'rounded-full border px-3 py-[5px]',
        container[variant],
        className,
      )}
      {...props}
    >
      <Indicator variant={variant} />
      {children}
    </span>
  );
}
