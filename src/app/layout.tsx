//import noise from '@/assets/noise.gif'
import { HOST } from '@/constans/common'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Providers from './Providers'
import CursorFollower from './components/CursorFollower'
import './globals.css'

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(HOST),
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-white.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={'h-full w-full ' + lato.className} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="flex min-h-full w-full bg-white text-black antialiased selection:bg-yellow-600 dark:bg-black dark:text-white">
        <i
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[150] hidden h-full w-full opacity-5 md:block"
        />
        <Providers>
          <CursorFollower />
          {children}
        </Providers>
      </body>
    </html>
  )
}
