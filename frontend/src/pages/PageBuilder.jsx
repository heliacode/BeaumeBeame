import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ComponentPalette from '../components/PageBuilder/ComponentPalette'
import Canvas from '../components/PageBuilder/Canvas'
import PropertiesPanel from '../components/PageBuilder/PropertiesPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faEye, faUndo, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons'
import { pagesAPI } from '../services/api'

export default function PageBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [components, setComponents] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [pageTitle, setPageTitle] = useState('Untitled Page')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [pageId, setPageId] = useState(id || null)

  // Load page if ID is provided
  useEffect(() => {
    if (id) {
      loadPage(id)
    }
  }, [id])

  // Save history for undo/redo
  const saveToHistory = useCallback((newComponents) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(JSON.parse(JSON.stringify(newComponents)))
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const loadPage = async (pageId) => {
    try {
      const response = await pagesAPI.getById(pageId)
      const page = response.data
      setPageTitle(page.title)
      setPageId(page.id)
      if (page.content && Array.isArray(page.content)) {
        setComponents(page.content)
        saveToHistory(page.content)
      }
    } catch (error) {
      console.error('Error loading page:', error)
      alert('Failed to load page')
    }
  }

  const addComponent = (type) => {
    const newComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      data: getDefaultData(type),
    }
    const newComponents = [...components, newComponent]
    setComponents(newComponents)
    setSelectedId(newComponent.id)
    saveToHistory(newComponents)
  }

  const getDefaultData = (type) => {
    const defaults = {
      header: {
        logo: 'BeaumeBeaume',
        logoLink: '/',
        menuItems: [
          { text: 'Home', link: '#' },
          { text: 'About', link: '#' },
          { text: 'Contact', link: '#' },
        ],
      },
      hero: {
        title: 'Welcome to Our Product',
        subtitle: 'Revolutionary solution for your needs',
        primaryButton: { text: 'Get Started', link: '#' },
        secondaryButton: { text: 'Learn More', link: '#' },
      },
      features: {
        title: 'Features',
        subtitle: 'Everything you need to succeed',
        features: [
          { title: 'Feature 1', description: 'Description of feature 1' },
          { title: 'Feature 2', description: 'Description of feature 2' },
          { title: 'Feature 3', description: 'Description of feature 3' },
        ],
        columns: 3,
      },
      cta: {
        title: 'Ready to get started?',
        subtitle: 'Join thousands of satisfied customers',
        buttonText: 'Get Started',
        buttonLink: '#',
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} BeaumeBeaume. All rights reserved.`,
        links: [
          { text: 'Privacy Policy', link: '#' },
          { text: 'Terms of Service', link: '#' },
          { text: 'Contact', link: '#' },
        ],
      },
      testimonials: {
        title: 'What Our Customers Say',
        subtitle: "Don't just take our word for it",
        testimonials: [
          {
            name: 'John Doe',
            role: 'CEO, Company Inc',
            content: 'This product has transformed our business.',
            rating: 5,
          },
          {
            name: 'Jane Smith',
            role: 'Marketing Director',
            content: 'Outstanding service and support.',
            rating: 5,
          },
          {
            name: 'Bob Johnson',
            role: 'Founder',
            content: 'Best investment we\'ve made this year.',
            rating: 5,
          },
        ],
        columns: 3,
      },
      pricing: {
        title: 'Pricing Plans',
        subtitle: 'Choose the perfect plan for your needs',
        plans: [
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
      },
    }
    return defaults[type] || {}
  }

  const updateComponent = (id, data) => {
    const newComponents = components.map((comp) => (comp.id === id ? { ...comp, data } : comp))
    setComponents(newComponents)
    saveToHistory(newComponents)
  }

  const deleteComponent = (id) => {
    const newComponents = components.filter((comp) => comp.id !== id)
    setComponents(newComponents)
    if (selectedId === id) {
      setSelectedId(null)
    }
    saveToHistory(newComponents)
  }

  const moveComponent = (dragIndex, hoverIndex) => {
    const newComponents = [...components]
    const [removed] = newComponents.splice(dragIndex, 1)
    newComponents.splice(hoverIndex, 0, removed)
    setComponents(newComponents)
    saveToHistory(newComponents)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const pageData = {
        title: pageTitle,
        slug: pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        content: components,
        published: false,
      }

      if (pageId) {
        await pagesAPI.update(pageId, pageData)
      } else {
        const response = await pagesAPI.create(pageData)
        setPageId(response.data.id)
        navigate(`/builder/${response.data.id}`, { replace: true })
      }
      alert('Page saved successfully!')
    } catch (error) {
      console.error('Error saving page:', error)
      alert('Failed to save page')
    } finally {
      setIsSaving(false)
    }
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setComponents(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setComponents(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const selectedComponent = components.find((comp) => comp.id === selectedId)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="text-xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2"
              placeholder="Page Title"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className={`px-4 py-2 rounded-lg transition-colors ${
                canUndo
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <FontAwesomeIcon icon={faUndo} className="mr-2" />
              Undo
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo}
              className={`px-4 py-2 rounded-lg transition-colors ${
                canRedo
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              Redo
            </button>
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isPreviewMode
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Main Builder Area */}
        <div className="flex-1 flex overflow-hidden">
          {!isPreviewMode && (
            <>
              {/* Component Palette */}
              <ComponentPalette onAddComponent={addComponent} />

              {/* Canvas */}
              <Canvas
                components={components}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onUpdate={updateComponent}
                onAddComponent={addComponent}
                onDelete={deleteComponent}
                onMove={moveComponent}
              />

              {/* Properties Panel */}
              <PropertiesPanel
                selectedComponent={selectedComponent}
                onUpdate={updateComponent}
              />
            </>
          )}
          {isPreviewMode && (
            <div className="flex-1 overflow-y-auto bg-gray-100">
              <div className="bg-white max-w-7xl mx-auto min-h-screen">
                {components.map((component) => {
                  const { Hero, Header, Features, CTA, Footer, Testimonials, Pricing } = require('../components/landing')
                  const componentMap = {
                    hero: Hero,
                    header: Header,
                    features: Features,
                    cta: CTA,
                    footer: Footer,
                    testimonials: Testimonials,
                    pricing: Pricing,
                  }
                  const Component = componentMap[component.type]
                  if (!Component) return null
                  return <Component key={component.id} data={component.data} />
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  )
}

