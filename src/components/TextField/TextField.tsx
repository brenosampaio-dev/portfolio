import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label — always present; accessibility is part of the craft. */
  label: string;
  /** Helper text shown beneath the field. */
  help?: string;
  /** Wrapper className (the field caps at 420px by default). */
  containerClassName?: string;
}

/**
 * TextField — labelled input with a non-negotiable visible focus ring (the one
 * accent, Moss). Label, input and help are wired together for screen readers.
 *
 * @example
 * <TextField label="Email" type="email" placeholder="you@example.com"
 *   help="I read every message. Expect a reply within two days." />
 */
export function TextField({
  label,
  help,
  id,
  className,
  containerClassName,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helpId = help ? `${inputId}-help` : undefined;

  return (
    <div className={cn('max-w-[420px]', containerClassName)}>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={helpId}
        className={cn(
          'w-full font-sans text-base text-ink',
          'rounded-sm border border-stone bg-ivory px-3.5 py-3',
          'transition-[border-color,box-shadow] duration-base ease-smooth',
          'placeholder:text-muted-grey',
          'focus:border-moss focus:outline-none focus:shadow-[0_0_0_3px_var(--ring-moss)]',
          className,
        )}
        {...props}
      />
      {help && (
        <p id={helpId} className="mt-2 text-[13px] text-warm-grey">
          {help}
        </p>
      )}
    </div>
  );
}
