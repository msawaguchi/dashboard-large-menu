import React, { useState } from 'react'
import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi'

import './expandableSection.scss'

interface ExpandableSectionProps {
  title: string
  children: React.ReactNode
}

function ExpandableSection({ title, children }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={`expandable-section ${isExpanded && 'shadow'}`}>
      <button
        onClick={toggleExpand}
        className={`expandable-title ${!isExpanded && 'shadow expanded'}`}
      >
        {isExpanded ? <BiSolidDownArrow /> : <BiSolidRightArrow />} {title}
      </button>
      {isExpanded && <div className="expandable-content">{children}</div>}
    </div>
  )
}

export default ExpandableSection
