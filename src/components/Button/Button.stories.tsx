import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'link'],
    },
    disabled: { control: 'boolean' },
  },
  args: { children: 'View selected work', variant: 'primary' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Download CV' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Contact' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Next case →' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Unavailable' },
};

/** One primary action per view; everything else recedes to neutral. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">View selected work</Button>
      <Button variant="secondary">Download CV</Button>
      <Button variant="ghost">Contact</Button>
      <Button variant="link">Next case →</Button>
    </div>
  ),
};
