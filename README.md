# BeaumeBeaume - Landing Page Builder

<div align="center">

![BeaumeBeaume](https://img.shields.io/badge/BeaumeBeaume-Landing%20Page%20Builder-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-LTS-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-38bdf8)

**A powerful, drag-and-drop landing page builder built with React and Node.js**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Tech Stack](#tech-stack)

</div>

---

## 🎯 Overview

BeaumeBeaume is a modern, intuitive landing page builder that empowers users to create beautiful, professional landing pages without writing a single line of code. With a drag-and-drop interface, real-time preview, and a comprehensive component library, building stunning landing pages has never been easier.

## ✨ Features

### 🎨 **Visual Page Builder**
- **Drag & Drop Interface** - Intuitively drag components from the sidebar onto your canvas
- **Live Preview** - See your changes in real-time as you build
- **Component Reordering** - Easily rearrange components by dragging them
- **Visual Selection** - Click any component to select and edit it

### 🧩 **Component Library**
- **Header** - Customizable navigation with logo and menu items
- **Hero Section** - Eye-catching hero sections with CTAs
- **Features** - Showcase your product features with icons
- **Testimonials** - Display customer reviews and ratings
- **Pricing Tables** - Create attractive pricing plans
- **Call-to-Action** - Compelling CTA sections
- **Footer** - Professional footer with links and copyright

### 💾 **Save & Manage**
- **Save Pages** - Save your work to the database
- **Load Pages** - Open and continue editing saved pages
- **Dashboard** - Manage all your pages from one place
- **Delete Pages** - Remove pages you no longer need

### 🎛️ **Editing Features**
- **Properties Panel** - Edit component properties in real-time
- **Undo/Redo** - Full history support with undo/redo functionality
- **Preview Mode** - Toggle between edit and preview modes
- **Page Title Editing** - Customize your page title directly in the builder

### 🎨 **Styling**
- **Tailwind CSS** - Modern utility-first CSS framework
- **Responsive Design** - All components are mobile-responsive
- **Customizable Colors** - Easy color customization through Tailwind
- **Font Awesome Icons** - Beautiful icons throughout the interface

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React DnD** - Drag and drop functionality
- **Font Awesome** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/heliacode/BeaumeBeaume.git
cd BeaumeBeaume
```

### 2. Install Dependencies

Install dependencies for root, frontend, and backend:

```bash
npm run install:all
```

Or install them separately:

```bash
# Root dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..

# Backend dependencies
cd backend
npm install
cd ..
```

### 3. Set Up Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Backend Environment Variables
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/beaumebeaume
JWT_SECRET=your-secret-key-change-in-production

# Frontend Environment Variables
VITE_API_URL=http://localhost:3001

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads
```

### 4. Set Up PostgreSQL Database

Create the database:

```bash
createdb beaumebeaume
```

Run migrations:

```bash
cd backend
npm run db:migrate
```

(Optional) Seed the database with sample data:

```bash
npm run db:seed
```

## 🎮 Usage

### Start Development Servers

Start both frontend and backend servers simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend** on http://localhost:3000
- **Backend API** on http://localhost:3001

### Start Servers Separately

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Building for Production

```bash
npm run build
```

This builds both frontend and backend for production.

## 📖 How to Use

### Creating a Landing Page

1. **Start the Builder**
   - Navigate to http://localhost:3000
   - Click "Builder" in the navigation or "Create New Page"

2. **Add Components**
   - Click components in the left sidebar to add them
   - Or drag components from the sidebar to the canvas
   - Components stack vertically on your page

3. **Edit Components**
   - Click any component on the canvas to select it
   - Use the Properties panel on the right to edit content
   - Changes appear instantly in the preview

4. **Reorder Components**
   - Select a component
   - Drag it using the grip handle to reorder

5. **Preview Your Page**
   - Click the "Preview" button to see your page without editing controls
   - Click "Edit" to return to the builder

6. **Save Your Work**
   - Enter a page title in the toolbar
   - Click "Save" to save your page
   - Your page will appear in the Dashboard

### Managing Pages

- **View All Pages** - Go to the Dashboard to see all your saved pages
- **Edit a Page** - Click the edit icon on any page in the Dashboard
- **Delete a Page** - Click the delete icon (trash) on any page

## 📁 Project Structure

```
BeaumeBeaume/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── landing/     # Landing page components
│   │   │   └── PageBuilder/ # Builder interface components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── App.jsx          # Main app component
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── backend/                  # Node.js backend application
│   ├── config/              # Configuration files
│   ├── database/            # Database schemas and migrations
│   ├── routes/              # API routes
│   ├── scripts/             # Utility scripts
│   └── server.js            # Express server
│
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Root package.json with workspace scripts
└── README.md                # This file
```

## 🎨 Component Types

### Header
Navigation bar with logo and menu items. Customize the logo text and menu links.

### Hero
Large hero section with title, subtitle, and call-to-action buttons. Perfect for the top of your landing page.

### Features
Display your product or service features in a grid layout. Customize titles, descriptions, and icons.

### Testimonials
Showcase customer reviews with ratings. Display multiple testimonials in a responsive grid.

### Pricing
Create pricing tables with multiple plans. Highlight popular plans and customize features.

### Call-to-Action
Compelling CTA sections to drive conversions. Customize text, button labels, and colors.

### Footer
Professional footer with copyright and links. Perfect for the bottom of your page.

## 🔌 API Endpoints

### Pages

- `GET /api/pages` - Get all pages
- `GET /api/pages/:id` - Get a single page
- `POST /api/pages` - Create a new page
- `PUT /api/pages/:id` - Update a page
- `DELETE /api/pages/:id` - Delete a page

### Health Check

- `GET /api/health` - Check API status

## 🛠️ Development

### Code Style

The project uses ESLint for code quality. Run linting:

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run lint
```

### Database Migrations

Run database migrations:

```bash
cd backend
npm run db:migrate
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [React DnD](https://react-dnd.github.io/react-dnd/) - Drag and drop
- [Vite](https://vitejs.dev/) - Build tool
- [Express.js](https://expressjs.com/) - Web framework

## 📧 Support

For support, please open an issue on the [GitHub repository](https://github.com/heliacode/BeaumeBeaume/issues).

---

<div align="center">

Made with ❤️ by the BeaumeBeaume team

**[⬆ Back to Top](#beaumebeaume---landing-page-builder)**

</div>
