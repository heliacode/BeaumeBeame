import { useDrag, useDrop } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'

export default function DraggableComponent({
  component,
  index,
  isSelected,
  onSelect,
  onDelete,
  onMove,
  children,
}) {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'canvas-component',
    item: { id: component.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'canvas-component',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      onMove(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      onClick={() => onSelect(component.id)}
      className={`relative group ${
        isSelected
          ? 'ring-2 ring-primary-500 ring-offset-2'
          : 'hover:ring-1 hover:ring-gray-300'
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      {isSelected && (
        <div className="absolute top-2 left-2 z-10 flex gap-2">
          <div className="bg-primary-600 text-white px-2 py-1 text-xs rounded flex items-center gap-1 cursor-move">
            <FontAwesomeIcon icon={faGripVertical} />
            Drag to reorder
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(component.id)
            }}
            className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 transition-colors flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </div>
      )}
      {children}
    </div>
  )
}
