import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function Pricing({ data = {}, onEdit }) {
  const {
    title = 'Pricing Plans',
    subtitle = 'Choose the perfect plan for your needs',
    plans = [
      {
        name: 'Basic',
        price: '$9',
        period: '/month',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        buttonText: 'Get Started',
        buttonLink: '#',
        popular: false,
      },
      {
        name: 'Pro',
        price: '$29',
        period: '/month',
        features: ['All Basic features', 'Feature 4', 'Feature 5', 'Feature 6'],
        buttonText: 'Get Started',
        buttonLink: '#',
        popular: true,
      },
      {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        features: ['All Pro features', 'Feature 7', 'Feature 8', 'Priority Support'],
        buttonText: 'Contact Us',
        buttonLink: '#',
        popular: false,
      },
    ],
  } = data

  return (
    <section className="py-16 px-4 bg-white" onClick={onEdit}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg p-8 ${
                plan.popular ? 'border-2 border-primary-600 transform scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <FontAwesomeIcon icon={faCheck} className="text-primary-600 mr-2 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.buttonLink}
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

