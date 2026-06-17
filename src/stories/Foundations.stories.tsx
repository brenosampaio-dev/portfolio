import type { Meta, StoryObj } from '@storybook/react';
import { colors, colorRoles, radius, spacing } from '@/tokens';

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Warm neutral base. One accent (Deep Moss) does all the work; Vermilion is alert-only. */
export const Color: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
      {(Object.keys(colors) as (keyof typeof colors)[]).map((key) => (
        <div key={key} className="overflow-hidden rounded-md border border-stone bg-ivory">
          <div className="h-[84px]" style={{ background: colors[key] }} />
          <div className="px-3.5 py-3">
            <div className="text-sm font-medium text-ink">{key}</div>
            <div className="mt-0.5 font-mono text-xs text-warm-grey">{colors[key]}</div>
            <div className="mt-1.5 text-xs leading-[1.4] text-muted-grey">{colorRoles[key]}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/** A 4 / 8 scale gives rhythm; vertical spacing stays on 8px multiples. */
export const Spacing: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {Object.entries(spacing).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="w-7 rounded-xs bg-moss" style={{ height: value }} />
          <div className="mt-2 font-mono text-xs text-warm-grey">{parseInt(value, 10)}</div>
        </div>
      ))}
    </div>
  ),
};

/** Radius lives in 16–20px for cards. Nested elements stay concentric. */
export const Radius: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
      {(['xs', 'sm', 'md', 'lg'] as const).map((key) => (
        <div key={key} className="text-center">
          <div
            className="h-20 border border-stone bg-ivory"
            style={{ borderRadius: radius[key] }}
          />
          <div className="mt-2 font-mono text-xs text-warm-grey">
            {key} · {parseInt(radius[key], 10)}
          </div>
        </div>
      ))}
    </div>
  ),
};
