import { useState, useRef, useCallback } from 'react'
import { Item } from '../../services/api'

import ListItem from '../ListItem'

import './list.scss'

interface ListProps {
  items: Item[]
  hasMore: boolean
  loadMore: () => void
  onSelectItem: (item: Item) => void
}

function List({
  items,
  hasMore,
  loadMore,
  onSelectItem,
}: ListProps) {
  const observer = useRef<IntersectionObserver | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

  const handleSelectItem = (item: Item) => {
    setSelectedItemId(item.id)
    onSelectItem(item)
  }

  const lastItemRef = useCallback(
    (node: HTMLLIElement) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore, loadMore],
  )
  
  return (
    <div className="list-container">
      <div className="list-header">
        <small>Item Name</small> <small>Price</small>
      </div>
      <ul className="list">
        {items.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            isSelected={item.id === selectedItemId}
            onSelect={() => handleSelectItem(item)}
            ref={index === items.length - 1 ? lastItemRef : null}
          />
        ))}
      </ul>
    </div>
  )
}

export default List
