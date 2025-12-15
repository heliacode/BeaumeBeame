import { useDrag } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeading,
  faImage,
  faList,
  faHandPointer,
  faWindowMaximize,
  faComments,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'

const components = [
  { type: 'header', label: 'Header', icon: faHeading },
  { type: 'hero', label: 'Hero', icon: faImage },
  { type: 'features', label: 'Features', icon: faList },
  { type: 'testimonials', label: 'Testimonials', icon: faComments },
  { type: 'pricing', label: 'Pricing', icon: faDollarSign },
  { type: 'cta', label: 'Call to Action', icon: faHandPointer },
  { type: 'footer', label: 'Footer', icon: faWindowMaximize },
]

function DraggableComponent({ component, onAddComponent }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { type: component.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <button
      ref={drag}
      onClick={() => onAddComponent(component.type)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left bg-gray-50 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors border border-transparent hover:border-primary-200 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <FontAwesomeIcon icon={component.icon} className="text-gray-600" />
      <span className="font-medium">{component.label}</span>
    </button>
  )
}

export default function ComponentPalette({ onAddComponent }) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        Components
      </h3>
      <div className="space-y-2">
        {components.map((component) => (
          <DraggableComponent
            key={component.type}
            component={component}
            onAddComponent={onAddComponent}
          />
        ))}
      </div>
    </div>
  )
}

