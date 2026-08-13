'use client'

import Logo from '@/app/components/Logo'
import { NAV_ITEMS } from '@/constans/common'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DarkModeToggle from './DarkModeToggle'

const Navigation: React.FC = () => {
  const pathname = usePathname()
  const activePath = pathname.startsWith('/blog') ? '/blog' : pathname

  return (
    <header className="fixed bottom-0 left-0 right-0 z-[100] flex h-16 w-full flex-row overflow-hidden border-t border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-black/70 md:right-auto md:top-0 md:h-full md:w-16 md:flex-col md:border-r md:border-t-0">
      <div className="flex h-16 w-16">
        <Link href="/" title="Home" className="group flex flex-1 items-center justify-center">
          <motion.span whileHover={{ scale: 1.15, rotate: 8 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
            <Logo height={18} width={18} />
          </motion.span>
        </Link>
      </div>
      <nav className="relative m-auto overflow-auto" role="navigation">
        <ul className="flex flex-row md:flex-col">
          {NAV_ITEMS.map(({ path, Icon, label }) => {
            const isActive = path === activePath
            return (
              <li key={path} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-1.5 rounded-xl bg-yellow-600/15 ring-1 ring-yellow-600/40 dark:bg-yellow-500/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Link href={path} title={label} className="relative flex h-16 w-16 flex-col items-center justify-center md:pt-1">
                  <motion.span
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className={`relative z-10 flex flex-col items-center transition-colors duration-300 ${isActive ? 'text-yellow-600 dark:text-yellow-500' : ''}`}
                  >
                    <Icon size={18} />
                    <span className="absolute bottom-1 left-0 right-0 block text-center text-[0.5em] md:relative md:bottom-0 md:mt-1">
                      {label}
                    </span>
                  </motion.span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="flex h-16 w-16">
        <DarkModeToggle title="Dark mode toggle" className="flex flex-1 items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-90" />
      </div>
    </header>
  )
}

export default Navigation
