import { SOCIALS } from '@/constans/common'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiGooglescholar, SiLeetcode } from 'react-icons/si'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-end gap-4 pb-20 md:justify-center md:pb-0">
      <h1 className="relative py-3">
        <span className="grid grid-cols-2">
          <span className="block text-center text-sm opacity-90">I'M</span>
        </span>{' '}
        <span className=" z-10 block text-[calc(1.825rem+6.9vw)] font-bold leading-none">KUSHAL RAJ G S</span>{' '}
        <span className="grid grid-cols-2 justify-items-end">
          <span className="block"></span>
          <span className="block text-sm opacity-90">AI Systems Engineer | Backend & Agentic Systems | Product Builder</span>
        </span>
      </h1>
      <div className="mx-auto flex">
        <a href={SOCIALS.IG} aria-label="Instagram" target="_blank" rel="noopener" className="mx-2 block p-2 opacity-80 hover:opacity-95">
          <FaInstagram size={20} />
        </a>
        <a href={SOCIALS.GH} aria-label="GitHub" target="_blank" rel="noopener" className="mx-2 block p-2 opacity-80 hover:opacity-95">
          <FaGithub size={20} />
        </a>
        <a href={SOCIALS.IN} aria-label="Linkedin" target="_blank" rel="noopener" className="mx-2 block p-2 opacity-80 hover:opacity-95">
          <FaLinkedin size={20} />
        </a>
        <a href={SOCIALS.SCHOLAR} aria-label="Google Scholar" target="_blank" rel="noopener" className="mx-2 block p-2 opacity-80 hover:opacity-95">
          <SiGooglescholar size={20} />
        </a>
        <a href={SOCIALS.LEETCODE} aria-label="LeetCode" target="_blank" rel="noopener" className="mx-2 block p-2 opacity-80 hover:opacity-95">
          <SiLeetcode size={20} />
        </a>
      </div>
    </div>
  )
}
