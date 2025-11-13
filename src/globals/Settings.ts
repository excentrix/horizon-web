import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'Horizon',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              required: true,
              defaultValue: 'Transform your learning experience with AI-powered study tools',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
              required: true,
            },
            {
              name: 'supportEmail',
              type: 'email',
            },
            {
              name: 'phoneNumber',
              type: 'text',
            },
            {
              name: 'address',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'social',
              type: 'group',
              fields: [
                { name: 'twitter', type: 'text' },
                { name: 'linkedin', type: 'text' },
                { name: 'instagram', type: 'text' },
                { name: 'facebook', type: 'text' },
                { name: 'youtube', type: 'text' },
                { name: 'discord', type: 'text' },
                { name: 'tiktok', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            {
              name: 'analytics',
              type: 'group',
              fields: [
                {
                  name: 'googleAnalyticsId',
                  label: 'Google Analytics ID',
                  type: 'text',
                  admin: {
                    placeholder: 'G-XXXXXXXXXX',
                  },
                },
                {
                  name: 'googleTagManagerId',
                  label: 'Google Tag Manager ID',
                  type: 'text',
                  admin: {
                    placeholder: 'GTM-XXXXXXX',
                  },
                },
                {
                  name: 'facebookPixelId',
                  label: 'Facebook Pixel ID',
                  type: 'text',
                },
                {
                  name: 'hotjarId',
                  label: 'Hotjar Site ID',
                  type: 'text',
                },
                {
                  name: 'mixpanelToken',
                  label: 'Mixpanel Token',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Announcement Bar',
          fields: [
            {
              name: 'announcementBar',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'message',
                  type: 'text',
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'linkText',
                  type: 'text',
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'linkUrl',
                  type: 'text',
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'backgroundColor',
                  type: 'select',
                  options: [
                    { label: 'Blue', value: 'blue' },
                    { label: 'Green', value: 'green' },
                    { label: 'Orange', value: 'orange' },
                    { label: 'Red', value: 'red' },
                    { label: 'Purple', value: 'purple' },
                  ],
                  defaultValue: 'blue',
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
