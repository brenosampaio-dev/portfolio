import type { Preview } from '@storybook/react';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Paper',
      values: [
        { name: 'Paper', value: '#F7F5F0' },
        { name: 'Ivory', value: '#FBFAF7' },
        { name: 'Charcoal', value: '#1C1C1A' },
      ],
    },
  },
};

export default preview;
