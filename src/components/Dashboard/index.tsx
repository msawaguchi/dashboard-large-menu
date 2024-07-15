import { useEffect, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Item, fetchItems } from '../../services/api'

import ItemEditor from '../ItemEditor'
import List from '../List'

import './dashboard.scss'

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const getItems = async (page: number, query: string) => {
      const data = await fetchItems(page)
      if (data.length === 0) {
        setHasMore(false)
      } else {
        setItems((prevItems) => {
          const filteredItems = data.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase()),
          )
          return [...prevItems, ...filteredItems]
        })
      }
    }

    if (searchQuery.length >= 2) {
      setItems([])
      setPage(1);
      getItems(1, searchQuery)
    } else {
      getItems(page, '')
    }
  }, [page, searchQuery])

  const handleSelectItem = (item: Item) => {
    setSelectedItem(item)
  }

  const handleSaveItem = (updatedItem: Item) => {
    setSelectedItem(updatedItem)
  }

  const loadMoreItems = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <main className="dashboard">
      <div className="input-search-container">
        <BiSearchAlt />
        <input
          type="text"
          className="input-search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search item by name..."
        />
      </div>
      <div className="dashboard-list-editor">
        <List
          items={items}
          hasMore={hasMore}
          loadMore={loadMoreItems}
          onSelectItem={handleSelectItem}
        />
        <ItemEditor item={selectedItem} onSave={handleSaveItem} />
      </div>
    </main>
  )
}

export default Dashboard
