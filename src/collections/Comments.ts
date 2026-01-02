import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'post', 'createdAt'],
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Author Name',
      admin: {
        description: 'Name from waitlist user',
      },
    },
    {
      name: 'authorEmail',
      type: 'email',
      required: true,
      label: 'Author Email',
      admin: {
        description: 'Email from waitlist user',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Comment',
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: true,
      label: 'Approved',
      admin: {
        description: 'Toggle to moderate comments',
      },
    },
  ],
  timestamps: true,
}
