/**
 * Typed design tokens — the same values defined in `src/styles/tokens.css`,
 * mirrored here for use in TypeScript (charts, canvas, inline styles, tests).
 *
 * CSS remains the source of truth for rendering; this is a typed convenience
 * mirror. Keep the two in sync.
 */

export const colors = {
  ink: '#111111',
  charcoal: '#1C1C1A',
  paper: '#F7F5F0',
  ivory: '#FBFAF7',
  stone: '#E6E2D8',
  warmGrey: '#8A8781',
  mutedGrey: '#C9C5BC',
  moss: '#465242',
  mossDark: '#3A463A',
  vermilion: '#C84A31',
} as const;

export const colorRoles: Record<keyof typeof colors, string> = {
  ink: 'Primary text, titles',
  charcoal: 'Dark surfaces, code',
  paper: 'Main background',
  ivory: 'Cards, raised surfaces',
  stone: 'Borders, dividers',
  warmGrey: 'Secondary text',
  mutedGrey: 'Lines, disabled',
  moss: 'The accent: actions, focus',
  mossDark: 'Accent hover',
  vermilion: 'Alert state only',
};

export const radius = {
  xs: '6px',
  sm: '10px',
  md: '16px',
  lg: '20px',
  full: '999px',
} as const;

export const shadows = {
  subtle: '0 1px 2px rgba(17,17,17,0.04)',
  card: '0 8px 24px rgba(17,17,17,0.06)',
} as const;

/** 4 / 8 rhythm — vertical spacing stays on 8px multiples. */
export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
  24: '96px',
} as const;

export const typography = {
  display: { size: '56px', weight: 600, lineHeight: 1, tracking: '-0.03em' },
  h1: { size: '44px', weight: 600, lineHeight: 1.05, tracking: '-0.025em' },
  h2: { size: '32px', weight: 600, lineHeight: 1.2, tracking: '-0.015em' },
  h3: { size: '24px', weight: 500, lineHeight: 1.3, tracking: '-0.01em' },
  bodyLg: { size: '20px', weight: 400, lineHeight: 1.6, tracking: '0' },
  body: { size: '16px', weight: 400, lineHeight: 1.6, tracking: '0' },
  small: { size: '14px', weight: 400, lineHeight: 1.5, tracking: '0' },
  mono: { size: '12px', weight: 400, lineHeight: 1.4, tracking: '0.05em' },
} as const;

export const fonts = {
  sans: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'Geist Mono', ui-monospace, 'SF Mono', Menlo, monospace",
} as const;

export const motion = {
  ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  duration: '180ms',
  /** Guidance from the system: micro 120–220ms, section reveal 250–400ms. */
  microMs: [120, 220] as const,
  revealMs: [250, 400] as const,
} as const;

export const tokens = {
  colors,
  colorRoles,
  radius,
  shadows,
  spacing,
  typography,
  fonts,
  motion,
} as const;

export type Tokens = typeof tokens;
