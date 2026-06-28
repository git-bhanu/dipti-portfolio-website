import type { Template } from 'tinacms';

export const twoColumnTextBlock: Template = {
  name: 'twoColumnText',
  label: 'Two Column Text',
  fields: [
    {
      type: 'rich-text',
      name: 'leftColumn',
      label: 'Left Column',
      overrides: { toolbar: ['bold', 'italic'] },
    },
    {
      type: 'rich-text',
      name: 'rightColumn',
      label: 'Right Column',
      overrides: { toolbar: ['bold', 'italic'] },
    },
  ],
};
