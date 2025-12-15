import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons'

export default function Testimonials({ data = {}, onEdit }) {
  const {
    title = 'What Our Customers Say',
    subtitle = 'Don\'t just take our word for it',
    testimonials = [
      {
        name: 'John Doe',
        role: 'CEO, Company Inc',
        content: 'This product has transformed our business.',
        rating: 5,
        avatar: '',
      },
      {
        name: 'Jane Smith',
        role: 'Marketing Director',
        content: 'Outstanding service and support.',
        rating: 5,
        avatar: '',
      },
      {
        name: 'Bob Johnson',
        role: 'Founder',
        content: 'Best investment we\'ve made this year.',
        rating: 5,
        avatar: '',
      },
    ],
    columns = 3,
  } = data

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  }

  return (
    <section className="py-16 px-4 bg-gray-50" onClick={onEdit}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        <div className={`grid ${gridCols[columns] || gridCols[3]} gap-8`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-primary-600 text-2xl" />
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              <div className="flex items-center mb-2">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

