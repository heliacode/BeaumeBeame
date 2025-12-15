import { useDrop } from 'react-dnd'
import { Hero, Header, Features, CTA, Footer, Testimonials, Pricing } from '../landing'
import DraggableComponent from './DraggableComponent'

const componentMap = {
  hero: Hero,
  header: Header,
  features: Features,
  cta: CTA,
  footer: Footer,
  testimonials: Testimonials,
  pricing: Pricing,
}

export default function Canvas({ components, selectedId, onSelect, onUpdate, onAddComponent, onDelete, onMove }) {
  const [{ isOver }, drop] = useDrop({
    accept: ['component', 'canvas-component'],
    drop: (item, monitor) => {
      if (item.type) {
        // New component from palette
        onAddComponent(item.type)
      }
      // Reordering is handled by DraggableComponent's drop handler
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div
      ref={drop}
      className={`flex-1 overflow-y-auto bg-gray-100 ${isOver ? 'bg-primary-50' : ''}`}
    >
      <div className="min-h-screen bg-white max-w-7xl mx-auto">
        {components.length === 0 ? (
          <div className="flex items-center justify-center h-screen text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-2">Start building your page</p>
              <p className="text-sm">Drag components from the sidebar or click to add</p>
            </div>
          </div>
        ) : (
          components.map((component, index) => {
            const Component = componentMap[component.type]
            if (!Component) return null

            return (
              <DraggableComponent
                key={component.id}
                component={component}
                index={index}
                isSelected={selectedId === component.id}
                onSelect={onSelect}
                onDelete={onDelete}
                onMove={onMove}
              >
                <Component data={component.data} onEdit={() => onSelect(component.id)} />
              </DraggableComponent>
            )
          })
        )}
      </div>
    </div>
  )
}

