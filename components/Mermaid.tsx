'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

// Module-level initialization flag
let mermaidInitialized = false

const initializeMermaid = () => {
  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      logLevel: 'error',
      suppressErrorRendering: true,
      fontFamily:
        'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif',
    })
    mermaidInitialized = true
  }
}

interface ErrorDisplayProps {
  error: Error | string
  code: string
}

const ErrorDisplay = ({ error, code }: ErrorDisplayProps) => (
  <div className="overflow-hidden rounded-lg border border-red-200">
    <details className="group">
      <summary className="cursor-pointer list-none border-b border-red-200 bg-red-50 px-4 py-2">
        <div className="flex items-center">
          <span className="mr-2 text-red-500">⚠️</span>
          <span className="font-medium text-red-700">Mermaid Syntax Error</span>
          <svg
            className="ml-2 h-5 w-5 transform text-red-500 transition-transform group-open:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </summary>
      <div className="border-b border-red-200 bg-red-50 px-4 py-2">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm font-medium text-red-700">
          {typeof error === 'string' ? error : error.message || 'Failed to render diagram'}
        </pre>
      </div>
    </details>
    <div className="bg-gray-50 p-4">
      <pre className="language-mermaid overflow-x-auto text-sm">{code}</pre>
    </div>
  </div>
)

interface MermaidProps {
  chart: string
}

const Mermaid = ({ chart }: MermaidProps) => {
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<Error | string | null>(null)

  useEffect(() => {
    // Initialize mermaid once for the entire application
    initializeMermaid()

    if (typeof chart === 'string') {
      try {
        // Generate a unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        // Here we manually render the mermaid diagram, we can also let mermaid.js to automatically render the diagram
        // by return <pre className="language-mermaid">{chart}</pre>
        mermaid.render(id, chart.trim()).then(
          ({ svg }) => {
            setError(null)
            setSvg(svg)
          },
          (error) => {
            console.error('Mermaid rendering failed:', error)
            setError(error)
            setSvg('')
          }
        )
      } catch (error) {
        console.error('Mermaid error:', error)
        setError(error instanceof Error ? error : 'Failed to render diagram')
        setSvg('')
      }
    }
  }, [chart])

  if (error) {
    return <ErrorDisplay error={error} code={chart} />
  }

  return <div className="mermaid-chart my-4" dangerouslySetInnerHTML={{ __html: svg }} />
}

export default Mermaid
