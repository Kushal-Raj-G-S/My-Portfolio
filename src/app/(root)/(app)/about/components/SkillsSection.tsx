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
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-bold">Skills</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => {
          const isExpanded = expandedCategories.has(category.title)
          const displaySkills = isExpanded ? category.skills : category.skills.slice(0, 4)

          return (
            <div key={category.title} className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${category.color}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <h3 className="font-semibold text-sm">{category.title}</h3>
                </div>
                {category.skills.length > 4 && (
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="text-xs px-2 py-1 rounded bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/40 transition-colors"
                  >
                    {isExpanded ? 'Show Less' : `+${category.skills.length - 4}`}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {displaySkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-full bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {category.skills.length > 4 && !isExpanded && (
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="mt-2 text-xs text-gray-600 dark:text-gray-400 hover:underline"
                >
                  View all {category.skills.length} skills
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
