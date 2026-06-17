"use client";

import Link from "next/link";
import {
  useState,
  type CSSProperties,
  type ButtonHTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from "react";

/**
 * Button — one primary action per view; Deep Moss is the only tint.
 * Ported from the Breno Sampaio design system bundle. Polymorphic: pass `href`
 * to render a navigational anchor (internal → next/link, file/external → <a>),
 * otherwise a real <button>.
 */
type Variant = "primary" | "secondary" | "ghost" | "link";

const base: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: "var(--radius-sm)",
  border: "1px solid transparent",
  padding: "0 20px",
  height: "44px",
  cursor: "pointer",
  userSelect: "none",
  textDecoration: "none",
  boxSizing: "border-box",
  transition:
    "transform var(--duration-base) var(--ease-smooth), background-color var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) var(--ease-smooth), color var(--duration-base) var(--ease-smooth)",
};

const variantStyles: Record<Variant, { rest: CSSProperties; hover: CSSProperties }> = {
  primary: {
    rest: { background: "var(--moss)", color: "var(--ivory)" },
    hover: { background: "var(--moss-dark)", boxShadow: "var(--shadow-card)" },
  },
  secondary: {
    rest: { background: "var(--ivory)", color: "var(--ink)", borderColor: "var(--stone)" },
    hover: { background: "#ffffff", boxShadow: "var(--shadow-subtle)" },
  },
  ghost: {
    rest: { background: "transparent", color: "var(--ink)" },
    hover: { background: "var(--ivory)" },
  },
  link: {
    rest: {
      background: "transparent",
      border: "none",
      padding: 0,
      height: "auto",
      color: "var(--ink)",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      textDecorationColor: "var(--muted-grey)",
    },
    hover: { textDecorationColor: "var(--ink)" },
  },
};

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  variant?: Variant;
  href?: string;
  download?: boolean;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
};

export function Button({
  variant = "primary",
  disabled = false,
  children,
  style,
  href,
  download,
  type = "button",
  ...props
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const v = variantStyles[variant] ?? variantStyles.primary;
  const composed: CSSProperties = {
    ...base,
    ...v.rest,
    ...(hover && !disabled ? v.hover : null),
    ...(pressed && !disabled && variant !== "link" ? { transform: "translateY(1px)" } : null),
    ...(disabled ? { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } : null),
    ...style,
  };

  const interactionHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
  };

  if (href) {
    const isInternal = href.startsWith("/") && !href.includes(".");
    const onClick = props.onClick as ((e: MouseEvent) => void) | undefined;
    if (isInternal && !download) {
      return (
        <Link href={href} style={composed} {...interactionHandlers} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} download={download} style={composed} {...interactionHandlers} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} style={composed} {...interactionHandlers} {...props}>
      {children}
    </button>
  );
}
