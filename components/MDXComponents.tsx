import TOCInline from 'pliny/ui/TOCInline'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import HelloMDX from './hello-mdx'
import CodeBlockRenderer from './CodeBlockRenderer'
import { Tweet } from 'react-tweet'
export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: CodeBlockRenderer,
  table: TableWrapper,
  BlogNewsletterForm,
  HelloMDX,
  Tweet,
}
