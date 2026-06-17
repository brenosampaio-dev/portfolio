import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/**
 * Tag — a mono label for domain and discipline. Always neutral; tags never
 * carry colour. Used for things like "B2B", "Design System", "Prototype".
 *
 * @example
 * <Tag>Design System</Tag>
 */
export function Tag({ className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex font-mono text-xs tracking-[0.02em]',
        'bg-ivory text-warm-grey border border-stone rounded-full px-3 py-[5px]',
        className,
      )}
      {...props}
    />
  );
}
