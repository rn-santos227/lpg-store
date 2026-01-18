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
      name: 'contactNumber',
      title: 'Contact Number',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Support Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email(),
    },

  ],
}
