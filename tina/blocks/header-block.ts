import type { Template } from 'tinacms';

export const headerBlock: Template = {
  name: 'header',
  label: 'Header',
  ui: {
    itemProps: (item) => {
      const level = item?.level ? item.level.toUpperCase() : 'H2';
      return { label: `Header — ${level}` };
    },
  },
  fields: [
    {
      type: 'string',
      name: 'level',
      label: 'Heading Level',
      options: [
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H6', value: 'h6' },
      ],
    },
    {
      type: 'rich-text',
      name: 'heading',
      label: 'Heading',
      overrides: { toolbar: ['bold', 'italic'] },
    },
  ],
};
