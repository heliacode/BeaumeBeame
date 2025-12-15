import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PageBuilder from './pages/PageBuilder'
import Templates from './pages/Templates'

// Add Font Awesome icons to library
library.add(fas, fab)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/builder/:id?" element={<PageBuilder />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App

