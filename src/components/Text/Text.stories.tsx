import type { Meta, StoryObj } from '@storybook/react';
import { Text, type TextVariant } from './Text';

const meta = {
  title: 'Foundations/Typography',
  component: Text,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { variant: 'body', children: 'The quick brown fox jumps over the lazy dog.' },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const rows: { tag: string; variant: TextVariant; sample: string }[] = [
  { tag: 'Display · 56/600', variant: 'display', sample: 'Service clarity' },
  { tag: 'H1 · 44/600', variant: 'h1', sample: 'Designing for operations' },
  { tag: 'H2 · 32/600', variant: 'h2', sample: 'The problem, stated plainly' },
  { tag: 'H3 · 24/500', variant: 'h3', sample: 'Role and scope' },
  {
    tag: 'Body L · 20/400',
    variant: 'body-lg',
    sample: 'A practical, implementation-aware approach to product.',
  },
  {
    tag: 'Body · 16/400',
    variant: 'body',
    sample: 'Front-desk teams lose time when requests and handovers live across disconnected tools.',
  },
  { tag: 'Small · 14/400', variant: 'small', sample: 'Supporting caption and secondary detail.' },
  { tag: 'Mono label · 12', variant: 'mono', sample: 'B2B · Service Operations · 2026' },
];

/** The full scale. Hierarchy comes from size, weight and space — not colour. */
export const Scale: Story = {
  render: () => (
    <div className="max-w-[840px]">
      {rows.map((r) => (
        <div
          key={r.variant}
          className="flex items-baseline gap-6 border-t border-stone py-4 first:border-t-0"
        >
          <span className="w-[130px] flex-shrink-0 font-mono text-xs text-warm-grey">{r.tag}</span>
          <Text variant={r.variant}>{r.sample}</Text>
        </div>
      ))}
    </div>
  ),
};
