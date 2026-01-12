import type { Rule } from 'sanity'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
  ],
}
