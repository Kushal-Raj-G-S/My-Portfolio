import { FiBookOpen, FiClipboard, FiGlobe, FiHome, FiMail, FiUser } from 'react-icons/fi'

export const HOST = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : process.env.NEXT_PUBLIC_HOST || 'http://localhost:5000'

export const NAV_ITEMS = [
  { path: '/', label: 'Home', Icon: FiHome },
  { path: '/about', label: 'About', Icon: FiUser },
  { path: '/blog', label: 'Blog', Icon: FiGlobe },
  { path: '/projects', label: 'Projects', Icon: FiClipboard },
  { path: '/contact', label: 'Contact', Icon: FiMail },
  { path: '/journey', label: 'Journey', Icon: FiBookOpen },
]

export const PAGE_TITLES = {
  '/': '._',
  '/about': 'About',
  '/blog': 'Blog',
  '/projects': 'Projects',
  '/contact': 'Contact',
  '/journey': 'My Journey',
}

export const SOCIALS = {
  GH: 'https://github.com/kushal-raj-g-s',
  IG: 'https://www.instagram.com/ku__shhhh___/',
  IN: 'https://www.linkedin.com/in/kushal-raj-g-s/',
}

export const RESUME_URL = './public/media/resume.pdf'

export const FORMSPREE_KEY = 'mldnorel'
