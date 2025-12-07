# Pooja's Aura Artistry - Makeup Website

A beautiful, fully functional single-page application (SPA) for a professional makeup artist brand built with React, TypeScript, and TailwindCSS.

## 🎨 Features

- **Modern, Responsive Design**: Soft, feminine, luxury salon vibes with a beautiful color palette
- **Complete Frontend Solution**: No backend required - everything handled in the frontend
- **Local Database**: Uses localStorage to store enquiries and feedback
- **Admin Panel**: Simple admin login to view and manage enquiries and feedback
- **Public Pages**: 
  - Home page with hero, services, portfolio preview, testimonials
  - Services page with detailed service listings
  - Portfolio page with filtering
  - About page with artist information
  - Enquiry form for booking
  - Feedback/Review form
  - Contact page with quick enquiry

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔐 Admin Access

- **Email**: `admin@poojasaura.com`
- **Password**: `AuraGlow123!`

Navigate to `/admin/login` to access the admin dashboard.

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, HeroSection, Logo
│   ├── sections/     # Home page sections
│   └── ui/           # Reusable UI components
├── lib/
│   ├── auth.ts       # Admin authentication
│   └── localDb.ts    # localStorage database utilities
├── pages/            # All page components
├── routes/           # Layout components
├── types/            # TypeScript type definitions
└── App.tsx           # Main app with routing
```

## 🎨 Brand Colors

- **Soft Blush Pink**: `#F9E3E9`
- **Rose Accent**: `#E91E63`
- **Deep Plum**: `#4A2C2A`

## 📝 Data Storage

All data is stored in browser localStorage:
- Enquiries: `pooja_aura_enquiries`
- Feedback: `pooja_aura_feedbacks`
- Admin Auth: `pooja_aura_admin_auth`

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router DOM** - Routing
- **Lucide React** - Icons

## 📄 License

This project is created for demonstration purposes.

