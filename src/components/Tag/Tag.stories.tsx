import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: 'Design System' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Mono tags label domain and discipline — all neutral, never coloured. */
export const Group: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['UX Flow', 'Design System', 'Prototype', 'B2B', 'Service Operations', 'Handoff'].map(
        (t) => (
          <Tag key={t}>{t}</Tag>
        ),
      )}
    </div>
  ),
};
