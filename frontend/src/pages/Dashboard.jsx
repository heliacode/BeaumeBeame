import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileAlt, faPalette, faEdit, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { pagesAPI } from '../services/api'

export default function Dashboard() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      const response = await pagesAPI.getAll()
      setPages(response.data)
    } catch (error) {
      console.error('Error loading pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this page?')) return
    
    try {
      await pagesAPI.delete(id)
      setPages(pages.filter((page) => page.id !== id))
    } catch (error) {
      console.error('Error deleting page:', error)
      alert('Failed to delete page')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Create and manage your landing pages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pages</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{pages.length}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <FontAwesomeIcon icon={faFileAlt} className="text-primary-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {pages.filter((p) => p.published).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FontAwesomeIcon icon={faPalette} className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Your Pages</h2>
          <Link
            to="/builder"
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            New Page
          </Link>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading pages...</div>
          ) : pages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No pages yet. Create your first page!</p>
              <Link
                to="/builder"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Create New Page
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{page.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCalendar} />
                        {formatDate(page.updated_at)}
                      </span>
                      {page.published && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          Published
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/builder/${page.id}`}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/builder"
              className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create New Page
            </Link>
            <Link
              to="/templates"
              className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <FontAwesomeIcon icon={faPalette} className="mr-2" />
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

