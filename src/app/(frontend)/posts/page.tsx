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
        <section className='stack-4'>
          <nav className='breadcrumbs text-sm'>
            <ul>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>Posts</li>
            </ul>
          </nav>

          <h1>Posts</h1>

          {posts.docs.length === 0 ? (
            <div className='alert' role='alert'>
              まだ投稿がありません。
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
                    <figure className='relative h-48'>
                      {eyecatch ? (
                        <Image
                          src={eyecatch.sizes?.thumbnail?.url || ''}
                          fill
                          className='h-full w-full object-cover'
                          alt={eyecatch.alt || post.title}
                        />
                      ) : (
                        <Image
                          src={
                            'https://dummyjson.com/image/320x320/282828?text=No+image'
                          }
                          fill
                          className='h-full w-full object-cover'
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
