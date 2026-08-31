'use client'

import { gsap } from 'gsap'
import { motion, type Variants } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FiActivity,
  FiCpu,
  FiDatabase,
  FiEye,
  FiGlobe,
  FiSearch,
  FiTag,
  FiTool,
  FiType,
  FiWifi,
} from 'react-icons/fi'
import { LuBraces, LuNetwork } from 'react-icons/lu'
import {
  SiCloudflare,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithub,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSemanticweb,
  SiSupabase,
  SiTypescript,
} from 'react-icons/si'

type IconType = React.ComponentType<{ size?: number; color?: string; className?: string }>

interface Skill {
  name: string
  color?: string
  // Real brand mark, either an installed react-icons component (rendered in
  // its own canonical brand color, not a monochrome tint) or a local SVG for
  // brands react-icons hasn't packaged yet (LangChain, CrewAI, MCP,
  // MediaPipe, Claude — all fetched straight from Simple Icons). Only
  // skills with no real logo at all (RAG, DSP, FAISS, etc. — genuine
  // concepts/libraries with no brand mark) fall back to a plain icon glyph,
  // each still given its own distinct color instead of one flat tint.
  Icon?: IconType
  logoSrc?: string
  // For brand marks that are canonically black/near-black (GitHub, Next.js
  // via `color` below, or Anthropic/MCP as static SVGs) — swapped by theme so
  // they're never invisible against a same-toned card background.
  logoSrcDark?: string
  logoSrcLight?: string
}

interface SkillCategory {
  title: string
  Icon: IconType
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & LLM Engineering',
    Icon: FiCpu,
    skills: [
      { name: 'Agentic AI', Icon: FiCpu, color: '#F59E0B' },
      { name: 'Multi-Agent Systems', Icon: LuNetwork, color: '#06B6D4' },
      { name: 'CrewAI', logoSrc: '/media/skill-logos/crewai.svg', color: '#FF5A50' },
      { name: 'LangChain', logoSrc: '/media/skill-logos/langchain.svg', color: '#7FC8FF' },
      { name: 'RAG', Icon: FiSearch, color: '#8B5CF6' },
      {
        name: 'MCP',
        logoSrcDark: '/media/skill-logos/mcp-for-dark-theme.svg',
        logoSrcLight: '/media/skill-logos/mcp-for-light-theme.svg',
      },
      { name: 'Knowledge Graphs', Icon: LuNetwork, color: '#10B981' },
      { name: 'Semantic Routing', Icon: SiSemanticweb, color: '#005A9C' },
    ],
  },
  {
    title: 'Computer Vision & ML',
    Icon: FiEye,
    skills: [
      { name: 'Computer Vision', Icon: SiOpencv, color: '#5C3EE8' },
      { name: 'MediaPipe', logoSrc: '/media/skill-logos/mediapipe.svg', color: '#0097A7' },
      { name: 'DSP', Icon: FiActivity, color: '#EC4899' },
      { name: 'CNNs', Icon: FiCpu, color: '#F97316' },
      { name: 'SentenceTransformers', Icon: FiType, color: '#14B8A6' },
      { name: 'FAISS', Icon: FiDatabase, color: '#3B82F6' },
      { name: 'GLiNER', Icon: FiTag, color: '#EF4444' },
    ],
  },
  {
    title: 'Full-Stack Engineering',
    Icon: LuBraces,
    skills: [
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'REST APIs', Icon: FiGlobe, color: '#6366F1' },
      { name: 'WebSockets', Icon: FiWifi, color: '#22C55E' },
    ],
  },
  {
    title: 'Infrastructure & Dev Tools',
    Icon: FiTool,
    skills: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
      { name: 'Neon PostgreSQL', Icon: FiDatabase, color: '#00E5BF' },
      { name: 'Cloudflare R2', Icon: SiCloudflare, color: '#F38020' },
      { name: 'Git', Icon: SiGit, color: '#F03C2E' },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'Claude Code / Cowork', logoSrc: '/media/skill-logos/claude.svg' },
    ],
  },
]

const EASE = [0.16, 1, 0.3, 1] as const
const GSAP_EASE = 'power3.out'
const DURATION = 0.6
const EXPAND_RATIO = 0.42

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function SkillLogo({ skill, size }: { skill: Skill; size: number }) {
  if (skill.logoSrcDark && skill.logoSrcLight) {
    return (
      <>
        <img src={skill.logoSrcDark} alt="" className="hidden dark:block" style={{ width: size, height: size }} draggable={false} />
        <img src={skill.logoSrcLight} alt="" className="block dark:hidden" style={{ width: size, height: size }} draggable={false} />
      </>
    )
  }
  if (skill.logoSrc) {
    return <img src={skill.logoSrc} alt="" style={{ width: size, height: size }} draggable={false} />
  }
  const { Icon } = skill
  if (!Icon) return null
  // No explicit color means the brand mark is itself canonically black/near-
  // black (GitHub, Next.js) — invert with the theme instead of hardcoding one
  // that would vanish against a same-toned card.
  if (!skill.color) return <Icon size={size} className="text-black dark:text-white" />
  return <Icon size={size} color={skill.color} />
}

