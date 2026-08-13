# Kushal Raj G S - Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Full Stack Software Engineer specializing in Backend & AI Systems. Built with Next.js 14, TypeScript, and Tailwind CSS.

🔗 **Live Demo**: [Portfolio Website](https://kushal-raj-gs.netlify.app)

## ✨ Features

- 🌙 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 📝 **Dynamic Blog** - MDX-powered blog with syntax highlighting
- 🚀 **GitHub Integration** - Automatic project showcase from GitHub repositories
- 📧 **Contact Form** - Formspree-integrated contact system
- 🛤️ **Journey Timeline** - Interactive showcase of professional experience, hackathons, and achievements
- 🎮 **Interactive UI** - Smooth animations and cursor effects
- ⚡ **Performance Optimized** - Fast loading with Next.js App Router
- 🔍 **SEO Ready** - Optimized meta tags and OpenGraph support

## 🏆 Recent Achievements

- 🥇 **ImpactX 2025** - 1st Place Winner (₹25,000)
- 🥈 **DecodeX 2025** - First Runner-Up (₹15,000) 
- 🥉 **HACKIO Hackathon** - 3rd Place with BioBloom (₹10,000)
- 🥉 **The Social Hackathon** - 3rd Place Winner

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX for blog posts
- **Deployment**: Netlify
- **Forms**: Formspree integration
- **Icons**: Heroicons and custom SVGs

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kushal-Raj-G-S/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   - GitHub username for project integration
   - Formspree form endpoint for contact form
   - Any additional API keys

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (root)/(app)/      # Main application pages
│   │   ├── about/         # About page with skills
│   │   ├── blog/          # Blog listing and posts
│   │   ├── contact/       # Contact form
│   │   ├── journey/       # Professional journey timeline
│   │   └── projects/      # Projects showcase
│   ├── api/               # API routes
│   └── components/        # Shared components
├── contexts/              # React context providers
├── types/                 # TypeScript definitions
├── utils/                 # Utility functions
└── constans/             # App constants

content/                   # Blog posts (MDX)
public/                   # Static assets
```

## 🎨 Customization

### Personal Information
Update your details in `src/constans/common.ts`:
```typescript
export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'Your Title',
  // ... other config
}
```

### Adding Blog Posts
Create new MDX files in the `content/` directory:
```markdown
---
title: 'Your Post Title'
publishedAt: '2026-01-01'
summary: 'Post summary'
---

Your content here...
```

### Styling
- Customize colors in `tailwind.config.js`
- Update global styles in `src/app/globals.css`
- Modify component styles directly with Tailwind classes

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Vercel
1. Import project from GitHub
2. Vercel will auto-detect Next.js settings
3. Add environment variables in project settings

## 📈 Performance

- ⚡ **Lighthouse Score**: 95+ on all metrics
- 🎯 **Core Web Vitals**: Optimized for excellent UX
- 📦 **Bundle Size**: Optimized with automatic code splitting

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Website**: [kushal-raj-gs.netlify.app](https://kushal-raj-gs.netlify.app)
- **Email**: [kushalrajgs4@gmail.com](mailto:kushalrajgs4@gmail.com)
- **LinkedIn**: [linkedin.com/in/kushalrajgs](https://linkedin.com/in/kushalrajgs)
- **GitHub**: [github.com/Kushal-Raj-G-S](https://github.com/Kushal-Raj-G-S)

---

⭐ If you found this portfolio inspiring or useful, please consider giving it a star!
