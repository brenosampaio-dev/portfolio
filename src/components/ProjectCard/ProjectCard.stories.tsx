import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from './ProjectCard';

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    title: 'Service Operations Dashboard',
    problem:
      'Front-desk teams lose visibility when incidents and handovers scatter across tools and informal notes.',
    tags: ['B2B', 'Service Ops', 'Design System'],
    role: 'Concept · Product Design, flows, UI · 2026',
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Honest empty frame until a real screen exists — no faked screenshot. */
export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-[340px]">
        <Story />
      </div>
    ),
  ],
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      <ProjectCard
        title="Service Operations Dashboard"
        problem="Front-desk teams lose visibility when incidents and handovers scatter across tools and informal notes."
        tags={['B2B', 'Service Ops', 'Design System']}
        role="Concept · Product Design, flows, UI · 2026"
      />
      <ProjectCard
        title="Field Service Flow"
        problem="Technicians need to log tasks, evidence and status from the field without extra admin friction."
        tags={['B2B', 'Mobile', 'Prototype']}
        role="Concept · UX flows, prototype · 2026"
      />
    </div>
  ),
};
