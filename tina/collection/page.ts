import type { Collection } from 'tinacms';

const linkFields = [
  {
    name: 'label',
    label: 'Label',
    type: 'string',
    required: true,
  },
  {
    name: 'href',
    label: 'Href',
    type: 'string',
    required: true,
  },
] as const;

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
    {
      name: 'brand',
      label: 'Brand Name',
      type: 'string',
      required: true,
    },
    {
      name: 'seoTitle',
      label: 'SEO Title',
      type: 'string',
      required: true,
    },
    {
      name: 'locationTag',
      label: 'Location Tag',
      type: 'string',
      required: true,
    },
    {
      name: 'navigation',
      label: 'Navigation',
      type: 'object',
      list: true,
      fields: [...linkFields],
    },
    {
      name: 'hero',
      label: 'Hero',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          type: 'string',
          required: true,
        },
        {
          name: 'title',
          type: 'string',
          ui: {
            component: 'textarea',
          },
          required: true,
        },
        {
          name: 'description',
          type: 'string',
          ui: {
            component: 'textarea',
          },
          required: true,
        },
        {
          name: 'formTitle',
          type: 'string',
          required: true,
        },
        {
          name: 'nameLabel',
          type: 'string',
          required: true,
        },
        {
          name: 'namePlaceholder',
          type: 'string',
          required: true,
        },
        {
          name: 'emailLabel',
          type: 'string',
          required: true,
        },
        {
          name: 'emailPlaceholder',
          type: 'string',
          required: true,
        },
        {
          name: 'locationLabel',
          type: 'string',
          required: true,
        },
        {
          name: 'locationPlaceholder',
          type: 'string',
          required: true,
        },
        {
          name: 'submitLabel',
          type: 'string',
          required: true,
        },
      ],
    },
    {
      name: 'works',
      label: 'Works Section',
      type: 'object',
      fields: [
        {
          name: 'kicker',
          type: 'string',
          required: true,
        },
        {
          name: 'title',
          type: 'string',
          required: true,
        },
        {
          name: 'ctaLabel',
          type: 'string',
          required: true,
        },
        {
          name: 'ctaHref',
          type: 'string',
          required: true,
        },
        {
          name: 'items',
          label: 'Work Items',
          type: 'object',
          list: true,
          fields: [
            {
              name: 'title',
              type: 'string',
              required: true,
            },
            {
              name: 'description',
              type: 'string',
              ui: {
                component: 'textarea',
              },
              required: true,
            },
            {
              name: 'href',
              type: 'string',
            },
            {
              name: 'imageUrl',
              type: 'string',
              required: true,
            },
            {
              name: 'eyebrow',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'services',
      label: 'Services Section',
      type: 'object',
      fields: [
        {
          name: 'kicker',
          type: 'string',
          required: true,
        },
        {
          name: 'title',
          type: 'string',
          required: true,
        },
        {
          name: 'description',
          type: 'string',
          ui: {
            component: 'textarea',
          },
          required: true,
        },
        {
          name: 'items',
          label: 'Services',
          type: 'object',
          list: true,
          fields: [
            {
              name: 'title',
              type: 'string',
              required: true,
            },
            {
              name: 'description',
              type: 'string',
              ui: {
                component: 'textarea',
              },
              required: true,
            },
            {
              name: 'images',
              label: 'Images',
              type: 'string',
              list: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'process',
      label: 'Process Section',
      type: 'object',
      fields: [
        {
          name: 'kicker',
          type: 'string',
          required: true,
        },
        {
          name: 'title',
          type: 'string',
          required: true,
        },
        {
          name: 'imageUrl',
          type: 'string',
          required: true,
        },
        {
          name: 'items',
          label: 'Process Steps',
          type: 'object',
          list: true,
          fields: [
            {
              name: 'title',
              type: 'string',
              required: true,
            },
            {
              name: 'description',
              type: 'string',
              ui: {
                component: 'textarea',
              },
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      label: 'CTA Section',
      type: 'object',
      fields: [
        {
          name: 'kicker',
          type: 'string',
          required: true,
        },
        {
          name: 'title',
          type: 'string',
          required: true,
        },
        {
          name: 'description',
          type: 'string',
          ui: {
            component: 'textarea',
          },
          required: true,
        },
        {
          name: 'buttonLabel',
          type: 'string',
          required: true,
        },
        {
          name: 'buttonHref',
          type: 'string',
          required: true,
        },
        {
          name: 'caption',
          type: 'string',
          ui: {
            component: 'textarea',
          },
          required: true,
        },
        {
          name: 'galleryImages',
          type: 'string',
          list: true,
          required: true,
        },
        {
          name: 'featuredImage',
          type: 'string',
          required: true,
        },
      ],
    },
    {
      name: 'footer',
      label: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'links',
          label: 'Footer Links',
          type: 'object',
          list: true,
          fields: [...linkFields],
        },
        {
          name: 'email',
          type: 'string',
          required: true,
        },
        {
          name: 'instagramHref',
          type: 'string',
          required: true,
        },
      ],
    },
  ],
};
