'use client'

import { IRepository } from '@/types'
import { useEffect, useState } from 'react'
import RepositoryCard from './RepositoryCard'

export default function ProjectsList() {
  const [repositories, setRepositories] = useState<IRepository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)

  const fetchProjects = async (force = false) => {
    // Check if we have recent data and it's not a forced refresh
    if (!force && lastFetch && Date.now() - lastFetch.getTime() < 2 * 60 * 1000) {
      // 2 minutes
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/projects', {
        cache: force ? 'no-store' : 'default',
        headers: {
          'Cache-Control': force ? 'no-cache' : 'max-age=120',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`)
      }

      const data = await response.json()
      setRepositories(data.repositories || [])
      setLastFetch(new Date())
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError(err instanceof Error ? err.message : 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleRefresh = () => {
    fetchProjects(true)
  }

  if (loading && repositories.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/50 dark:bg-black/30 p-5 h-48 rounded-lg">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {repositories.length > 0 && (
            <>
              Showing {repositories.length} repositories
              {lastFetch && <span className="ml-2">(Updated: {lastFetch.toLocaleTimeString()})</span>}
            </>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-3 py-1 text-sm bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded">
          <p className="text-red-700 dark:text-red-300">Error loading projects: {error}</p>
          <button
            onClick={handleRefresh}
            className="mt-2 px-3 py-1 text-sm bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {repositories.length > 0 ? (
          repositories.map((repo, i) => <RepositoryCard key={repo.id || i} repo={repo} />)
        ) : !loading ? (
          <div className="col-span-2 p-5 bg-white/50 backdrop-blur dark:bg-black/80 rounded">
            <p>
              No public repositories found. To display your work here, create public repositories on GitHub that aren't forks of other
              projects.
            </p>
            <button onClick={handleRefresh} className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors">
              Check Again
            </button>
          </div>
        ) : null}
      </div>
    </>
  )
}
