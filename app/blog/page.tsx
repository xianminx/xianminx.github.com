import { getPaginatedPosts } from './page-utils'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const pageData = getPaginatedPosts(1, false)

  // This should never happen for page 1, but included for consistency
  if (!pageData) {
    return null
  }

  return (
    <ListLayout
      posts={pageData.posts}
      initialDisplayPosts={pageData.initialDisplayPosts}
      pagination={pageData.pagination}
      title="All Posts"
    />
  )
}
