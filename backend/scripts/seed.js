import pool from '../config/database.js'

async function seed() {
  try {
    // Example template data
    const templateData = {
      name: 'Product Launch',
      description: 'A modern template for product launches',
      category: 'product',
      content: {
        sections: [
          {
            type: 'hero',
            title: 'Welcome to Our Product',
            subtitle: 'Revolutionary solution for your needs',
          },
        ],
      },
    }

    await pool.query(
      'INSERT INTO templates (name, description, category, content) VALUES ($1, $2, $3, $4)',
      [templateData.name, templateData.description, templateData.category, JSON.stringify(templateData.content)]
    )

    console.log('✅ Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()

