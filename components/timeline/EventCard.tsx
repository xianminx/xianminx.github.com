import React, { useState } from 'react'
import { TimelineEvent } from './TimelineView'

interface EventCardProps {
  event: TimelineEvent
  isSelected: boolean
  onClick: () => void
  categoryColor: string
}

const EventCard: React.FC<EventCardProps> = ({ event, isSelected, onClick, categoryColor }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    // If clicking the link icon/button, don't trigger the card click
    if ((e.target as HTMLElement).closest('a')) {
      e.stopPropagation()
      return
    }
    onClick()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  return (
    <div className="group relative flex items-start">
      {/* Timeline dot */}
      <div
        className={`absolute left-2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-500 bg-white transition-all duration-300 md:left-4 ${
          isSelected
            ? 'scale-125 border-purple-600 bg-purple-50 dark:bg-purple-900/20'
            : 'group-hover:scale-110 group-hover:border-purple-600 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20'
        }`}
      />

      {/* Card */}
      <div
        className={`
          mx-8 w-full cursor-pointer rounded-xl border border-gray-200 bg-gradient-to-br from-white
          to-purple-50/50 p-4 shadow-sm backdrop-blur-sm transition-all duration-300
          ease-out hover:border-purple-200 hover:shadow-md
          hover:shadow-purple-500/10 md:mx-12
          dark:border-gray-800 dark:from-gray-900/80 dark:to-purple-900/20
          dark:hover:border-purple-900 dark:hover:shadow-purple-500/10
          ${
            isSelected
              ? 'border-purple-200 shadow-lg shadow-purple-500/20 dark:border-purple-900 dark:shadow-purple-500/20'
              : ''
          }
        `}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
      >
        {/* Date */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {event.month ? `${event.month} ${event.year}` : event.year}
            </span>
            {event.category && (
              <span
                className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-0.5 text-xs font-medium text-white shadow-sm"
                style={{ backgroundColor: categoryColor }}
              >
                {event.category}
              </span>
            )}
          </div>
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link rounded p-1 text-purple-400 transition-colors hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/50 dark:hover:text-purple-300"
              aria-label="Open external link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>

        {/* Event description */}
        <p className="text-sm text-gray-800 dark:text-gray-200">{event.event}</p>

        {/* References */}
        {event.references && event.references.length > 0 && (
          <div className="mt-2 space-y-1">
            {event.references.map((ref, index) => (
              <a
                key={index}
                href={ref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Reference {index + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventCard
