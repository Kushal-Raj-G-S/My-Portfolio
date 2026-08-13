'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export default function AboutHero() {
  const frameRef = useRef<HTMLDivElement>(null)

  const onFrameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 10}deg)`
  }
  const onFrameMouseLeave = () => {
    if (frameRef.current) frameRef.current.style.transform = ''
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-12"
    >
      {/* Profile Image with animated gradient ring */}
      <motion.div variants={fadeUp} className="relative flex-shrink-0">
        <div className="relative h-fit w-fit [perspective:900px]">
          {/* Rotating conic-gradient ring */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-1.5 rounded-2xl opacity-70"
            style={{
              background: 'conic-gradient(from 0deg, #ca8a04, transparent 25%, transparent 75%, #ca8a04)',
            }}
          />
          <div
            ref={frameRef}
            onMouseMove={onFrameMouseMove}
            onMouseLeave={onFrameMouseLeave}
            className="group relative overflow-hidden rounded-2xl bg-white p-1 transition-transform duration-300 ease-out [transform-style:preserve-3d] dark:bg-black"
          >
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
        </div>
        {/* Accent decoration */}
        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-yellow-600/10 blur-2xl" />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Greeting */}
        <motion.div variants={fadeUp} className="space-y-3">
          <h2 className="text-3xl font-bold md:text-4xl">
            Kushal Raj G S
          </h2>
          <p className="text-lg font-medium text-yellow-600 dark:text-yellow-500">
            Backend & AI Systems Engineer
          </p>
        </motion.div>

        {/* Bio */}
        <div className="space-y-4 text-base leading-relaxed opacity-90 md:text-lg">
          <motion.p variants={fadeUp}>
            I like problems where the constraints are real — a video feed that has to work in bad
            lighting, a dataset too large to read by hand, a model output that has to be trusted
            before it ships anywhere near a decision. That&apos;s the kind of engineering I gravitate
            toward: less &ldquo;can I build a demo,&rdquo; more &ldquo;can this survive contact with
            actual data and actual users.&rdquo;
          </motion.p>

          <motion.p variants={fadeUp}>
            Right now that means an AI internship at FinArna, where I&apos;m building{' '}
            <span className="font-semibold text-yellow-600 dark:text-yellow-500">VITAL</span>
            {' '}— a system that reads someone&apos;s vitals off a plain video feed well enough to matter in an
            emergency. Outside of that I&apos;ve spent the last year building agentic AI products end
            to end — routing, retrieval, multi-agent verification, the unglamorous plumbing that
            makes an LLM&apos;s output something you can actually trust.
          </motion.p>

          <motion.p variants={fadeUp}>
            I&apos;d rather ship something that works for the ugly 20% of cases than something that
            looks good in a slide deck. That instinct is basically why I keep ending up in hackathons,
            and why I keep re-learning the same lesson: the hard part is never the demo, it&apos;s
            everything after it.
          </motion.p>

          <motion.p variants={fadeUp}>
            I&apos;m studying AI &amp; Machine Learning at BMSIT because I wanted the theory to catch
            up with what I was already building. Five hackathon podiums and a Best Paper Award at an
            IEEE conference later, it mostly has.
          </motion.p>

          <motion.p variants={fadeUp} className="font-medium">
            Open to backend, AI/ML, and full-stack engineering roles.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
          <motion.a
            download
            target="_blank"
            rel="nofollow"
            href="/media/KushalRajGS_1BY23AI072_BMSIT.pdf"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-yellow-600 px-6 py-3 font-semibold text-white shadow-lg shadow-yellow-600/0 transition-shadow hover:shadow-yellow-600/30"
          >
            <span className="relative z-10">Download Resume</span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-0.5"
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
          </motion.a>
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg border-2 border-yellow-600 bg-transparent px-6 py-3 font-semibold text-yellow-600 transition-colors hover:bg-yellow-600 hover:text-white"
            >
              <span>Get In Touch</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
