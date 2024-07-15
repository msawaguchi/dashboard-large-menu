import { useEffect, useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { Item } from '../../services/api'
import { formatDate } from '../../utils/dateFormatter'

import ExpandableSection from '../ExpandableSection'

import './itemEditor.scss'

interface EditFormProps {
  item: Item | null
  onSave: (updatedItem: Item) => void
}

function ItemEditor({ item, onSave }: EditFormProps) {
  const [formData, setFormData] = useState<Item | null>(null)

  useEffect(() => {
    if (item) {
      setFormData({ ...item })
    }
  }, [item])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (formData) {
      const { name, value, type } = e.target
      const newValue = type === 'radio' ? value === 'true' : value
      setFormData({ ...formData, [name]: newValue })
    }
  }

  const handleSave = () => {
    if (formData) {
      onSave(formData)
    }
  }

  if (!formData)
    return (
      <div className="item-editor-container">
        <div className="item-editor-header">
          <h2>Select an item to edit...</h2>
        </div>
      </div>
    )

  return (
    <div className="item-editor-container">
      <div className="item-editor-header">
        <h2>Edit Item Info</h2>
        <button type="button" className="save-button" onClick={handleSave}>
          <BiSave /> Save
        </button>
      </div>

      <form className="edit-form">
        <ExpandableSection title="Item Info">
          <div>
            <label>Item Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={`$${formData.price}`}
              onChange={handleChange}
            />
          </div>
        </ExpandableSection>

        <ExpandableSection title="Internal Item Info">
          <div>
            <label> Internal Name:</label>
            <input
              type="text"
              name="internalName"
              value={formData.internalName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>SKU:</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </div>
          <div>
            <span>Availability:</span>
            <input
              type="radio"
              id="available"
              name="available"
              value="true"
              checked={formData.available}
              onChange={handleChange}
            />
            <label htmlFor="available">Yes</label>
            <input
              type="radio"
              id="unavailable"
              name="available"
              value="false"
              checked={!formData.available}
              onChange={handleChange}
            />
            <label htmlFor="unavailable">No</label>
          </div>
          <div>
            <span>Visible:</span>
            <input
              type="radio"
              id="visible"
              name="visible"
              value="true"
              checked={formData.visible === 1}
              onChange={handleChange}
            />
            <label htmlFor="visible">Yes</label>
            <input
              type="radio"
              id="invisible"
              name="visible"
              value="false"
              checked={formData.visible !== 1}
              onChange={handleChange}
            />
            <label htmlFor="invisible">No</label>
          </div>
          <div>
            <label>Created at:</label>
            <span>{formatDate(formData.created)}</span>
          </div>
          <div>
            <label> Last update:</label>
            <span>{formatDate(formData.updated)}</span>
          </div>
        </ExpandableSection>

        <ExpandableSection title="Images">
          {!formData.images?.length && <label> This item has no Images</label>}
          {formData.images?.map((image, index) => (
            <div key={index} className="image-section">
              <div>
                <label> Imagem URL:</label>
                <input
                  type="text"
                  name={`image-${index}`}
                  value={image.image}
                  onChange={(e) => {
                    const newImages = [...formData.images!]
                    newImages[index].image = e.target.value
                    setFormData({ ...formData, images: newImages })
                  }}
                />
              </div>
            </div>
          ))}
        </ExpandableSection>
      </form>
    </div>
  )
}

export default ItemEditor
