import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'
import ProjectsList from './components/ProjectsList'

export const metadata: Metadata = {
  title: 'Projects - Kushal Raj G S',
  openGraph: {
    title: 'Projects - Kushal Raj G S',
    url: '/projects',
  },
  alternates: {
    canonical: '/projects',
  },
}

export default function ProjectsPage() {
  return (
    <>
      <PageTitle title="Projects" />
      <div className="mb-6 animate-intro-fade-up">
        <p className="text-lg mb-4">
          These are my public GitHub projects, automatically sourced from my{' '}
          <a
            href="https://github.com/Kushal-Raj-G-S"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-yellow-600 transition-colors hover:text-yellow-500 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-yellow-500 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            GitHub profile
          </a>
          .
        </p>
      </div>
      <ProjectsList />
    </>
  )
}
