'use client'

import type { ReactNode } from 'react'
import Mermaid from './Mermaid'
import CollapsiblePre from './CollapsiblePre'

// Helper function to extract text from the AST
const extractTextFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextFromChildren((children as { props: { children: ReactNode } }).props.children)
  }
  return String(children || '')
}

interface CodeBlockRendererProps {
  children: ReactNode
  [key: string]: unknown
}

const CodeBlockRenderer = ({ children, ...props }: CodeBlockRendererProps) => {
  // Check if children is a code block
  if (
    children &&
    typeof children === 'object' &&
    'props' in children &&
    'type' in children &&
    children.type === 'code'
  ) {
    const codeElement = children as {
      props: { className?: string; children: ReactNode }
    }
    const { className } = codeElement.props
    const match = /language-(\w+)/.exec(className || '')

    // Handle Mermaid diagrams
    if (match && match[1] === 'mermaid') {
      const rawText = extractTextFromChildren(codeElement.props.children)
      return <Mermaid chart={rawText.trim()} />
    }
  }
  return <CollapsiblePre {...props}>{children}</CollapsiblePre>
}

export default CodeBlockRenderer
