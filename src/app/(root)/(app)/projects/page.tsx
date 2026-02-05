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
      <div className="mb-6">
        <p className="text-lg mb-4">
          These are my public GitHub projects, automatically sourced from my{' '}
          <a href="https://github.com/Kushal-Raj-G-S" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
            GitHub profile
          </a>
          .
        </p>
      </div>
      <ProjectsList />
    </>
  )
}
