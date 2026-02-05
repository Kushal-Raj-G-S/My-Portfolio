import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'
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
      <div className="md:flex">
        <div className="mb-5 md:w-56">
          <Image src="/media/kushalraj.jpg" alt="Foto kushalraj" className="block w-full" width={300} height={400} unoptimized />
        </div>
        <div className="md:flex-1 md:pl-6">
          <h2 className="mb-2 text-xl font-bold">Yo Kush here!</h2>
          <div className="mb-6">
            <p className="mb-1">
              AI Product Builder & Future Product Designer/Manager
              <br />
              <br />I love transforming ideas into innovative products that solve real problems. My journey is all about building things
              that delight users and drive real-world impact with AI and technology.
              <br />
              <br />
              Driven by curiosity and creativity, I design, prototype, and iterate on AI-powered solutions—from automating workflows to
              creating new user experiences.
              <br />
              My focus is on blending design, tech, and business sense to turn ambitious concepts into practical, user-centered products.
              <br />
              <br />
              Whether it’s strategizing feature roadmaps, building MVPs, or collaborating with teams, I thrive on making things that matter.
              Let’s build the future—one product at a time.
              <br />
            </p>
          </div>
          <SkillsSection />
          <a
            download
            target="_blank"
            rel="nofollow"
            href="/media/resume.pdf"
            className="mr-3 inline-block bg-white px-5 py-3 hover:bg-black hover:text-white dark:bg-black dark:hover:bg-white dark:hover:text-black"
          >
            Resume
          </a>
          <Link
            href="/contact"
            rel="nofollow"
            className="inline-block bg-white px-5 py-3 hover:bg-black hover:text-white dark:bg-black dark:hover:bg-white dark:hover:text-black"
          >
            Contact me
          </Link>
        </div>
      </div>
    </>
  )
}
