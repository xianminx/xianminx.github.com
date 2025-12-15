'use client'

import { useState, ReactNode, useEffect } from 'react'
import Pre from 'pliny/ui/Pre'

interface CollapsiblePreProps {
  children: ReactNode
  maxHeight?: number
  minLines?: number
  [key: string]: unknown
}

// Helper function to extract text from the AST
const extractTextFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextFromChildren((children as { props: { children: ReactNode } }).props.children)
  }
  return String(children || '')
}

// Helper function to count lines in a string
const countLines = (str: string): number => {
  return (str.match(/\n/g) || []).length + 1
}

const CollapsiblePre = ({
  children,
  maxHeight = 300,
  minLines = 15,
  ...props
}: CollapsiblePreProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [shouldBeCollapsible, setShouldBeCollapsible] = useState(false)

  useEffect(() => {
    // Only run line counting on client side to avoid hydration issues
    const codeText = extractTextFromChildren(children)
    const lineCount = countLines(codeText)
    setShouldBeCollapsible(lineCount > minLines)
  }, [children, minLines])

  if (!shouldBeCollapsible) {
    return <Pre {...props}>{children}</Pre>
  }

  return (
    <div className="relative">
      <div
        className={`${
          !isExpanded ? 'max-h-[300px]' : ''
        } relative overflow-hidden transition-all duration-300`}
      >
        <Pre {...props}>{children}</Pre>
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t to-transparent dark:from-gray-950" />
        )}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="hover:text-primary-500 dark:hover:text-primary-400 absolute bottom-2 right-2 rounded-md bg-white px-3 py-1 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-300/20 transition-colors dark:bg-gray-800 dark:text-gray-300"
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  )
}

export default CollapsiblePre
