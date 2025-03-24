'use client'

import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import PageTitle from '@/components/PageTitle'
import { useState } from 'react'

const formatDateCompact = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}

export default function BlogArchive() {
  const posts = allCoreContent(sortPosts(allBlogs)).filter((post) => !post.draft)
  const [isCompact, setIsCompact] = useState(false)

  return (
    <>
      <PageTitle>Blog Archive</PageTitle>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-6 pt-4 md:space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              All blog posts listed chronologically
            </p>
            <button
              onClick={() => setIsCompact(!isCompact)}
              className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 dark:hover:bg-primary-400 rounded-md px-3 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              {isCompact ? 'Show Details' : 'Compact View'}
            </button>
          </div>
        </div>
        <ul className={isCompact ? 'space-y-0.5 py-2' : 'space-y-6 py-4'}>
          {posts.map((post) => (
            <li
              key={post.slug}
              className={isCompact ? 'py-0.5 hover:bg-gray-50 dark:hover:bg-gray-800' : 'py-2'}
            >
              {isCompact ? (
                // Compact view
                <div className="flex items-baseline px-2">
                  <time
                    className="w-20 font-mono text-sm tabular-nums text-gray-500 dark:text-gray-400"
                    dateTime={post.date}
                  >
                    {formatDateCompact(post.date)}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary-500 dark:hover:text-primary-400 truncate text-gray-900 dark:text-gray-100"
                  >
                    {post.title}
                  </Link>
                </div>
              ) : (
                // Detailed view
                <article className="flex items-start space-x-4 px-2">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <time
                        className="font-mono text-sm tabular-nums text-gray-500 dark:text-gray-400"
                        dateTime={post.date}
                      >
                        {formatDateCompact(post.date)}
                      </time>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      )}
                    </div>
                    <h3 className="mt-2 text-xl font-bold leading-8 tracking-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 dark:text-gray-100"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    {post.summary && (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {post.summary}
                      </p>
                    )}
                  </div>
                </article>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
