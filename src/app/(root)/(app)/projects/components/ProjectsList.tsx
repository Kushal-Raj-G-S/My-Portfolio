'use client'

import { SHOWCASE_REPOS } from '@/constans/common'
import { IRepository } from '@/types'
import { useEffect, useRef, useState } from 'react'
import RepositoryCard from './RepositoryCard'

// ── Counts up from 0 to `value` whenever it changes ───────────────────────────
function useCountUp(value: number, duration = 600) {
  const [display, setDisplay] = useState(0)
  const prevValue = useRef(0)
  useEffect(() => {
    const from = prevValue.current
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(from + (value - from) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    prevValue.current = value
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return display
}

// ── Skeleton that mirrors the actual card shape ───────────────────────────────
function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/40"
         style={{ borderTop: '2px solid rgba(202,138,4,0.2)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-black/8 dark:border-white/8">
        <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 rounded bg-gray-300 dark:bg-gray-700 w-3/4" />
          <div className="h-2.5 rounded bg-gray-200 dark:bg-gray-800 w-1/2" />
        </div>
      </div>
      {/* Image area — matches 16:9 */}
      <div className="w-full bg-gray-200 dark:bg-gray-800" style={{ aspectRatio: '16 / 9' }}>
        <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900" />
      </div>
      {/* Language row */}
      <div className="px-4 pt-3 pb-1">
        <div className="h-2.5 rounded bg-gray-300 dark:bg-gray-700 w-1/3" />
      </div>
      <div className="flex h-2 w-full mt-2">
        <div className="flex-1 bg-yellow-300/40 dark:bg-yellow-800/30" />
        <div className="w-1/3 bg-blue-300/40 dark:bg-blue-800/30" />
        <div className="w-1/5 bg-purple-300/40 dark:bg-purple-800/30" />
      </div>
    </div>
  )
}

export default function ProjectsList() {
  const [repositories, setRepositories] = useState<IRepository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)
  const [visible, setVisible] = useState(false)

  const fetchProjects = async (force = false) => {
    if (!force && lastFetch && Date.now() - lastFetch.getTime() < 2 * 60 * 1000) return

    setLoading(true)
    setError(null)
    setVisible(false)

    try {
      const url = force ? '/api/projects?refresh=true' : '/api/projects'
      const response = await fetch(url, {
        cache: force ? 'no-store' : 'default',
        headers: { 'Cache-Control': force ? 'no-cache' : 'max-age=120' },
      })
      if (!response.ok) throw new Error(`Failed to fetch projects: ${response.status}`)
      const data = await response.json()
      const fetched = data.repositories || []

      // Client-side sort fallback to guarantee order matches SHOWCASE_REPOS
      fetched.sort((a: IRepository, b: IRepository) => {
        const getIdx = (name: string) => {
          const idx = SHOWCASE_REPOS.findIndex((r) => {
            const rName = (r.includes('/') ? r.split('/')[1] : r).trim().toLowerCase()
            return rName === name.trim().toLowerCase()
          })
          return idx === -1 ? 999 : idx
        }
        return getIdx(a.name) - getIdx(b.name)
      })

      setRepositories(fetched)
      setLastFetch(new Date())
      // Small delay then trigger stagger animation
      setTimeout(() => setVisible(true), 50)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const displayedCount = useCountUp(repositories.length)

  // ── Loading state ────────────────────────────────────────────────────────────
  if (loading && repositories.length === 0) {
    return (
      <>
        {/* Stats bar skeleton */}
        <div className="mb-5 flex items-center justify-between">
          <div className="h-4 w-44 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-8 w-24 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </>
    )
  }

  // ── Error state ──────────────────────────────────────────────────────────────
  const errorBanner = error && (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 px-4 py-3">
      <span className="mt-0.5 text-red-500">⚠</span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-red-700 dark:text-red-300">Failed to load projects</p>
        <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{error}</p>
      </div>
      <button
        onClick={() => fetchProjects(true)}
        className="rounded-lg bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-300 transition-colors"
      >
        Retry
      </button>
    </div>
  )

  return (
    <>
      {/* ── Stats / Controls bar ───────────────────────────────────────────── */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 animate-intro-fade-up">
        <div className="flex items-center gap-3">
          {repositories.length > 0 && (
            <>
              {/* Repo count badge */}
              <span className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-xs font-semibold backdrop-blur transition-colors duration-300 hover:border-yellow-500/30">
                <span className="text-yellow-600">◆</span>
                {displayedCount} projects
              </span>
              {/* Last updated */}
              {lastFetch && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Updated {lastFetch.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </>
          )}
        </div>

        {/* Refresh button */}
        <button
          onClick={() => fetchProjects(true)}
          disabled={loading}
          className="group flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2 text-xs font-semibold backdrop-blur transition-all hover:border-yellow-500/50 hover:bg-yellow-500/10 disabled:opacity-50"
        >
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-700 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`}
          >
            <path d="M10 2A5 5 0 1 0 11 6.5" />
            <polyline points="10 0 10 3 7 3" />
          </svg>
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {errorBanner}

      {/* ── Empty state ────────────────────────────────────────────────────── */}
      {repositories.length === 0 && !loading && !error && (
        <div className="col-span-2 flex flex-col items-center justify-center rounded-xl border border-dashed border-black/20 dark:border-white/20 py-20 text-center">
          <span className="mb-3 text-4xl opacity-30">📭</span>
          <p className="text-sm text-gray-500">No public repositories found.</p>
          <button onClick={() => fetchProjects(true)} className="mt-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 px-4 py-2 text-xs font-semibold text-yellow-600 transition-colors">
            Check again
          </button>
        </div>
      )}

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      {repositories.length > 0 && (
        <>
          <style>{`
            @keyframes cardIn {
              from { opacity: 0; transform: translateY(24px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            .card-enter {
              opacity: 0;
              animation: cardIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {repositories.map((repo, i) => (
              <div
                key={repo.id || i}
                className={visible ? 'card-enter' : 'opacity-0'}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <RepositoryCard repo={repo} />
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="mt-10 text-center text-xs text-gray-400 dark:text-gray-600">
            All projects are open source —{' '}
            <a
              href="https://github.com/Kushal-Raj-G-S"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-600 hover:underline dark:text-yellow-500"
            >
              star something you like ⭐
            </a>
          </p>
        </>
      )}
    </>
  )
}
