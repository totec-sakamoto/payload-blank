import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import dayjs from 'dayjs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Post, Media } from '@/payload-types'

/**
 * Posts index page component.
 * Displays all published posts in a list format.
 */
export default async function PostsIndex() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Get all posts sorted by published date
  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
    pagination: false,
    sort: '-publishedDate',
  })

  return (
    <div id='page' className='flex h-screen flex-col pt-16'>
      <Header />

      <main className='container mx-auto flex-grow px-4 py-8'>
        <div className='mx-auto max-w-4xl'>
          <h1 className='mb-8 text-4xl font-bold text-gray-900'>Posts</h1>

          {posts.docs.length === 0 ? (
            <div className='py-12 text-center'>
              <p className='text-lg text-gray-600'>まだ投稿がありません。</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-6'>
              {posts.docs.map((post: Post) => {
                const eyecatch =
                  typeof post.eyecatch === 'object'
                    ? (post.eyecatch as Media)
                    : null

                return (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className='card bg-base-100 shadow-sm'>
                    <figure>
                      {eyecatch ? (
                        <Image
                          src={eyecatch.sizes?.thumbnail?.url || ''}
                          width={192}
                          height={192}
                          alt={eyecatch.alt || post.title}
                        />
                      ) : (
                        <Image
                          src={
                            'https://dummyjson.com/image/480x480/282828?text=No+image'
                          }
                          width={192}
                          height={192}
                          alt='No image'
                        />
                      )}
                    </figure>
                    <div className='card-body'>
                      {post.category && (
                        <span className='badge badge-neutral w-24 text-xs'>
                          {post.category}
                        </span>
                      )}
                      <h2 className='card-title'>{post.title}</h2>
                      {post.publishedDate && (
                        <time
                          dateTime={post.publishedDate}
                          className='text-sm text-gray-600'>
                          {dayjs(post.publishedDate).format('YYYY-MM-DD')}
                        </time>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
