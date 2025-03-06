import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

export const postsPerPage = siteMetadata.postsPerPage || 20

export const getPaginatedPosts = (pageNumber: number, includeDrafts = false) => {
  const posts = allCoreContent(sortPosts(allBlogs)).filter((post) => includeDrafts || !post.draft)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  // Return null for invalid page numbers
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return null
  }

  const initialDisplayPosts = posts.slice(
    postsPerPage * (pageNumber - 1),
    postsPerPage * pageNumber
  )

  return {
    posts,
    initialDisplayPosts,
    pagination: {
      currentPage: pageNumber,
      totalPages: totalPages,
    },
  }
}

export const generateStaticParams = async () => {
  const posts = allCoreContent(sortPosts(allBlogs)).filter((post) => !post.draft)
  const totalPages = Math.ceil(posts.length / postsPerPage)
  // Start from page 2 since page 1 is handled by /blog
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: (i + 2).toString() }))
}
