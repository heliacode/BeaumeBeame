export default function CTA({ data = {}, onEdit }) {
  const {
    title = 'Ready to get started?',
    subtitle = 'Join thousands of satisfied customers',
    buttonText = 'Get Started',
    buttonLink = '#',
    backgroundColor = 'bg-primary-600',
    textColor = 'text-white',
  } = data

  return (
    <section
      className={`${backgroundColor} ${textColor} py-16 px-4`}
      onClick={onEdit}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-8">{subtitle}</p>
        <a
          href={buttonLink}
          className={`inline-block px-8 py-3 rounded-lg font-semibold transition-colors ${
            backgroundColor.includes('primary')
              ? 'bg-white text-primary-600 hover:bg-gray-100'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {buttonText}
        </a>
      </div>
    </section>
  )
}

