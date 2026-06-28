import type { Collection, Template } from 'tinacms';

const heroBlock: Template = {
  name: 'hero',
  label: 'Hero',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      required: true,
      ui: { component: 'textarea' },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
      ui: { component: 'textarea' },
    },
    { name: 'ctaLabel', label: 'CTA Label', type: 'string' },
    { name: 'ctaHref', label: 'CTA Link', type: 'string' },
  ],
};

const worksBlock: Template = {
  name: 'works',
  label: 'Selected Works',
  fields: [
    { name: 'title', label: 'Section Title', type: 'string', required: true },
    {
      name: 'items',
      label: 'Work Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || 'Work item' }),
      },
      fields: [
        { name: 'title', label: 'Title', type: 'string', required: true },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
          ui: { component: 'textarea' },
        },
        { name: 'href', label: 'Link (optional)', type: 'string' },
        { name: 'imageUrl', label: 'Image', type: 'image', required: true },
      ],
    },
  ],
};

const servicesBlock: Template = {
  name: 'services',
  label: 'Services',
  fields: [
    { name: 'title', label: 'Section Title', type: 'string', required: true },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
      ui: { component: 'textarea' },
    },
    {
      name: 'items',
      label: 'Service Cards',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || 'Service' }),
      },
      fields: [
        { name: 'title', label: 'Title', type: 'string', required: true },
        { name: 'imageUrl', label: 'Background Image', type: 'image', required: true },
      ],
    },
  ],
};

const processBlock: Template = {
  name: 'process',
  label: 'Our Process',
  fields: [
    { name: 'title', label: 'Section Title', type: 'string', required: true },
    {
      name: 'description',
      label: 'Subtitle',
      type: 'string',
      ui: { component: 'textarea' },
    },
    { name: 'imageUrl', label: 'Side Image', type: 'image' },
    {
      name: 'items',
      label: 'Process Steps',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || 'Step' }),
      },
      fields: [
        { name: 'title', label: 'Step Title', type: 'string', required: true },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
          ui: { component: 'textarea' },
        },
      ],
    },
  ],
};

const ctaBlock: Template = {
  name: 'cta',
  label: 'CTA / Invest',
  fields: [
    { name: 'title', label: 'Heading', type: 'string', required: true },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
      ui: { component: 'textarea' },
    },
    { name: 'buttonLabel', label: 'Button Label', type: 'string' },
    { name: 'buttonHref', label: 'Button Link', type: 'string' },
    {
      name: 'galleryImages',
      label: 'Gallery Images',
      type: 'image',
      list: true,
    },
    { name: 'featuredImage', label: 'Featured Image', type: 'image' },
  ],
};

const linkFields = [
  { name: 'label', label: 'Label', type: 'string' as const, required: true as const },
  { name: 'href', label: 'Href', type: 'string' as const, required: true as const },
];

export const PageCollection: Collection = {
  name: 'sitePage',
  label: 'Pages',
  path: 'content/page',
  format: 'json',
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === 'home') return '/';
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    { name: 'brand', label: 'Brand Name', type: 'string', required: true },
    { name: 'seoTitle', label: 'SEO Title', type: 'string' },
    {
      name: 'navigation',
      label: 'Navigation Links',
      type: 'object',
      list: true,
      fields: linkFields,
    },
    {
      name: 'footer',
      label: 'Footer',
      type: 'object',
      fields: [
        { name: 'email', label: 'Email', type: 'string', required: true },
        { name: 'instagramHref', label: 'Instagram URL', type: 'string' },
        {
          name: 'links',
          label: 'Footer Links',
          type: 'object',
          list: true,
          fields: linkFields,
        },
      ],
    },
    {
      name: 'blocks',
      label: 'Page Sections',
      type: 'object',
      list: true,
      ui: { visualSelector: true },
      templates: [heroBlock, worksBlock, servicesBlock, processBlock, ctaBlock],
    },
  ],
};
