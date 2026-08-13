import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'
import AboutHero from './components/AboutHero'
import SkillsSection from './components/SkillsSection'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About - Kushal Raj G S',
  openGraph: {
    title: 'About - Kushal Raj G S',
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <PageTitle title="About" />
      <AboutHero />

      {/* Skills Section */}
      <div className="mt-16">
        <SkillsSection />
      </div>
    </>
  )
}
