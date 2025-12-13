import type { CollectionConfig } from 'payload'

export const Colleges: CollectionConfig = {
  slug: 'colleges',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt'],
  },
  access: {
    create: () => true, // Allow anyone to add colleges
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
