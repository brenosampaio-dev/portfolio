import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body-lg'
  | 'body'
  | 'small'
  | 'mono';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /**
   * Type role from the scale. Hierarchy comes from size, weight and space —
   * almost never from colour. Tracking tightens as type grows.
   * @default 'body'
   */
  variant?: TextVariant;
  /** Render as a different element. Sensible default per variant otherwise. */
  as?: ElementType;
  children: ReactNode;
}

const styles: Record<TextVariant, string> = {
  display: 'font-sans text-[56px] font-semibold leading-none tracking-[-0.03em] text-ink',
  h1: 'font-sans text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] text-ink',
  h2: 'font-sans text-[32px] font-semibold tracking-[-0.015em] text-ink',
  h3: 'font-sans text-[24px] font-medium tracking-[-0.01em] text-ink',
  'body-lg': 'font-sans text-[20px] font-normal text-ink',
  body: 'font-sans text-base font-normal text-ink',
  small: 'font-sans text-sm font-normal text-warm-grey',
  mono: 'font-mono text-xs uppercase tracking-[0.05em] text-warm-grey',
};

const defaultTag: Record<TextVariant, ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  'body-lg': 'p',
  body: 'p',
  small: 'p',
  mono: 'span',
};

/**
 * Text — the type scale as a component. Geist Sans for everything human;
 * Geist Mono for what is technical (metadata, tags, numbers, labels).
 *
 * @example
 * <Text variant="display">Service clarity</Text>
 * <Text variant="mono">B2B · Service Operations · 2026</Text>
 */
export function Text({ variant = 'body', as, className, ...props }: TextProps) {
  const Component = as ?? defaultTag[variant];
  return <Component className={cn(styles[variant], className)} {...props} />;
}
