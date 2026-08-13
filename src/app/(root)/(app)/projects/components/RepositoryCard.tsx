'use client'
import { PROJECT_YOUTUBE_VIDEOS } from '@/constans/common'
import langColors from '@/constans/langColors'
import { IRepository } from '@/types'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiStar, FiX } from 'react-icons/fi'
import LangBar from './LangBar'
import LangTextAnimation from './LangTextAnimation'

const AUTOPLAY_MS = 5000

function useRepoMedia(repoName: string) {
  const [media, setMedia] = useState<{ images: string[]; videos: string[] }>({ images: [], videos: [] })
  useEffect(() => {
    let cancelled = false
    async function fetchMedia() {
      try {
        const res = await fetch(`/api/project-images?repo=${encodeURIComponent(repoName)}`)
        if (res.ok) {
          const data = await res.json()
          if (!cancelled) {
            setMedia({
              images: data.images || [],
              videos: data.videos || []
            })
          }
        }
      } catch (err) {
        console.error('Failed to load project media:', err)
      }
    }
    fetchMedia()
    return () => { cancelled = true }
  }, [repoName])
  return media
}

// ── Ultra-Sleek Modern Arrow Button ──────────────────────────────────────────
const Arrow: React.FC<{
  dir: 'l' | 'r'
  onClick: (e: React.MouseEvent) => void
  visible: boolean
}> = ({ dir, onClick, visible }) => (
  <button
    onClick={onClick}
    onMouseDown={(e) => e.stopPropagation()}
    onMouseUp={(e) => e.stopPropagation()}
    onTouchStart={(e) => e.stopPropagation()}
    onTouchEnd={(e) => e.stopPropagation()}
    aria-label={dir === 'l' ? 'Previous' : 'Next'}
    className={`
      absolute top-1/2 -translate-y-1/2 z-20
      flex items-center justify-center
      w-9 h-9 rounded-full
      transition-all duration-355 ease-out
      bg-black/30 backdrop-blur-md
      border border-white/10
      text-white/80 hover:text-white
      shadow-lg hover:bg-black/60 hover:scale-105 hover:border-white/30
      active:scale-95
      ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none'}
      ${dir === 'l' ? '-translate-x-2' : 'translate-x-2'}
    `}
    style={{ [dir === 'l' ? 'left' : 'right']: 10 }}
  >
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {dir === 'l' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  </button>
)

// ── Beautiful Lightbox Component ──────────────────────────────────────────────
const Lightbox: React.FC<{
  images: string[]
  videos: string[]
  youtubeId?: string
  initialMediaType: 'pics' | 'video'
  startIndex: number
  repo: IRepository
  onClose: () => void
}> = ({ images, videos, youtubeId, initialMediaType, startIndex, repo, onClose }) => {
  const [mediaType, setMediaType] = useState<'pics' | 'video'>(initialMediaType)
  const [idx, setIdx] = useState(startIndex)
  const [closing, setClosing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const requestClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 200)
  }, [onClose])

  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1))

  // Close on ESC, navigate with arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
      else if (e.key === 'ArrowLeft' && mediaType === 'pics') prev()
      else if (e.key === 'ArrowRight' && mediaType === 'pics') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [requestClose, mediaType])

  // Volume setting for autoplaying lightbox video
  useEffect(() => {
    if (mediaType === 'video' && videoRef.current) {
      videoRef.current.volume = 0.5
    }
  }, [mediaType])

  // Drag/swipe in lightbox
  const dragX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { dragX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragX.current !== null && mediaType === 'pics') {
      const diff = e.changedTouches[0].clientX - dragX.current
      if (diff < -40) next(); else if (diff > 40) prev()
    }
    dragX.current = null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(16px)',
        animation: `${closing ? 'lightboxBackdropOut' : 'lightboxBackdropIn'} 0.2s ease-out forwards`,
      }}
      onClick={requestClose}
    >
      <div
        className="relative w-full max-w-6xl flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        style={{
          background: 'linear-gradient(155deg, rgba(24,22,18,0.97), rgba(10,10,10,0.97))',
          maxHeight: '90vh',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
          animation: `${closing ? 'lightboxPanelOut' : 'lightboxPanelIn'} ${closing ? '0.2s' : '0.4s'} cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lightbox header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="h-9 w-9 flex-shrink-0 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center ring-1 ring-white/15">
            <img
              src={`/media/projects/${repo.name}/logo.png`}
              alt={repo.name}
              className="h-full w-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-bold text-sm text-white capitalize truncate hover:text-yellow-400 transition-colors leading-tight"
            >
              {repo.name.replaceAll('-', ' ')}
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-yellow-500 hover:text-yellow-400 hover:underline truncate block mt-0.5"
              >
                🔗 {(() => { try { return new URL(repo.homepage).host } catch { return repo.homepage } })()}
              </a>
            )}
          </div>

          {/* Lightbox Media Switcher */}
          {(videos.length > 0 || youtubeId) && (
            <div className="flex bg-white/10 rounded-full p-0.5 border border-white/5 text-[9px] font-bold tracking-wider mr-2 select-none">
              <button
                onClick={() => setMediaType('pics')}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${mediaType === 'pics' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
              >
                PICS
              </button>
              <button
                onClick={() => setMediaType('video')}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${mediaType === 'video' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
              >
                VIDEO
              </button>
            </div>
          )}

          {mediaType === 'pics' && (
            <span className="text-xs text-white/40 mr-2 flex-shrink-0">{idx + 1} / {images.length}</span>
          )}
          
          <button
            onClick={requestClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300 flex-shrink-0"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Lightbox image / video area */}
        <div
          className="relative w-full overflow-hidden bg-black"
          style={{ aspectRatio: '16 / 9' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {mediaType === 'video' && youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={`${repo.name} demo video`}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : mediaType === 'video' && videos.length > 0 ? (
            <video
              ref={videoRef}
              src={videos[0]}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <>
              {images.map((src, i) => (
                <div
                  key={src}
                  className="absolute inset-0 transition-[transform,opacity] duration-400 ease-out"
                  style={{
                    transform: `translateX(${(i - idx) * 100}%)`,
                    opacity: i === idx ? 1 : 0,
                  }}
                >
                  <img
                    key={i === idx ? `${src}-active` : src}
                    src={src}
                    alt={`${repo.name} ${i + 1}`}
                    className="w-full h-full object-contain"
                    style={i === idx ? { animation: 'kenBurns 6s ease-out forwards' } : undefined}
                    draggable={false}
                  />
                </div>
              ))}

              {images.length > 1 && (
                <>
                  <Arrow dir="l" onClick={(e) => { e.stopPropagation(); prev() }} visible />
                  <Arrow dir="r" onClick={(e) => { e.stopPropagation(); next() }} visible />
                </>
              )}
            </>
          )}
        </div>

        {/* Lightbox thumbnail strip (pics only) */}
        {mediaType === 'pics' && images.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 bg-white/[0.01] border-t border-white/[0.05] [scrollbar-width:none]">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIdx(i)}
                className={`relative flex-shrink-0 overflow-hidden rounded-md border transition-all duration-300 ${
                  i === idx
                    ? 'w-16 h-11 border-yellow-400 ring-2 ring-yellow-400/40 opacity-100'
                    : 'w-14 h-10 border-white/10 opacity-50 hover:opacity-90 hover:border-white/30'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
              </button>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes lightboxBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lightboxPanelIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes lightboxBackdropOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes lightboxPanelOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to   { opacity: 0; transform: scale(0.94) translateY(10px); }
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
      `}</style>
    </div>,
    document.body
  )
}

// ── Main Card Component ───────────────────────────────────────────────────────
const RepositoryCard: React.FC<{ repo: IRepository }> = ({ repo }) => {
  const { images, videos } = useRepoMedia(repo.name)
  const youtubeId = PROJECT_YOUTUBE_VIDEOS[repo.name]
  const hasVideo = videos.length > 0 || !!youtubeId
  const [idx, setIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [mediaType, setMediaType] = useState<'pics' | 'video'>('pics')

  const prev = useCallback(() => setIdx((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length])
  const next = useCallback(() => setIdx((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length])

  // Set default media type to video if a video is available
  useEffect(() => {
    if (hasVideo) {
      setMediaType('video')
    }
  }, [hasVideo])

  // Auto-play: advance every 5s unless hovered, only 1 image, or in video mode
  useEffect(() => {
    if (hovered || images.length <= 1 || mediaType === 'video') return
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [hovered, images.length, mediaType])

  // Drag / swipe
  const dragX = useRef<number | null>(null)
  const isDrag = useRef(false)

  const onMouseDown = (e: React.MouseEvent) => { dragX.current = e.clientX; isDrag.current = false }
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragX.current !== null && Math.abs(e.clientX - dragX.current) > 6) isDrag.current = true
  }
  const onMouseUp = (e: React.MouseEvent) => {
    if (dragX.current !== null) {
      if (isDrag.current && mediaType === 'pics') {
        const d = e.clientX - dragX.current
        if (d < -40) next(); else if (d > 40) prev()
      } else if (!isDrag.current) {
        // Click (no drag) → open lightbox
        setLightbox(true)
      }
    }
    dragX.current = null; isDrag.current = false
  }
  const onTouchStart = (e: React.TouchEvent) => { dragX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragX.current !== null) {
      const d = e.changedTouches[0].clientX - dragX.current
      if (Math.abs(d) < 10) {
        setLightbox(true)
      } else if (d < -40 && mediaType === 'pics') {
        next();
      } else if (d > 40 && mediaType === 'pics') {
        prev()
      }
    }
    dragX.current = null
  }

  // Logo fallback
  const LOGO_EXTS = ['png', 'jpg', 'jpeg', 'webp']
  const [logoExt, setLogoExt] = useState(0)
  const logoSrc = logoExt < LOGO_EXTS.length ? `/media/projects/${repo.name}/logo.${LOGO_EXTS[logoExt]}` : null

  // Cursor-tracking tilt + spotlight glow
  const cardRef = useRef<HTMLDivElement>(null)
  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-4px)`
  }
  const onCardMouseLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = ''
  }

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={onCardMouseMove}
        onMouseLeave={onCardMouseLeave}
        className="
          group/card relative flex flex-col overflow-hidden rounded-xl
          bg-white/70 dark:bg-black/75 backdrop-blur-md
          border border-black/10 dark:border-white/10
          shadow-sm hover:shadow-xl hover:shadow-yellow-500/10
          hover:border-yellow-500/30
          transition-[transform,box-shadow,border-color] duration-300 ease-out
          will-change-transform [transform-style:preserve-3d]
        "
        style={{ contentVisibility: 'auto' }}
      >
        {/* Top subtle highlight gradient glow */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
          <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center ring-1 ring-black/10 dark:ring-white/10 transition-transform duration-300 group-hover/card:scale-105">
            {logoSrc ? (
              <img src={logoSrc} alt={repo.name} className="h-full w-full object-cover" onError={() => setLogoExt((i) => i + 1)} />
            ) : (
              <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 select-none">{repo.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
              className="block font-bold text-sm capitalize leading-tight hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors truncate">
              {repo.name.replaceAll('-', ' ')}
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-yellow-600 dark:text-yellow-500 hover:underline truncate block mt-0.5">
                🔗 {(() => { try { return new URL(repo.homepage).host } catch { return repo.homepage } })()}
              </a>
            )}
          </div>
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-xs font-bold flex-shrink-0 opacity-60">
              <span>{repo.stargazers_count}</span><FiStar size={12} />
            </span>
          )}
        </div>

        {/* Media (Carousel / Video Player) */}
        {images.length > 0 || hasVideo ? (
          <div
            className="relative w-full overflow-hidden bg-black select-none cursor-pointer"
            style={{ aspectRatio: '16 / 9' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); onMouseUp({ clientX: (dragX.current ?? 0) } as React.MouseEvent) }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Top-Middle Video / Pics Switcher */}
            {hasVideo && (
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex bg-black/60 dark:bg-black/80 backdrop-blur-md rounded-full p-0.5 border border-white/10 text-[9px] font-black tracking-wider select-none shadow-lg">
                <button
                  onClick={(e) => { e.stopPropagation(); setMediaType('pics') }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                  className={`px-3 py-1 rounded-full transition-all duration-300 ${mediaType === 'pics' ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white'}`}
                >
                  PICS
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setMediaType('video') }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                  className={`px-3 py-1 rounded-full transition-all duration-300 ${mediaType === 'video' ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white'}`}
                >
                  VIDEO
                </button>
              </div>
            )}

            {/* Video Mode View */}
            {mediaType === 'video' && hasVideo ? (
              <div className="relative w-full h-full bg-black">
                {youtubeId ? (
                  <img
                    src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                    alt={`${repo.name} video thumbnail`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <video
                    src={videos[0]}
                    className="w-full h-full object-contain pointer-events-none"
                    preload="metadata"
                    muted
                    playsInline
                  />
                )}
                {/* Central play button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white/40 active:scale-95">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="ml-1">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              /* Pics Mode View */
              <>
                {images.map((src, i) => (
                  <div
                    key={src}
                    className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
                    style={{ transform: `translateX(${(i - idx) * 100}%)` }}
                  >
                    <img src={src} alt={`${repo.name} ${i + 1}`}
                      className="h-full w-full object-contain pointer-events-none transition-transform duration-700 ease-out group-hover/card:scale-[1.04]" draggable={false} />
                  </div>
                ))}

                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/75 to-transparent pointer-events-none z-[5]" />

                {/* Autoplay progress bar — restarts on each new slide */}
                {images.length > 1 && !hovered && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] z-20 overflow-hidden bg-white/10">
                    <div
                      key={idx}
                      className="h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500"
                      style={{ animation: `progressBar ${AUTOPLAY_MS}ms linear forwards` }}
                    />
                  </div>
                )}

                {/* Arrows — visible only on hover */}
                {images.length > 1 && (
                  <>
                    <Arrow dir="l" onClick={(e) => { e.stopPropagation(); prev() }} visible={hovered} />
                    <Arrow dir="r" onClick={(e) => { e.stopPropagation(); next() }} visible={hovered} />
                  </>
                )}

                {/* Dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                        className={`rounded-full transition-all duration-350 ${
                          i === idx ? 'w-5 h-1.5 bg-white shadow-md' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Counter */}
                {images.length > 1 && (
                  <span className="absolute top-2.5 right-2.5 z-10 text-[9px] font-bold text-white/80 bg-black/45 backdrop-blur-md rounded-full px-2 py-0.5 pointer-events-none tracking-wider">
                    {idx + 1} / {images.length}
                  </span>
                )}
              </>
            )}

            {/* Hover Expand Hint Icon - Bottom Right */}
            <span className={`absolute bottom-2.5 right-3.5 z-[8] flex items-center gap-1.5 text-[9px] font-bold text-white bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 pointer-events-none transition-all duration-300 transform ${hovered ? 'opacity-100 translate-y-0 shadow-lg' : 'opacity-0 translate-y-1'}`}>
              {mediaType === 'video' ? (
                <>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  PLAY VIDEO
                </>
              ) : (
                <>
                  <svg width="8.5" height="8.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  EXPAND
                </>
              )}
            </span>
          </div>
        ) : (
          <div
            className="flex w-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-400 dark:text-gray-600 text-xs font-medium tracking-widest uppercase border-y border-black/5 dark:border-white/5"
            style={{ aspectRatio: '16 / 9' }}
          >
            No preview
          </div>
        )}

        {/* Project Topics & Tags (Added back for premium developer portfolio look) */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="px-4 pt-3 flex flex-wrap gap-1.5 overflow-hidden max-h-7 select-none">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 border border-black/[0.03] dark:border-white/[0.03] transition-colors duration-300 group-hover/card:border-yellow-500/20 group-hover/card:text-yellow-600 dark:group-hover/card:text-yellow-500"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Language bar */}
        <div className="px-4 pt-3 pb-1 mt-auto">
          <div className="flex items-center justify-between">
            <LangTextAnimation items={repo.languages.map(({ name }) => name)} />
            <span className="flex items-center gap-1 text-xs font-bold opacity-60">
              <span>{repo.stargazers_count}</span><FiStar size={12} />
            </span>
          </div>
        </div>
        <div className="flex h-2 w-full bg-white dark:bg-black mt-2">
          {repo.languages.map((el) => (
            <LangBar key={el.name} className="h-full" size={el.size} color={langColors[el.name] || '#cccccc'} />
          ))}
        </div>
      </div>

      {/* Lightbox portal */}
      {lightbox && (
        <Lightbox
          images={images}
          videos={videos}
          youtubeId={youtubeId}
          initialMediaType={mediaType}
          startIndex={idx}
          repo={repo}
          onClose={() => setLightbox(false)}
        />
      )}

      {/* Keyframe for progress bar */}
      <style>{`
        @keyframes progressBar {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </>
  )
}

export default memo(RepositoryCard)
