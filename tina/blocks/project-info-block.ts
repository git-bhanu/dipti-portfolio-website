import type { Template } from 'tinacms';

export const projectInfoBlock: Template = {
  name: 'projectInfo',
  label: 'Project Info',
  fields: [
    {
      type: 'object',
      name: 'leftItems',
      label: 'Left Column Items',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.label || 'Item' }),
      },
      fields: [
        {
          type: 'string',
          name: 'label',
          label: 'Label',
          description: 'E.g. SERVICES, CLIENT, YEAR',
        },
        {
          type: 'rich-text',
          name: 'value',
          label: 'Value',
          overrides: { toolbar: ['bold', 'italic'] },
        },
      ],
    },
    {
      type: 'rich-text',
      name: 'infoText',
      label: 'Info Text (Right Column)',
      overrides: { toolbar: ['bold', 'italic'] },
    },
    {
      type: 'string',
      name: 'liveSiteUrl',
      label: 'Live Site URL',
      description: 'Optional. Shows "See live project" link.',
    },
  ],
};
