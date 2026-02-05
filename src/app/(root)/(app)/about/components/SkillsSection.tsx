'use client'

import { useState } from 'react'

interface SkillCategory {
  title: string
  skills: string[]
  icon: string
  color: string
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'C'],
    icon: '💻',
    color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700',
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Django'],
    icon: '⚡',
    color: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700',
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL'],
    icon: '🗄️',
    color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700',
  },
  {
    title: 'Tools & Technologies',
    skills: ['Git', 'Docker', 'Firebase'],
    icon: '🛠️',
    color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700',
  },
  {
    title: 'AI & ML',
    skills: [
      'TensorFlow',
      'PyTorch',
      'OpenAI',
      'LangChain',
      'Hugging Face',
      'DeepSeek',
      'Gemini',
      'Claude',
      'Llama',
      'GPT',
      'RAG',
      'LLMs',
      'Embeddings',
      'Fine-tuning',
      'Prompt Engineering',
    ],
    icon: '🤖',
    color: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
  },
  {
    title: 'Soft Skills',
    skills: [
      'Problem-solving',
      'Communication',
      'Teamwork',
      'Adaptability',
      'Boldness',
      'Creativity',
      'Leadership',
      'Time Management',
      'Self-motivation',
      'Self-discipline',
      'Self-awareness',
      'Self-improvement',
      'Self-reflection',
      'Self-evaluation',
      'Self-correction',
      'Self-development',
      'Self-growth',
    ],
    icon: '🧠',
    color: 'bg-teal-100 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700',
  },
]

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
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-bold md:text-3xl">Skills & Expertise</h2>
        <p className="text-base opacity-75">Technologies and tools I work with to bring ideas to life</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => {
          const isExpanded = expandedCategories.has(category.title)
          const displaySkills = isExpanded ? category.skills : category.skills.slice(0, 4)

          return (
            <div
              key={category.title}
              className={`group relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${category.color}`}
            >
              {/* Icon badge */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/60 text-xl shadow-sm dark:bg-black/40">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-base">{category.title}</h3>
                </div>
                {category.skills.length > 4 && (
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="rounded-md bg-white/60 px-2.5 py-1 text-xs font-semibold transition-all hover:bg-white/80 dark:bg-black/30 dark:hover:bg-black/50"
                  >
                    {isExpanded ? '−' : `+${category.skills.length - 4}`}
                  </button>
                )}
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-2">
                {displaySkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-white/70 px-3 py-1.5 text-xs font-medium shadow-sm transition-all hover:bg-white hover:shadow dark:bg-black/40 dark:hover:bg-black/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* View all link */}
              {category.skills.length > 4 && !isExpanded && (
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="mt-3 text-xs font-semibold opacity-60 transition-opacity hover:opacity-100 hover:underline"
                >
                  View all {category.skills.length} skills →
                </button>
              )}

              {/* Accent gradient */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-600/10 to-transparent opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
