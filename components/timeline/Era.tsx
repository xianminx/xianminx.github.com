import React, { useState } from 'react'
import EventCard from './EventCard'
import { TimelineEvent, TimelineEra } from './TimelineView'

// Helper utility function for getting category color
const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    LLM: '#3B82F6', // blue
    GenAI: '#EC4899', // pink
    Ethics: '#EF4444', // red
    MultiAI: '#8B5CF6', // purple
    Business: '#F59E0B', // amber
    Science: '#06B6D4', // cyan
    Healthcare: '#34D399', // emerald
    Tools: '#A855F7', // violet
    RL: '#F97316', // orange
  }

  return colorMap[category] || '#3B82F6' // Default blue
}

interface EraProps {
  era: TimelineEra
  isEven: boolean
}

const Era: React.FC<EraProps> = ({ era, isEven }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(
    era.era === 'Recent AI Revolution (2019-2025)'
  )
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  // Generate a unique ID for the era that can be used for scrolling
  const eraId = `era-${era.era.replace(/\s+/g, '-').toLowerCase()}`

  // Get background color based on era
  const getEraColor = () => {
    if (era.era.includes('Recent'))
      return 'bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 border-l-2 border-blue-500'
    if (era.era.includes('Modern'))
      return 'bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-indigo-950/20 dark:to-indigo-900/10 border-l-2 border-indigo-500'
    if (era.era.includes('Resurgence'))
      return 'bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10 border-l-2 border-purple-500'
    if (era.era.includes('Winter'))
      return 'bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-950/20 dark:to-gray-900/10 border-l-2 border-gray-500'
    if (era.era.includes('Golden'))
      return 'bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 border-l-2 border-amber-500'
    return 'bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-950/20 dark:to-gray-900/10 border-l-2 border-gray-500'
  }

  const handleEventClick = (event: TimelineEvent) => {
    const eventId = `event-${event.year}-${event.event.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`
    setSelectedEventId(selectedEventId === eventId ? null : eventId)
  }

  return (
    <div id={eraId} className="group/era mb-10 pl-6 transition-all duration-500 ease-out sm:pl-8">
      {/* Era header */}
      <div
        className={`
          ${getEraColor()}
          -ml-6 mb-6 transform cursor-pointer rounded-r-lg p-4 shadow-sm backdrop-blur-sm
          transition-all duration-300 ease-out hover:scale-[1.01]
          hover:shadow-md hover:shadow-blue-500/5 sm:-ml-8
          dark:shadow-blue-500/5
        `}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{era.era}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {era.events.length} events •{' '}
              {era.era.includes('Recent') ? 'Detailed monthly timeline' : 'Major milestones'}
            </p>
          </div>
          <button
            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5"
            aria-label={isExpanded ? 'Collapse era' : 'Expand era'}
          >
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Events container with animation */}
      <div
        className={`
          transform-gpu space-y-6 transition-all duration-500 ease-out
          ${isExpanded ? 'opacity-100' : 'h-0 overflow-hidden opacity-0'}
        `}
      >
        {era.events.map((event, index) => {
          const isRecent = era.era === 'Recent AI Revolution (2019-2025)'
          const eventId = `event-${event.year}-${event.event.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`
          const isSelected = eventId === selectedEventId

          // Get category color if available
          const categoryColor = event.category ? getCategoryColor(event.category) : '#3B82F6'

          return (
            <EventCard
              key={`${event.year}-${index}`}
              event={event}
              isRight={true}
              isRecent={isRecent}
              isSelected={isSelected}
              onClick={() => handleEventClick(event)}
              categoryColor={categoryColor}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Era
