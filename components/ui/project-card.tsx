"use client";

import { useState, type CSSProperties } from "react";
import { Tag } from "./tag";

/**
 * ProjectCard — reads like a product: problem first, role explicit, tags honest.
 * The preview is an honest empty frame until a real screen exists. Hover lifts gently.
 */
interface ProjectCardProps {
  title: string;
  problem: string;
  tags?: string[];
  role?: string;
  previewSrc?: string;
  previewLabel?: string;
  style?: CSSProperties;
}

export function ProjectCard({
  title,
  problem,
  tags = [],
  role,
  previewSrc,
  previewLabel = "case preview",
  style,
}: ProjectCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        overflow: "hidden",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--stone)",
        background: "var(--ivory)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "var(--shadow-card)" : "none",
        transition:
          "transform var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) var(--ease-smooth)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "150px",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--stone)",
          background: "var(--ivory)",
        }}
      >
        {previewSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSrc}
            alt={title}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              height: "64%",
              width: "72%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius-xs)",
              border: "1px solid var(--muted-grey)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "var(--muted-grey)",
              }}
            >
              {previewLabel}
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: "24px" }}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
          }}
        >
          {title}
        </div>
        <p
          style={{
            margin: "8px 0 0",
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            lineHeight: 1.5,
            color: "var(--warm-grey)",
          }}
        >
          {problem}
        </p>
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
        {role && (
          <div
            style={{
              marginTop: "14px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--muted-grey)",
            }}
          >
            {role}
          </div>
        )}
      </div>
    </div>
  );
}
