import type { Metadata } from 'next'
import { FiGithub } from 'react-icons/fi'
import PageTitle from '../components/PageTitle'
import AnimatedBadge from './components/AnimatedBadge'
import AnimatedCard from './components/AnimatedCard'
import AnimatedSection from './components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Journey - Kushal Raj G S',
  openGraph: {
    title: 'Journey - Kushal Raj G S',
    url: '/journey',
  },
  alternates: {
    canonical: '/journey',
  },
}

const sectionHeading = (text: string) => (
  <h2 className="relative mb-6 inline-block text-2xl font-bold">
    {text}
    <span className="absolute -bottom-1.5 left-0 h-[3px] w-10 rounded-full bg-yellow-600" />
  </h2>
)

export default function JourneyPage() {
  return (
    <>
      <PageTitle title="My Journey" />

      {/* Internships Section */}
      <AnimatedSection className="mb-8">
        {sectionHeading('Professional Experience')}

        <div className="space-y-6">
          {/* AI Intern - VITAL */}
          <AnimatedCard className="group flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6" delay={100}>
            <img
              src="/media/logos/FinArna.png"
              alt="FinArna Logo"
              className="w-20 h-20 object-contain rounded-full bg-white shadow transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 sm:w-32 sm:h-32"
            />
            <div className="w-full flex-1">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold">AI Intern &mdash; VITAL</h3>
                <AnimatedBadge color="#57534e" isActive>
                  Completed
                </AnimatedBadge>
              </div>
              <div className="mb-4 flex items-center gap-3 text-sm">
                <div>
                  <p className="font-medium">FinArna Technologies Pvt. Ltd.</p>
                  <p className="opacity-75">Feb 2026 - Aug 2026</p>
                </div>
                <a
                  href="https://github.com/Kushal-Raj-G-S/Vision-Based-Intelligent-Triage-and-Autonomous-Lifesign-Analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View VITAL repository on GitHub"
                  className="flex items-center gap-1.5 rounded-full border border-black/10 px-2.5 py-1 text-xs font-medium opacity-70 transition-opacity hover:opacity-100 dark:border-white/10"
                >
                  <FiGithub size={13} />
                  Repo
                </a>
              </div>
              <ul className="ml-5 list-disc space-y-2 text-sm opacity-90">
                <li>
                  Architected <strong>VITAL</strong> (Vision-based Intelligent Triage and Autonomous LifeSign analytics), an AI-powered
                  contactless clinical triage platform integrating computer vision, biomedical signal processing, multi-agent AI
                  and LLM-driven clinical reasoning to estimate 6 physiological metrics from RGB video for real-time emergency
                  decision support.
                </li>
                <li>
                  Engineered an end-to-end physiological inference pipeline combining 468-landmark MediaPipe face tracking,
                  adaptive 250 Hz rPPG reconstruction, POS projection, Butterworth filtering, Welch PSD, and FFT for robust
                  contactless vital-sign estimation under real-world lighting, motion, and head-pose variations.
                </li>
                <li>
                  Designed an agentic clinical decision-making system using a 3-agent CrewAI workflow (Perception, Diagnostic,
                  and Coordinator) integrated with NVIDIA NIM to perform multi-agent reasoning, ESI Level 1&ndash;5 patient
                  prioritization, compensated shock detection, and drive ARIA, a multimodal assistant with OCR-enabled clinical
                  document understanding.
                </li>
              </ul>
            </div>
          </AnimatedCard>

          {/* Internship 2 */}
          <AnimatedCard className="group flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6" delay={100}>
            <img
              src="/media/logos/aviratha.jpeg"
              alt="Aviratha Digital Labs Logo"
              className="w-20 h-20 object-contain rounded-full bg-white shadow transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 sm:w-32 sm:h-32"
            />
            <div className="w-full flex-1">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold">IoT Intern</h3>
                <AnimatedBadge color="#57534e" isActive>
                  Current
                </AnimatedBadge>
              </div>
              <div className="mb-4 text-sm">
                <p className="font-medium">Aviratha Digital Labs</p>
                <p className="opacity-75">Jan 2025 - Present | Remote</p>
              </div>
              <ul className="ml-5 list-disc space-y-1 text-sm opacity-90">
                <li>Developing IoT part of the Hydroponics project</li>
                <li>Expertising in using ESP-32, AMB-82 mini,etc Microcontroller and in various sensors like PH, EC, DHT22,etc.</li>
                <li>Focusing on building a custom PCB and creating a Product </li>
              </ul>
            </div>
          </AnimatedCard>
        </div>
      </AnimatedSection>

      {/* Workshops and Tech Events Section */}
      <AnimatedSection className="mb-8" delay={80}>
        {sectionHeading('Workshops & Tech Events')}

        {/* Workshops Subsection */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-yellow-600 dark:text-yellow-500">Workshops</h3>
          <div className="space-y-6">
            <AnimatedCard delay={0}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-shrink-0">
                  <img src="/media/logos/aws.jpg" alt="AWS Workshop" className="w-24 h-24 object-contain rounded-lg bg-white shadow" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">AWS Tech Summit</h3>
                  </div>
                  <p className="text-sm font-medium mt-1">Offline | Bengaluru</p>
                  <ul className="mt-3 ml-5 list-disc space-y-1 text-sm opacity-90">
                    <li>Learned about fundamental AWS services and cloud architecture patterns</li>
                    <li>
                      Witnessed live demonstrations of how companies utilize AWS platforms, including detailed architecture showcases of
                      their products
                    </li>
                    <li>Explored case studies of major companies using AWS, including Razorpay, Zenoti, PayU, etc.</li>
                  </ul>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* Hackathons Subsection */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-yellow-600 dark:text-yellow-500">Hackathons</h3>
          <div className="space-y-6">
            {/* ImpactX 2025 */}
            <AnimatedCard className="group" delay={0}>
              <div className="flex flex-col gap-6">
                {/* Header with title and status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">ImpactX 2025</h3>
                  <AnimatedBadge color="#ca8a04">1st Place Winner 🏆 | ₹25,000</AnimatedBadge>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Team Photo */}
                  <div className="flex-shrink-0 lg:w-80 overflow-hidden rounded-lg">
                    <img
                      src="/media/logos/impactx.jpg"
                      alt="ImpactX 2025 Team Photo"
                      className="w-full max-w-sm lg:max-w-none h-auto object-contain rounded-lg bg-white shadow-lg border border-gray-200 dark:border-gray-600 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-4">RNSIT | Bengaluru</p>
                    <ul className="ml-5 list-disc space-y-2 text-sm opacity-90">
                      <li>
                        <strong>From an idea on paper to a prototype that spoke for itself</strong> — pushed through multiple rounds of pitches and prototype evaluations.
                      </li>
                      <li>
                        Final jury round featured <strong>12 juries</strong> — 6 professors and 6 external experts, including representatives from 0xDay. What started as a formal evaluation transformed into an engaging live debate.
                      </li>
                      <li>
                        When technical terms escaped us, we explained the logic and meaning instead — the 0xDay juries actually started backing us, helping clarify our points and turning the session into a collective brainstorming moment.
                      </li>
                      <li>
                        <strong>🏆 Won First Place — Team Illu-minaati</strong> earning ₹25,000 and proving that consistency over confidence, clarity over jargon, and unwavering teamwork win the day.
                      </li>
                      <li>
                        Collaborated with an incredible team: <strong>Chinmay D M, Umashankar S, Thanmay M Shetty</strong> — a reminder that execution beats perfection every single time.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* DecodeX 2025 */}
            <AnimatedCard className="group" delay={60}>
              <div className="flex flex-col gap-6">
                {/* Header with title and status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">DecodeX 2025</h3>
                  <AnimatedBadge color="#ca8a04">First Runner-Up 🥈 | ₹15,000</AnimatedBadge>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Team Photo */}
                  <div className="flex-shrink-0 lg:w-80 overflow-hidden rounded-lg">
                    <img
                      src="/media/logos/decodex.jpg"
                      alt="DecodeX 2025 Team Photo"
                      className="w-full max-w-sm lg:max-w-none h-auto object-contain rounded-lg bg-white shadow-lg border border-gray-200 dark:border-gray-600 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-4">Hosted by IEEE SPS BMSIT & IEEE Bangalore Section | Bengaluru</p>
                    <ul className="ml-5 list-disc space-y-2 text-sm opacity-90">
                      <li>
                        <strong>24 hours. Zero sleep. Infinite encoded and encrypted questions.</strong> A non-stop coding, decoding, and problem-solving marathon.
                      </li>
                      <li>
                        Each question was a puzzle layered in ciphered data and tricky syntax. Every submission required reverse-engineering encryption, testing multiple solutions, and validating approaches to match the exact output format.
                      </li>
                      <li>
                        <strong>🥈 Secured First Runner-Up position</strong> - Missing first place by just an hour on the final question, but earning ₹15,000 and invaluable experience.
                      </li>
                      <li>
                        Collaborated with my brilliant team: <strong>Chinmay D M, Umashankar S, Vishnu Kashyap.D</strong>, and myself—working like a single algorithm, iterating over every possible solution until perfection.
                      </li>
                      <li>
                        This wasn't just about ranks or prizes—it was about the adrenaline of decoding, the "aha!" moments, and pushing the limits of logic, syntax, and patience under pressure.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* HACKIO Hackathon */}
            <AnimatedCard className="group" delay={120}>
              <div className="flex flex-col gap-6">
                {/* Header with title and status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">HACKIO Hackathon - BioBloom</h3>
                  <AnimatedBadge color="#ca8a04">3rd Prize Winner 🏆 | ₹10,000</AnimatedBadge>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Team Photo */}
                  <div className="flex-shrink-0 lg:w-80 overflow-hidden rounded-lg">
                    <img
                      src="/media/logos/hackio.jpg"
                      alt="HACKIO Hackathon Team Photo"
                      className="w-full max-w-sm lg:max-w-none h-auto object-contain rounded-lg bg-white shadow-lg border border-gray-200 dark:border-gray-600 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-4">KSSEM | Bengaluru | Nov 7-8, 2025</p>
                    <ul className="ml-5 list-disc space-y-2 text-sm opacity-90">
                      <li>
                        <strong>Unexpected but well-deserved success</strong> — BioBloom had already performed well in previous hackathons, so we approached this with a simple mindset: show up, present cleanly, and see how far it goes.
                      </li>
                      <li>
                        Round 1 focused on mentoring and discussion, where we walked through our core idea, research backing, and problem-solving approach with honest, grounded presentation rather than over-optimization.
                      </li>
                      <li>
                        From 35-40 teams in Round 2, watched the list narrow from Top 15 to Top 10, then Top 5 — each call felt increasingly unreal as we were genuinely there to learn and observe.
                      </li>
                      <li>
                        <strong>🏆 Received special sponsored 3rd prize</strong> earning ₹10,000, with judges recognizing our clarity of thought, depth of research, and effective translation of ideas into practical solutions.
                      </li>
                      <li>
                        Collaborated with my team: <strong>Chinmay D M, Vineeth Sagar H L, Thanmay M Shetty</strong> — proving that experience, composure, and knowing your project well enough to let it speak for itself can lead to strong outcomes.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* The Social Hackathon */}
            <AnimatedCard className="group" delay={180}>
              <div className="flex flex-col gap-6">
                {/* Header with title and status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">The Social Hackathon</h3>
                  <AnimatedBadge color="#ca8a04">3rd Prize Winner 🏆 | ₹14,000</AnimatedBadge>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Certificate Image - Much Larger */}
                  <div className="flex-shrink-0 lg:w-80 overflow-hidden rounded-lg">
                    <img
                      src="/media/logos/cmrit.jpeg"
                      alt="Social Hackathon Certificate"
                      className="w-full max-w-sm lg:max-w-none h-auto object-contain rounded-lg bg-white shadow-lg border border-gray-200 dark:border-gray-600 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-4">Offline | Bengaluru</p>
                    <ul className="ml-5 list-disc space-y-2 text-sm opacity-90">
                      <li>
                        <strong>Competed in a 24-hour hackathon</strong> focused on social impact solutions - AgriTech
                      </li>
                      <li>
                        <strong>National-level competition</strong> - Was against 90+ teams gathered from all over India
                      </li>
                      <li>
                        <strong>🏆 Won the third prize!</strong> - Not just participated but achieved recognition
                      </li>
                      <li>Developed innovative AgriTech solution addressing real-world farming challenges</li>
                      <li>Collaborated with team members on full-stack development and presentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
