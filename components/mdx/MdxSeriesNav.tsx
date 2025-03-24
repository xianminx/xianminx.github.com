import Link from 'next/link'

interface MdxSeriesNavProps {
  currentPost: string
}

export function MdxSeriesNav({ currentPost }: MdxSeriesNavProps) {
  const series = [
    {
      title: 'MDX(1): Writing on the Web: from Markdown to MDX',
      path: '/blog/2025/mdx/2025-03-12-mdx-intro',
      description: 'Introduction to markdown and mdx',
    },
    {
      title: 'MDX(2): GitHub Flavored Markdown Guide',
      path: '/blog/2025/mdx/2025-01-01-gfm',
    },
    {
      title: 'MDX(3): Build a documentation site with Next.js and MDX',
      path: '/blog/2025/mdx/2025-01-13-nextjs-mdx',
    },
    {
      title: 'MDX(4): ContentLayer',
      path: '/blog/2025/mdx/2025-02-28-contentlayer-mdx',
    },
    {
      title: 'MDX(5): Design Code Block Component',
      path: '/blog/2025/mdx/2025-03-05-md-code-block',
    },
    {
      title: 'MDX(6): Support Mermaid in MDX',
      path: '/blog/2025/mdx/2025-03-04-mermaid-mdx',
    },
    {
      title: 'MDX(7): Design Mermaid Plugin',
      path: '/blog/2025/mdx/2025-03-05-mermaid-plugin-design',
    },
  ]

  // Normalize paths by ensuring they start with a slash
  const normalizePath = (path: string) => (path?.startsWith('/') ? path : `/${path}`)
  const normalizedCurrentPost = normalizePath(currentPost)

  return (
    <div className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold">MDX Series</h2>

      <div className="space-y-2">
        <ul className="list-disc pl-4">
          {series.map((post) => (
            <li key={post.path} className="marker:text-gray-400 dark:marker:text-gray-500">
              <Link
                href={post.path}
                className={`block px-2 text-sm text-gray-600 no-underline hover:text-blue-500 hover:no-underline dark:text-gray-400 dark:hover:text-blue-400 ${
                  normalizePath(post.path) === normalizedCurrentPost
                    ? 'rounded-md bg-blue-900/20 py-1 font-medium text-blue-500 dark:bg-blue-900/60 dark:text-blue-400'
                    : ''
                }`}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
