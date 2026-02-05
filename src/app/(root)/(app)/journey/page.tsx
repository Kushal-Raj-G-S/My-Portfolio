import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'

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

export default function JourneyPage() {
  return (
    <>
      <PageTitle title="My Journey" />

      {/* Internships Section */}
      <section className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Professional Experience</h2>

        <div className="space-y-6">
          {/* Internship 1 */}
          <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80 flex items-center gap-6">
            <img src="/media/logos/technest.png" alt="TechNest Logo" className="w-32 h-32 object-contain rounded-full bg-white shadow" />
            <div className="flex-1">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold">Full Stack Development Intern</h3>
                <span className="rounded-full bg-yellow-600 px-3 py-1 text-xs text-white">Completed</span>
              </div>
              <div className="mb-4 text-sm">
                <p className="font-medium">TechNest Intern</p>
                <p className="opacity-75">June 2025 - August 2025 | Bengaluru, India</p>
              </div>
              <ul className="ml-5 list-disc space-y-1 text-sm opacity-90">
                <li>Working on full-stack development using React, NextJS and Node.js</li>
                <li>Implementing responsive UI designs and integrating with backend APIs</li>
                <li>Collaborating with cross-functional teams to deliver high-quality web applications</li>
              </ul>
            </div>
          </div>

          {/* Internship 2 */}
          <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80 flex items-center gap-6">
            <img
              src="/media/logos/aviratha.jpeg"
              alt="Aviratha Digital Labs Logo"
              className="w-32 h-32 object-contain rounded-full bg-white shadow"
            />
            <div className="flex-1">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold">IoT Intern</h3>
                <span className="rounded-full bg-gray-600/70 px-3 py-1 text-xs text-white">Current</span>
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
          </div>
        </div>
      </section>

      {/* Workshops and Tech Events Section */}
      <section className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Workshops & Tech Events</h2>

        {/* Workshops Subsection */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-yellow-600 dark:text-yellow-500">Workshops</h3>
          <div className="space-y-6">
            <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80">
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
            </div>
          </div>
        </div>

        {/* Hackathons Subsection */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-yellow-600 dark:text-yellow-500">Hackathons</h3>
          <div className="space-y-6">
            {/* ImpactX 2025 */}
            <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80">
              <div className="flex flex-col gap-6">
                {/* Header with title and status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">ImpactX 2025</h3>
                  <span className="rounded-full bg-yellow-600 px-3 py-1 text-xs text-white">1st Place Winner 🏆 | ₹25,000</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Team Photo */}
                  <div className="flex-shrink-0 lg:w-80">
                    <img
                      src="/media/logos/impactx.jpg"
                      alt="ImpactX 2025 Team Photo"
                      className="w-full max-w-sm lg:max-w-none h-auto object-contain rounded-lg bg-white shadow-lg border border-gray-200 dark:border-gray-600"
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
            </div>

            {/* DecodeX 2025 */}
            <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80">
              <div className="flex flex-col gap-6">
                {/* Header with title and status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">DecodeX 2025</h3>
                  <span className="rounded-full bg-yellow-600 px-3 py-1 text-xs text-white">First Runner-Up 🥈 | ₹15,000</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Team Photo */}
                  <div className="flex-shrink-0 lg:w-80">
                    <img
                      src="/media/logos/decodex.jpg"
                      alt="DecodeX 2025 Team Photo"
                      className="w-full max-w-sm lg:max-w-none h-auto object-contain rounded-lg bg-white shadow-lg border border-gray-200 dark:border-gray-600"
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
            </div>

            {/* The Social Hackathon */}
            <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80">
              <div className="flex flex-col gap-6">
                {/* Header with title and status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">The Social Hackathon</h3>
                  <span className="rounded-full bg-yellow-600 px-3 py-1 text-xs text-white">3rd Prize Winner 🏆</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Certificate Image - Much Larger */}
                  <div className="flex-shrink-0 lg:w-80">
                    <img
                      src="/media/logos/cmrit.jpeg"
                      alt="Social Hackathon Certificate"
                      className="w-full max-w-sm lg:max-w-none h-auto object-contain rounded-lg bg-white shadow-lg border border-gray-200 dark:border-gray-600"
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
            </div>
          </div>
        </div>
      </section>

      {/* Clubs & Organizations */}
      <section className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Clubs & Organizations</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80 flex items-center gap-6">
            <img src="/media/logos/ras.jpeg" alt="IEEE RAS Logo" className="w-32 h-32 object-contain rounded-full bg-white shadow" />
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold">IEEE RAS</h3>
              <p className="mb-2 text-sm font-medium">Project Management | BMSIT</p>
              <p className="text-sm opacity-90">
                Making complex project and also a part of organizing events such as Hackathons, Workshops
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80 flex items-center gap-6">
            <img
              src="/media/logos/coding club.png"
              alt="Coding Club Logo"
              className="w-32 h-32 object-contain rounded-full bg-white shadow"
            />
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold">Coding Club</h3>
              <p className="mb-2 text-sm font-medium">Social Media and Design | BMSIT</p>
              <p className="text-sm opacity-90">Capturing the moments transforming them into stunning reels</p>
              <p className="text-sm opacity-90">Creating marketing reels for the events such as Hackathons, Workshops</p>
            </div>
          </div>

          <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80 flex items-center gap-6">
            <img src="/media/logos/arvr.jpeg" alt="ARVR Club Logo" className="w-32 h-32 object-contain rounded-full bg-white shadow" />
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold">ARVR Club</h3>
              <p className="mb-2 text-sm font-medium">Marketing | BMSIT</p>
              <p className="text-sm opacity-90">
                Crowd gathering, attention gathering of the audience or public, delivering the info about of Workshops, Hackathons,etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning & Development */}
      <section className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Learning & Development</h2>

        <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur dark:bg-black/80">
          <ul className="space-y-4">
            <li className="border-l-4 border-yellow-600 pl-4">
              <h3 className="text-lg font-bold">Online Learning Pathways</h3>
              <p className="text-sm opacity-90">Coursera - Machine Learning Specialization | In Progress</p>
            </li>
            <li className="border-l-4 border-yellow-600 pl-4">
              <h3 className="text-lg font-bold">Web Development Workshop</h3>
              <p className="text-sm opacity-90">Learned React.js and Next.js fundamentals | March 2025</p>
            </li>
            <li className="border-l-4 border-yellow-600 pl-4">
              <h3 className="text-lg font-bold">Participated in Code Jam</h3>
              <p className="text-sm opacity-90">Algorithmic problem solving competition | April 2025</p>
            </li>
            <li className="border-l-4 border-yellow-600 pl-4">
              <h3 className="text-lg font-bold">GitHub Campus Expert Training</h3>
              <p className="text-sm opacity-90">Learning community leadership skills | February 2025</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
