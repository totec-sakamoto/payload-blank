import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'category',
      type: 'select',
      options: ['コラム', 'その他'],
    },
    {
      name: 'eyecatch',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
