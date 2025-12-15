import express from 'express'
import pool from '../config/database.js'

const router = express.Router()

// Get all pages
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, slug, content, published, created_at, updated_at FROM pages ORDER BY updated_at DESC'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching pages:', error)
    res.status(500).json({ error: 'Failed to fetch pages' })
  }
})

// Get a single page
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT id, title, slug, content, published, seo_title, seo_description, seo_keywords FROM pages WHERE id = $1',
      [id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching page:', error)
    res.status(500).json({ error: 'Failed to fetch page' })
  }
})

// Create a new page
router.post('/', async (req, res) => {
  try {
    const { title, slug, content, published = false, seo_title, seo_description, seo_keywords } = req.body
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' })
    }
    
    // Generate slug if not provided
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    const result = await pool.query(
      `INSERT INTO pages (title, slug, content, published, seo_title, seo_description, seo_keywords)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, title, slug, content, published, created_at, updated_at`,
      [title, finalSlug, JSON.stringify(content), published, seo_title, seo_description, seo_keywords]
    )
    
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating page:', error)
    if (error.code === '23505') { // Unique violation
      return res.status(409).json({ error: 'A page with this slug already exists' })
    }
    res.status(500).json({ error: 'Failed to create page' })
  }
})

// Update a page
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, slug, content, published, seo_title, seo_description, seo_keywords } = req.body
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' })
    }
    
    const result = await pool.query(
      `UPDATE pages 
       SET title = $1, slug = $2, content = $3, published = $4, 
           seo_title = $5, seo_description = $6, seo_keywords = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING id, title, slug, content, published, updated_at`,
      [title, slug, content, published, seo_title, seo_description, seo_keywords, id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating page:', error)
    if (error.code === '23505') {
      return res.status(409).json({ error: 'A page with this slug already exists' })
    }
    res.status(500).json({ error: 'Failed to update page' })
  }
})

// Delete a page
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM pages WHERE id = $1 RETURNING id', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' })
    }
    
    res.json({ message: 'Page deleted successfully' })
  } catch (error) {
    console.error('Error deleting page:', error)
    res.status(500).json({ error: 'Failed to delete page' })
  }
})

export default router

