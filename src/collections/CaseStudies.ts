import { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { populatePublishedAt } from '../hooks/populatePublishedAt'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'institution', 'publishedAt', '_status'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'case-studies',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'case-studies',
        req,
      }),
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    studentName: true,
    slug: true,
    institution: true,
    studentPhoto: true,
  },
  fields: [
    {
      name: 'studentName',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Student Info',
          fields: [
            {
              name: 'studentPhoto',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'institution',
              type: 'text',
              required: true,
            },
            {
              name: 'major',
              type: 'text',
              required: true,
            },
            {
              name: 'yearInSchool',
              type: 'select',
              required: true,
              options: [
                { label: 'Freshman', value: 'freshman' },
                { label: 'Sophomore', value: 'sophomore' },
                { label: 'Junior', value: 'junior' },
                { label: 'Senior', value: 'senior' },
                { label: 'Graduate', value: 'graduate' },
              ],
            },
            {
              name: 'gpa',
              label: 'GPA (Optional)',
              type: 'number',
              admin: {
                step: 0.01,
                description: 'Current or final GPA',
              },
            },
          ],
        },
        {
          label: 'Story',
          fields: [
            {
              name: 'challenge',
              type: 'textarea',
              required: true,
              admin: {
                description: 'What problem was the student facing?',
              },
            },
            {
              name: 'solution',
              type: 'textarea',
              required: true,
              admin: {
                description: 'How did Horizon help?',
              },
            },
            {
              name: 'outcome',
              type: 'textarea',
              required: true,
              admin: {
                description: 'What were the results?',
              },
            },
            {
              name: 'testimonial',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Student quote',
              },
            },
          ],
        },
        {
          label: 'Metrics & Media',
          fields: [
            {
              name: 'metrics',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g., Grade Improvement',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g., C+ to A-',
                  },
                },
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: '📈 Trend Up', value: 'trend-up' },
                    { label: '⏱️ Time', value: 'clock' },
                    { label: '🎯 Target', value: 'target' },
                    { label: '🏆 Trophy', value: 'trophy' },
                    { label: '📊 Chart', value: 'chart' },
                  ],
                },
              ],
            },
            {
              name: 'beforeAfter',
              type: 'group',
              fields: [
                {
                  name: 'before',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Screenshot or image showing "before" state',
                  },
                },
                {
                  name: 'after',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Screenshot or image showing "after" state',
                  },
                },
              ],
            },
            {
              name: 'videoTestimonial',
              label: 'Video Testimonial URL',
              type: 'text',
              admin: {
                description: 'YouTube or Vimeo embed URL',
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
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Feature this case study on homepage',
      },
      defaultValue: false,
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
