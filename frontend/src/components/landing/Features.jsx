import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faRocket, faShield, faBolt } from '@fortawesome/free-solid-svg-icons'

const defaultIcons = [faRocket, faShield, faBolt]

export default function Features({ data = {}, onEdit }) {
  const {
    title = 'Features',
    subtitle = 'Everything you need to succeed',
    features = [
      { title: 'Feature 1', description: 'Description of feature 1', icon: faCheckCircle },
      { title: 'Feature 2', description: 'Description of feature 2', icon: faCheckCircle },
      { title: 'Feature 3', description: 'Description of feature 3', icon: faCheckCircle },
    ],
    columns = 3,
  } = data

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-16 px-4 bg-white" onClick={onEdit}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        <div className={`grid ${gridCols[columns] || gridCols[3]} gap-8`}>
          {features.map((feature, index) => {
            const icon = feature.icon || defaultIcons[index % defaultIcons.length]
            return (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                {icon && (
                  <div className="mb-4 inline-block">
                    <FontAwesomeIcon icon={icon} className="text-primary-600 text-4xl" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

