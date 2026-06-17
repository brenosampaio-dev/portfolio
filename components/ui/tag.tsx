import type { CSSProperties, HTMLAttributes } from "react";

/**
 * Tag — a mono label for domain and discipline. Always neutral; tags never carry colour.
 */
export function Tag({ children, style, ...props }: HTMLAttributes<HTMLSpanElement>) {
  const composed: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    letterSpacing: "0.02em",
    background: "var(--ivory)",
    color: "var(--warm-grey)",
    border: "1px solid var(--stone)",
    borderRadius: "var(--radius-full)",
    padding: "5px 12px",
    ...style,
  };
  return (
    <span style={composed} {...props}>
      {children}
    </span>
  );
}
