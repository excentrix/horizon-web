import type { CollectionConfig } from 'payload'

export const Waitlist: CollectionConfig = {
  slug: 'waitlist',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'referralCount', 'createdAt'],
  },
  access: {
    create: () => true,
    read: () => true, // Open for now to check status, might want to lock down later
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'college',
      type: 'text',
      admin: {
        description: 'College or University name',
      },
    },
    {
      name: 'referralCode',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          async ({ value, operation }) => {
            if (operation === 'create' && !value) {
              return Math.random().toString(36).substring(2, 8).toUpperCase()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'referredBy',
      type: 'relationship',
      relationTo: 'waitlist',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'referralCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'tokens',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'completedTasks',
      type: 'array',
      fields: [
        {
          name: 'taskSlug',
          type: 'text',
          required: true,
        },
        {
          name: 'completedAt',
          type: 'date',
          required: true,
        },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
