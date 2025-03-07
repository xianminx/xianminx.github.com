import ListLayout from '@/layouts/ListLayoutWithTags'
import { notFound, redirect } from 'next/navigation'
import { getPaginatedPosts, generateStaticParams as getParams } from '../../page-utils'

export { getParams as generateStaticParams }

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params

  const pageNumber = parseInt(page)

  const pageData = getPaginatedPosts(pageNumber, false)

  if (!pageData) {
    return notFound()
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
