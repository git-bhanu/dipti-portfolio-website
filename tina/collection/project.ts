import type { Collection } from 'tinacms';
import { headerBlock } from '../blocks/header-block';
import { imageBlock } from '../blocks/image-block';
import { spaceBlock } from '../blocks/space-block';
import { twoColumnTextBlock } from '../blocks/two-column-text-block';
import { videoBlock } from '../blocks/video-block';

export const ProjectCollection: Collection = {
  name: 'project',
  label: 'Projects',
  path: 'content/project',
  format: 'json',
  ui: {
    router: ({ document }) => `/projects?project=${document._sys.filename}`,
  },
  fields: [
    {
      type: 'rich-text',
      name: 'title',
      label: 'Title',
      required: true,
      overrides: { toolbar: ['bold', 'italic'] },
    },
    {
      type: 'number',
      name: 'sortOrder',
      label: 'Sort Order',
      description: 'Lower numbers appear first.',
    },
    {
      type: 'string',
      name: 'slug',
      label: 'URL Slug',
      description: 'Lowercase, hyphens only.',
    },
    {
      type: 'image',
      name: 'image',
      label: 'Hero Image',
    },
    {
      type: 'string',
      name: 'imageAlt',
      label: 'Hero Image Alt Text',
    },
    {
      type: 'image',
      name: 'cardImage',
      label: 'Card Image',
      description: 'Optional. Overrides Hero Image in the grid.',
    },
    {
      type: 'string',
      name: 'cardImageAlt',
      label: 'Card Image Alt Text',
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Date',
      ui: { dateFormat: 'DD MMMM YYYY' },
    },
    {
      type: 'string',
      name: 'category',
      label: 'Category',
    },
    {
      type: 'rich-text',
      name: 'description',
      label: 'Short Description',
      description: 'Shown in the card and at top of detail view.',
    },
    {
      type: 'object',
      name: 'blocks',
      label: 'Content Blocks',
      list: true,
      ui: { visualSelector: true },
      templates: [headerBlock, twoColumnTextBlock, imageBlock, videoBlock, spaceBlock],
    },
  ],
};
