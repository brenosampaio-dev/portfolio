import type { Meta, StoryObj } from '@storybook/react';
import { Status } from './Status';

const meta = {
  title: 'Components/Status',
  component: Status,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'urgent', 'done'] },
  },
  args: { children: 'In progress', variant: 'default' },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Done: Story = {
  args: { variant: 'done', children: 'Resolved' },
};

/** The only variant that earns Vermilion — reserve it for a genuine exception. */
export const Urgent: Story = {
  args: { variant: 'urgent', children: 'Urgent incident' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Status variant="urgent">Urgent incident</Status>
      <Status>In progress</Status>
      <Status variant="done">Resolved</Status>
    </div>
  ),
};