// A React Bits AccordionGallery, adapted from full-bleed photo panels to
// skill-logo panels: each category is a flex-grow panel that expands on
// hover/focus/click (GSAP-driven, same mechanic as the original), revealing
// a grid of that category's real, full-color skill logos instead of an image.
function SkillsAccordion() {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const gridRefs = useRef<(HTMLDivElement | null)[]>([])
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const firstRun = useRef(true)
  const [active, setActive] = useState(0)
  const count = skillCategories.length

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current
      if (!panels.length) return

      const grow = count > 1 ? (EXPAND_RATIO * (count - 1)) / (1 - EXPAND_RATIO) : 1
      timeline.current?.kill()
      const dur = animate ? DURATION : 0
      const tl = gsap.timeline()

      panels.forEach((panel, i) => {
        if (!panel) return
        const isActive = i === active
        const tilt = isActive ? 0 : i < active ? 5 : -5
        tl.to(panel, { flexGrow: isActive ? grow : 1, rotateY: tilt, duration: dur, ease: GSAP_EASE }, 0)

        const grid = gridRefs.current[i]
        if (grid) {
          tl.to(
            grid,
            { opacity: isActive ? 1 : 0, y: isActive ? 0 : 8, duration: isActive ? dur : dur * 0.6, ease: GSAP_EASE },
            0
          )
        }
      })

      timeline.current = tl
    },
    [active, count]
  )

  useEffect(() => {
    applyLayout(!firstRun.current)
    firstRun.current = false
  }, [applyLayout])

  useEffect(() => {
    return () => {
      timeline.current?.kill()
    }
  }, [])

  return (
    <div
      className="flex w-full gap-2.5 overflow-hidden"
      style={{ height: 520, perspective: 1400 }}
      role="list"
      aria-label="Skills accordion"
    >
      {skillCategories.map((category, i) => {
        const isActive = i === active
        const { Icon } = category
        return (
          <div
            key={category.title}
            ref={(el) => {
              panelRefs.current[i] = el
            }}
            className={`group relative min-w-0 flex-1 cursor-pointer overflow-hidden rounded-xl border transition-colors duration-300 [transform-style:preserve-3d] ${
              isActive
                ? 'border-yellow-600/40 bg-white dark:bg-black/60'
                : 'border-black/10 bg-black/[0.03] hover:border-yellow-600/20 dark:border-white/10 dark:bg-white/[0.03]'
            }`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setActive((i + 1) % count)
              else if (e.key === 'ArrowLeft') setActive((i - 1 + count) % count)
            }}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={category.title}
          >
            {/* Collapsed state: a wide column, so the label goes big and
                horizontal instead of squeezed sideways into a thin sliver —
                the whole point of the extra width a 4-way split leaves it. */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-3 text-center transition-opacity duration-300 md:gap-5 md:px-6 ${
                isActive ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-black/10 bg-black/[0.03] text-yellow-600 transition-colors duration-300 group-hover:border-yellow-600/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-yellow-500 md:h-16 md:w-16 md:rounded-2xl">
                <Icon size={20} className="md:hidden" />
                <Icon size={28} className="hidden md:block" />
              </div>
              <h3 className="w-full min-w-0 break-words text-xs font-bold leading-snug tracking-tight opacity-90 sm:text-sm md:text-lg lg:text-xl">
                {category.title}
              </h3>
            </div>

            {/* Expanded state: title + big colorful skill logo grid */}
            <div
              ref={(el) => {
                gridRefs.current[i] = el
              }}
              className="absolute inset-0 flex flex-col overflow-hidden p-6 opacity-0"
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
              <div className="mb-5 flex min-w-0 flex-shrink-0 items-center gap-2.5">
                <span className="flex-shrink-0 text-yellow-600 dark:text-yellow-500">
                  <Icon size={22} />
                </span>
                <h3 className="min-w-0 text-base font-bold leading-tight tracking-tight md:text-lg">{category.title}</h3>
              </div>
              <div
                className="grid flex-1 content-start gap-3 overflow-y-auto"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))' }}
              >
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2.5 rounded-xl border border-black/5 bg-black/[0.03] px-3 py-4 text-center transition-transform duration-200 hover:scale-105 dark:border-white/5 dark:bg-white/[0.04]"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center">
                      <SkillLogo skill={skill} size={40} />
                    </div>
                    <span className="text-xs font-medium leading-tight tracking-tight opacity-85">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function SkillsSection() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-8 space-y-1"
      >
        <h2 className="text-2xl font-bold md:text-3xl">Technical Skills</h2>
        <p className="text-sm opacity-60">Hover or tap a category to explore it.</p>
      </motion.div>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={container}>
        <motion.div variants={fadeUp}>
          <SkillsAccordion />
        </motion.div>
      </motion.div>
    </div>
  )
}
