import { HOST } from '@/constans/common'
import formatDate from '@/utils/format-date'
import { getBlogPosts } from '@/utils/get-blog-posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MDX from './components/MDX'

export const revalidate = 3600

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) return {}
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    authors: {
      name: 'Kushal Raj G S',
    },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `/blog/${post.slug}`,
      images: `/og?title=${post.metadata.title}`,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return notFound()
  }

  return (
    <main className="relative z-10 flex-1 bg-neutral-50 p-3 pt-10 dark:bg-neutral-950/30 md:px-8 md:pb-10 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-4xl">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: `${HOST}/og?title=${post.metadata.title}`,
              url: `${HOST}/blog/${post.slug}`,
              author: {
                '@type': 'Person',
                name: 'Kushal Raj G S',
              },
            }),
          }}
        />
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl xl:text-5xl mb-4">{post.metadata.title}</h1>
        <div className="mb-8 mt-2 flex items-center justify-between text-sm border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <p className="text-sm opacity-60">{formatDate(post.metadata.publishedAt)}</p>
          <div className="flex items-center gap-2 text-xs opacity-60">
            <span>By Kushal Raj G S</span>
          </div>
        </div>
        <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg">
          <MDX source={post.content} />
        </article>
      </div>
    </main>
  )
}
