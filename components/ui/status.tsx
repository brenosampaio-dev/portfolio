import type { CSSProperties, HTMLAttributes } from "react";

/**
 * Status — neutral by default; colour only for the exception.
 * `urgent` is the only variant that earns Vermilion.
 */
type StatusVariant = "default" | "done" | "urgent";

const container: Record<StatusVariant, CSSProperties> = {
  default: { borderColor: "var(--stone)", background: "var(--ivory)", color: "var(--warm-grey)" },
  done: { borderColor: "var(--stone)", background: "var(--ivory)", color: "var(--warm-grey)" },
  urgent: {
    borderColor: "var(--vermilion-border)",
    background: "var(--vermilion-wash)",
    color: "var(--vermilion)",
  },
};

function Indicator({ variant }: { variant: StatusVariant }) {
  if (variant === "done") {
    return <span style={{ fontSize: "11px", lineHeight: 1, color: "var(--warm-grey)" }}>✓</span>;
  }
  return (
    <span
      aria-hidden="true"
      style={{
        height: "6px",
        width: "6px",
        borderRadius: "var(--radius-full)",
        background: variant === "urgent" ? "var(--vermilion)" : "var(--muted-grey)",
      }}
    />
  );
}

interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatusVariant;
}

export function Status({ variant = "default", children, style, ...props }: StatusProps) {
  const composed: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    borderRadius: "var(--radius-full)",
    border: "1px solid",
    padding: "5px 12px",
    ...container[variant],
    ...style,
  };
  return (
    <span style={composed} {...props}>
      <Indicator variant={variant} />
      {children}
    </span>
  );
}
