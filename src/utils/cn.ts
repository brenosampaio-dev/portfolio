import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind-aware conflict resolution.
 * Later utilities win (e.g. `cn('px-4', 'px-6')` → `px-6`), so component
 * defaults can always be overridden via a `className` prop.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
