/* eslint-disable react/display-name */
import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { Item } from '../../services/api'
import { priceFormatter } from '../../utils/priceFormatter'

import './listItem.scss'

interface ListItemProps {
  item: Item
  isSelected: boolean
  onSelect: (id: number) => void
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ item, onSelect, isSelected }, ref) => {
    return (
      <li
        key={item.id}
        ref={ref}
        className={`item-container ${isSelected ? 'selected' : ''}`}
      >
        <div className="item-content">
          {item.name}
          <span className="price"> {priceFormatter(item.price)}</span>
        </div>
        <button className="edit-button" onClick={() => onSelect(item.id)}>
          <BiEditAlt /> Edit
        </button>
      </li>
    )
  },
)

export default ListItem
