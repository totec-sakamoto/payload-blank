import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import dayjs from 'dayjs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Post, Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Individual post page component.
 * Displays a single post based on the slug parameter.
 */
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find the post by slug
  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (posts.docs.length === 0) {
    notFound()
  }

  const post: Post = posts.docs[0]
  const eyecatch =
    typeof post.eyecatch === 'object' ? (post.eyecatch as Media) : null

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
              <li>
                <Link href='/posts'>Posts</Link>
              </li>
              <li>{post.title}</li>
            </ul>
          </nav>

          <article className='stack-4'>
            {/* Hero image */}
            {eyecatch && (
              <div className='relative h-80'>
                <Image
                  src={eyecatch.url || ''}
                  fill
                  className='h-full w-full object-cover'
                  alt={eyecatch.alt || post.title}
                />
              </div>
            )}

            <header className='stack-2'>
              <div className='flex gap-4'>
                {post.category && (
                  <span className='badge badge-neutral w-32'>
                    {post.category}
                  </span>
                )}
              </div>

              <h1>{post.title}</h1>

              <div className='flex gap-4'>
                {post.publishedDate && (
                  <time dateTime={post.publishedDate}>
                    {dayjs(post.publishedDate).format('YYYY-MM-DD')}
                  </time>
                )}
              </div>
            </header>

            {/* Post content */}
            {post.content ? (
              <RichText data={post.content} className='stack-3' />
            ) : (
              <div>コンテンツがありません。</div>
            )}
          </article>

          <div>
            <Link href='/posts' className='btn'>
              <i className='bi-chevron-left'></i>
              Posts
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

/**
 * Generate metadata for SEO (optional)
 */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (posts.docs.length === 0) {
    return {
      title: 'Post Not Found',
    }
  }

  const post: Post = posts.docs[0]
  const eyecatch =
    typeof post.eyecatch === 'object' ? (post.eyecatch as Media) : null

  // Extract description from content safely (in case `description` field is empty)
  const getContentDescription = (content: Post['content']): string => {
    if (!content?.root?.children) return ''

    for (const child of content.root.children) {
      if (
        child.type === 'paragraph' &&
        child.children &&
        Array.isArray(child.children)
      ) {
        for (const textNode of child.children) {
          if (textNode.type === 'text' && textNode.text) {
            return textNode.text.substring(0, 120)
          }
        }
      }
    }
    return ''
  }

  const description = post.description || getContentDescription(post.content)

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: eyecatch?.url ? [eyecatch.url] : undefined,
    },
  }
}
