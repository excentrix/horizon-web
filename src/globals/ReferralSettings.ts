import { GlobalConfig } from 'payload'

export const ReferralSettings: GlobalConfig = {
  slug: 'referral-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tokenValuePerReferral',
      type: 'number',
      defaultValue: 10,
      required: true,
      label: 'Tokens per Referral',
    },
    {
      name: 'referralBonusPercentage',
      type: 'number',
      defaultValue: 10,
      required: true,
      label: 'Referral Bonus % (Kickback)',
      admin: {
        description: 'Percentage of tokens the referrer gets when a referee completes a task',
      },
    },
    {
      name: 'milestones',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'count',
          type: 'number',
          required: true,
          label: 'Referrals Needed',
          admin: {
            description: 'Number of referrals required to unlock this reward',
          },
        },
        {
          name: 'reward',
          type: 'text',
          required: true,
          label: 'Reward Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Reward Image',
        },
      ],
    },
    {
      name: 'tasks',
      type: 'array',
      label: 'Available Tasks',
      fields: [
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'Unique identifier for the task (e.g., "follow-twitter")',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'rewardTokens',
          type: 'number',
          required: true,
          defaultValue: 50,
        },
        {
          name: 'verificationType',
          type: 'select',
          options: [
            { label: 'Manual/Click', value: 'click' },
            { label: 'Input Verification', value: 'input' },
          ],
          defaultValue: 'click',
        },
      ],
    },
  ],
}
