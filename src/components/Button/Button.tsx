import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual emphasis. Use exactly one `primary` per view — Deep Moss carries
   * the single primary action; everything else recedes to neutral.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center font-sans text-[15px] font-medium ' +
  'rounded-sm border border-transparent px-5 h-11 cursor-pointer select-none ' +
  'transition-[transform,background-color,box-shadow] duration-base ease-smooth ' +
  'active:translate-y-px ' +
  'focus-visible:outline-2 focus-visible:outline-moss focus-visible:outline-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-moss text-ivory hover:bg-moss-dark hover:shadow-card',
  secondary: 'bg-ivory text-ink border-stone hover:bg-white hover:shadow-subtle',
  ghost: 'bg-transparent text-ink hover:bg-ivory',
  link:
    'bg-transparent border-none p-0 h-auto text-ink underline underline-offset-4 ' +
    'decoration-muted-grey hover:decoration-ink',
};

/**
 * Button — one primary action per view; Deep Moss is the only tint.
 *
 * @example
 * <Button variant="primary">View selected work</Button>
 * <Button variant="secondary">Download CV</Button>
 */
export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(base, variants[variant], className)} {...props} />;
}
