import { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'publishedAt', '_status'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Study Guide', value: 'study-guide' },
                { label: 'Template', value: 'template' },
                { label: 'Cheat Sheet', value: 'cheat-sheet' },
                { label: 'Video Tutorial', value: 'video' },
                { label: 'Podcast', value: 'podcast' },
                { label: 'Webinar', value: 'webinar' },
                { label: 'E-book', value: 'ebook' },
              ],
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'downloadFile',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data) =>
                  ['study-guide', 'template', 'cheat-sheet', 'ebook'].includes(data.type),
                description: 'PDF or downloadable file',
              },
            },
            {
              name: 'externalUrl',
              type: 'text',
              admin: {
                condition: (data) => ['video', 'podcast', 'webinar'].includes(data.type),
                description: 'External link (YouTube, Spotify, etc.)',
              },
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'difficulty',
              type: 'select',
              options: [
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' },
              ],
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'duration',
              label: 'Duration (minutes)',
              type: 'number',
              admin: {
                position: 'sidebar',
                description: 'Estimated time to complete/consume',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    slugField(),
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
      defaultValue: false,
    },
    {
      name: 'downloadCount',
      type: 'number',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      defaultValue: 0,
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}
