import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users, Posts, Media } from '@/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      logout: {
        Button: './components/admin/LogoutButton',
      },
    },
    livePreview: {
      url: ({ data, req, collectionConfig }) =>
        `${req.protocol}//${req.host}/${collectionConfig?.slug}/${data.slug}`,
      collections: ['posts'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 812,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
      ],
    },
  },
  collections: [Users, Posts, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url:
        process.env.DATABASE_URI ||
        `file:${path.resolve(dirname, 'payload.db')}`,
    },
  }),
  sharp,
})
