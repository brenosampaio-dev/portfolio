import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    help: 'I read every message. Expect a reply within two days.',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutHelp: Story = {
  args: { help: undefined },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Unavailable' },
};
