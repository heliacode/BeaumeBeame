export default function Footer({ data = {}, onEdit }) {
  const {
    copyright = `© ${new Date().getFullYear()} BeaumeBeaume. All rights reserved.`,
    links = [
      { text: 'Privacy Policy', link: '#' },
      { text: 'Terms of Service', link: '#' },
      { text: 'Contact', link: '#' },
    ],
    backgroundColor = 'bg-gray-900',
    textColor = 'text-gray-400',
  } = data

  return (
    <footer
      className={`${backgroundColor} ${textColor} py-8 px-4`}
      onClick={onEdit}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">{copyright}</p>
          <div className="flex space-x-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="hover:text-white transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

