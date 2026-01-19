import type { Rule } from 'sanity'

export default {
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: (Rule: Rule) => Rule.required().min(10),
    },
    {
      name: 'contactNumbers',
      title: 'Contact Numbers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'number' },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: 'email',
      title: 'Support Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email(),
    },
    {
      name: 'operationsHours',
      title: 'Operations Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Day',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'hours',
              title: 'Hours',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'hours' },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: 'mapEmbedUrl',
      title: 'Google Map Embed URL',
      type: 'url',
      description:
        'Paste the Google Maps embed link (https://www.google.com/maps/embed?...).',
    },
    {
      name: 'mapLink',
      title: 'Google Map Link',
      type: 'url',
      description: 'Optional: link to open the map in a new tab.',
    },
  ],
  preview: {
    select: {
      title: 'address',
      subtitle: 'contactNumber',
    },
  },
}
