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

      {/* Hero Section */}
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Profile Image with Frame */}
        <div className="relative flex-shrink-0">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-600/20 to-transparent p-1">
            <div className="overflow-hidden rounded-xl bg-white dark:bg-black">
              <Image
                src="/media/kushalraj.jpg"
                alt="Kushal Raj G S"
                className="block w-full transition-transform duration-500 group-hover:scale-105 md:w-72"
                width={300}
                height={400}
                unoptimized
              />
            </div>
          </div>
          {/* Accent decoration */}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-yellow-600/10 blur-2xl" />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Greeting */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold md:text-4xl">
              Yo <span className="text-yellow-600">Kush</span> here! 👋
            </h2>
            <p className="text-lg font-medium text-yellow-600 dark:text-yellow-500">AI Product Builder & Future Product Designer/Manager</p>
          </div>

          {/* Bio */}
          <div className="space-y-4 text-base leading-relaxed opacity-90 md:text-lg">
            <p>
              I love transforming ideas into <span className="font-semibold text-yellow-600 dark:text-yellow-500">innovative products</span>{' '}
              that solve real problems. My journey is all about building things that delight users and drive real-world impact with AI and
              technology.
            </p>

            <p>
              Driven by <span className="font-semibold">curiosity and creativity</span>, I design, prototype, and iterate on AI-powered
              solutions—from automating workflows to creating new user experiences.
            </p>

            <p>
              My focus is on blending <span className="font-semibold">design, tech, and business sense</span> to turn ambitious concepts
              into practical, user-centered products.
            </p>

            <p className="font-medium">
              Whether it's strategizing feature roadmaps, building MVPs, or collaborating with teams, I thrive on making things that matter.
              <span className="block mt-2 text-yellow-600 dark:text-yellow-500">Let's build the future—one product at a time.</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              download
              target="_blank"
              rel="nofollow"
              href="/media/resume.pdf"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-yellow-600 px-6 py-3 font-semibold text-white transition-all hover:bg-yellow-700 hover:shadow-lg hover:shadow-yellow-600/30"
            >
              <span className="relative z-10">Download Resume</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg border-2 border-yellow-600 bg-transparent px-6 py-3 font-semibold text-yellow-600 transition-all hover:bg-yellow-600 hover:text-white hover:shadow-lg hover:shadow-yellow-600/20"
            >
              <span>Get In Touch</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-16">
        <SkillsSection />
      </div>
    </>
  )
}
