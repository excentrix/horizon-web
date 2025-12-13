import type { Block } from 'payload'

export const Waitlist: Block = {
  slug: 'waitlist',
  interfaceName: 'WaitlistBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Join the Waitlist',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Sign up to get early access and rewards.',
    },
  ],
}
