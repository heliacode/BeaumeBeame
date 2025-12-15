import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Hero({ data = {}, onEdit }) {
  const {
    title = 'Welcome to Our Product',
    subtitle = 'Revolutionary solution for your needs',
    primaryButton = { text: 'Get Started', link: '#' },
    secondaryButton = { text: 'Learn More', link: '#' },
    backgroundImage = '',
    backgroundColor = 'bg-gradient-to-r from-primary-600 to-primary-800',
  } = data

  return (
    <section
      className={`relative ${backgroundColor} text-white py-20 px-4`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      onClick={onEdit}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex gap-4 justify-center">
          {primaryButton.text && (
            <a
              href={primaryButton.link}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {primaryButton.text}
            </a>
          )}
          {secondaryButton.text && (
            <a
              href={secondaryButton.link}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              {secondaryButton.text}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

