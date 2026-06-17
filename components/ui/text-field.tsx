"use client";

import { useId, useState, type CSSProperties, type InputHTMLAttributes } from "react";

/**
 * TextField — labelled input with a non-negotiable visible focus ring (Moss).
 */
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  help?: string;
  containerStyle?: CSSProperties;
}

export function TextField({ label, help, id, style, containerStyle, ...props }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const reactId = useId();
  const inputId = id || `tf-${reactId}`;
  const helpId = help ? `${inputId}-help` : undefined;

  return (
    <div style={{ maxWidth: "420px", ...containerStyle }}>
      <label
        htmlFor={inputId}
        style={{
          display: "block",
          marginBottom: "8px",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--ink)",
        }}
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={helpId}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        style={{
          width: "100%",
          fontFamily: "var(--font-sans)",
          fontSize: "16px",
          color: "var(--ink)",
          background: "var(--ivory)",
          border: `1px solid ${focused ? "var(--moss)" : "var(--stone)"}`,
          borderRadius: "var(--radius-sm)",
          padding: "12px 14px",
          outline: "none",
          boxShadow: focused ? "0 0 0 3px var(--ring-moss)" : "none",
          transition:
            "border-color var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) var(--ease-smooth)",
          ...style,
        }}
        {...props}
      />
      {help && (
        <p
          id={helpId}
          style={{
            margin: "8px 0 0",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            color: "var(--warm-grey)",
          }}
        >
          {help}
        </p>
      )}
    </div>
  );
}
