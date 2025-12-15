import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header({ data = {}, onEdit }) {
  const {
    logo = 'BeaumeBeaume',
    logoLink = '/',
    menuItems = [
      { text: 'Home', link: '#' },
      { text: 'About', link: '#' },
      { text: 'Contact', link: '#' },
    ],
    backgroundColor = 'bg-white',
    textColor = 'text-gray-900',
  } = data

  return (
    <header
      className={`${backgroundColor} shadow-sm sticky top-0 z-50`}
      onClick={onEdit}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href={logoLink} className={`text-xl font-bold ${textColor}`}>
            {logo}
          </a>
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`${textColor} hover:text-primary-600 transition-colors`}
              >
                {item.text}
              </a>
            ))}
          </div>
          <button className="md:hidden">
            <FontAwesomeIcon icon={faBars} className={textColor} />
          </button>
        </div>
      </nav>
    </header>
  )
}

