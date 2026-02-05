# My Personal Portfolio Website

This is my personal portfolio website built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/). It features a blog, project showcase, contact form, and a journey page showcasing my experiences and skills.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Kushal-Raj-G-S/personal-website)

## Features

- 🌙 Dark/Light mode
- 📱 Responsive design
- 📝 Blog with MDX
- 🚀 GitHub projects integration
- 📧 Contact form with Formspree
- 🛤️ Professional journey and skills showcase
- 🎮 Interactive cursor effects

## Getting Started

### Environment Setup

1. Copy the example environment file:

```bash
cp .env.local.example .env.local
```

2. Update the environment variables in `.env.local`:
   - Set your GitHub username
   - Add your Formspree form key
   - Configure Firebase for the guestbook
   - Add your admin email for the guestbook moderation

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## Project Structure

- `src/app/` - App router components and pages
- `src/app/(root)/(app)/` - Main application pages
- `src/contexts/` - React context providers
- `src/assets/` - Static assets
- `src/constans/` - Constants used throughout the app
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `content/` - Blog posts in MDX format
- `public/` - Static files served by Next.js

## Building for Production

```bash
npm run build
```

## Deployment

### Netlify (Recommended)

This repository is configured for easy deployment to Netlify. You can:

1. Click the "Deploy to Netlify" button at the top of this README
2. Or follow the instructions in the [DEPLOY.md](DEPLOY.md) file

### Vercel (Alternative)

Alternatively, you can deploy this app using the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

## Customization

- Update content in `src/constans/common.ts` to change site links and information
- Edit pages in `src/app/(root)/(app)/` to update content
- Add new blog posts to the `content/` directory
