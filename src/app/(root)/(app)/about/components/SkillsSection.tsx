'use client'

import { motion, type Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiCpu, FiEye, FiTool } from 'react-icons/fi'
import { LuBraces } from 'react-icons/lu'

interface SkillCategory {
  title: string
  skills: string[]
  Icon: React.ComponentType<{ size?: number }>
}

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & LLM Engineering',
    skills: [
      'Agentic AI',
      'Multi-Agent Systems',
      'CrewAI',
      'LangChain',
      'Retrieval-Augmented Generation (RAG)',
      'Model Context Protocol (MCP)',
      'Knowledge Graphs',
      'Semantic Routing',
    ],
    Icon: FiCpu,
  },
  {
    title: 'Computer Vision & Machine Learning',
    skills: ['Computer Vision', 'MediaPipe', 'DSP', 'CNNs', 'SentenceTransformers', 'FAISS', 'GLiNER'],
    Icon: FiEye,
  },
  {
    title: 'Full-Stack Engineering',
    skills: ['Python', 'FastAPI', 'Node.js', 'Next.js', 'React', 'TypeScript', 'PostgreSQL', 'REST APIs', 'WebSockets'],
    Icon: LuBraces,
  },
  {
    title: 'Infrastructure & Developer Tools',
    skills: ['Docker', 'Supabase', 'Neon PostgreSQL', 'Cloudflare R2', 'Git', 'GitHub', 'Claude Code / Cowork'],
    Icon: FiTool,
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

function SkillCard({ category, isExpanded, onToggle }: { category: SkillCategory; isExpanded: boolean; onToggle: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const displaySkills = isExpanded ? category.skills : category.skills.slice(0, 5)
  const hiddenCount = category.skills.length - displaySkills.length
  const { Icon } = category

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 5}deg) translateY(-3px)`
  }
  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariant}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-xl border border-black/10 bg-white/60 p-6 backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform [transform-style:preserve-3d] hover:border-yellow-600/30 hover:shadow-lg dark:border-white/10 dark:bg-black/40"
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-black/10 bg-black/[0.03] text-yellow-600 transition-colors group-hover:border-yellow-600/30 dark:border-white/10 dark:bg-white/[0.04] dark:text-yellow-500">
          <Icon size={18} />
        </div>
        <h3 className="text-base font-bold tracking-tight">{category.title}</h3>
      </div>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-2">
        {displaySkills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-black/5 bg-black/[0.03] px-3 py-1.5 text-sm font-medium tracking-tight opacity-85 transition-colors group-hover:opacity-100 dark:border-white/5 dark:bg-white/[0.04]"
          >
            {skill}
          </span>
        ))}
        {!isExpanded && hiddenCount > 0 && (
          <button
            onClick={onToggle}
            className="rounded-md border border-dashed border-black/15 px-3 py-1.5 text-sm font-medium opacity-60 transition-opacity hover:opacity-100 dark:border-white/15"
          >
            +{hiddenCount} more
          </button>
        )}
        {isExpanded && category.skills.length > 5 && (
          <button
            onClick={onToggle}
            className="rounded-md border border-dashed border-black/15 px-3 py-1.5 text-sm font-medium opacity-60 transition-opacity hover:opacity-100 dark:border-white/15"
          >
            Show less
          </button>
        )}
      </div>

      {/* Accent glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-yellow-600/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  )
}

export default function SkillsSection() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (title: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(title)) {
      newExpanded.delete(title)
    } else {
      newExpanded.add(title)
    }
    setExpandedCategories(newExpanded)
  }

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
        <p className="text-sm opacity-60">Grouped by area, roughly in order of depth.</p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={container}
        className="grid gap-5 md:grid-cols-2"
      >
        {skillCategories.map((category) => (
          <SkillCard
            key={category.title}
            category={category}
            isExpanded={expandedCategories.has(category.title)}
            onToggle={() => toggleCategory(category.title)}
          />
        ))}
      </motion.div>
    </div>
  )
}
