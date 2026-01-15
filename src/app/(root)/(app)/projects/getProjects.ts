import { IRepository } from '@/types'
import timeFromNow from '@/utils/time-from-now'
import 'server-only'

// GitHub username should be case-sensitive
const username = process.env.GH_USERNAME || 'Kushal-Raj-G-S'
const apiKey = process.env.GH_API_KEY

const repositoriesUrl = `https://api.github.com/users/${username}/repos?sort=updated&visibility=public&affiliation=owner`

const fetchOptions: RequestInit = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(apiKey ? { Authorization: 'Bearer ' + apiKey } : {}),
  },
  // Always fetch fresh data when called via API
  cache: 'no-store',
}

const getProjects = async (): Promise<IRepository[]> => {
  try {
    console.log('Fetching repositories from:', repositoriesUrl)
    const response = await fetch(repositoriesUrl, fetchOptions)

    if (!response.ok) {
      console.error('GitHub API response not OK:', response.status, response.statusText)

      // Check if it's a rate limit error
      if (response.status === 403) {
        const resetTime = response.headers.get('X-RateLimit-Reset')
        const remaining = response.headers.get('X-RateLimit-Remaining')
        console.log('Rate limit exceeded. Remaining:', remaining, 'Reset time:', resetTime)

        if (resetTime) {
          const resetDate = new Date(parseInt(resetTime) * 1000)
          console.log('Rate limit resets at:', resetDate.toLocaleString())
        }
      }

      // Return a test repository if GitHub API fails
      return getDummyRepository()
    }

    let repositories = (await response.json()) as any[]
    console.log('Repositories fetched:', repositories.length)

    // If no repositories, return a test repository
    if (repositories.length === 0) {
      console.log('No repositories found for user:', username)
      return getDummyRepository()
    }

    // Filter out forked repositories to only show your own public repos
    repositories = repositories.filter((repo) => {
      return repo.languages_url && !repo.fork
    })

    console.log(`After filtering, found ${repositories.length} public non-fork repositories`)

    try {
      const promises = repositories.map(async (repo) => {
        try {
          // Fetch languages
          let languages: Array<{ name: string; size: number }> = []
          try {
            console.log('Fetching languages for repo:', repo.name, 'from URL:', repo.languages_url)
            const languagesRes = await fetch(repo.languages_url, fetchOptions)

            if (languagesRes.ok) {
              const languagesData = (await languagesRes.json()) as { [key: string]: number }
              console.log('Languages data for', repo.name, ':', languagesData)

              const totalSize = Object.values(languagesData).reduce((acc, size) => acc + size, 0)

              if (totalSize > 0) {
                languages = Object.entries(languagesData).map(([name, size]) => ({
                  name,
                  size: (size / totalSize) * 100,
                }))
                console.log('Processed languages for', repo.name, ':', languages)
              } else {
                languages = [{ name: 'Unknown', size: 100 }]
                console.log('No language data (zero size) for', repo.name)
              }
            } else {
              console.error('Error fetching languages for', repo.name, '- Status:', languagesRes.status)
              languages = [{ name: 'Unknown', size: 100 }]
            }
          } catch (langError) {
            console.error('Error fetching languages for repo:', repo.name, langError)
            languages = [{ name: 'Unknown', size: 100 }]
          }

          // Ensure we always have at least one language
          if (languages.length === 0) {
            console.log('No languages detected for', repo.name, '- Using Unknown')
            languages = [{ name: 'Unknown', size: 100 }]
          }

          // Fetch last commit
          let lastCommitDate
          let lastCommitAt = 'N/A'
          try {
            const commitsRes = await fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=1`, fetchOptions)
            if (commitsRes.ok) {
              const commitsData = (await commitsRes.json()) as any[]
              if (commitsData.length > 0) {
                const lastCommit = commitsData[0]
                lastCommitDate = lastCommit?.commit?.committer?.date
                lastCommitAt = lastCommitDate ? timeFromNow(lastCommitDate) : 'N/A'
              }
            }
          } catch (commitError) {
            console.error('Error fetching commits for repo:', repo.name, commitError)
          }

          // For repos without a description, try to get a 2-line summary from the README
          let description = repo.description
          if (!description || description.trim() === '') {
            description = await getReadmeSummary(repo.full_name)
          }

          return {
            id: repo.id,
            node_id: repo.node_id,
            name: repo.name,
            full_name: repo.full_name,
            description: description,
            html_url: repo.html_url,
            stargazers_url: repo.stargazers_url,
            forks_url: repo.forks_url,
            homepage: repo.homepage,
            license: repo.license,
            stargazers_count: repo.stargazers_count,
            watchers_count: repo.watchers_count,
            forks_count: repo.forks_count,
            topics: repo.topics || [],
            languages: languages,
            created_at: timeFromNow(repo.created_at),
            updated_at: timeFromNow(repo.updated_at),
            pushed_at: timeFromNow(repo.pushed_at),
            last_commit_at: lastCommitAt,
            last_commit_date: lastCommitDate,
          }
        } catch (repoError) {
          console.error('Error processing repository:', repo.name, repoError)
          return null
        }
      })

      const results = await Promise.all(promises)
      const allProjects = results.filter((p) => p !== null) as IRepository[]

      if (allProjects.length === 0) {
        return getDummyRepository()
      }

      // Sort projects by activity (last commit date) and popularity (stars)
      allProjects.sort((a, b) => {
        // First, prioritize by recent activity
        const aDate = a.last_commit_date ? new Date(a.last_commit_date).getTime() : 0
        const bDate = b.last_commit_date ? new Date(b.last_commit_date).getTime() : 0

        // If commits are within 30 days of each other, sort by stars
        const timeDiff = Math.abs(aDate - bDate)
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000

        if (timeDiff < thirtyDaysMs) {
          return (b.stargazers_count || 0) - (a.stargazers_count || 0)
        }

        // Otherwise, sort by most recent activity
        return bDate - aDate
      })

      return allProjects
    } catch (processError) {
      console.error('Error processing repositories:', processError)
      return getDummyRepository()
    }
  } catch (error) {
    console.error('Failed to fetch repositories:', error)
    return getDummyRepository()
  }
}

// Function to get a dummy repository for testing
function getDummyRepository(): IRepository[] {
  return [
    {
      id: 0,
      node_id: 'mock',
      name: 'GitHub Connection Issue',
      full_name: `${username}/github-connection-issue`,
      description:
        "We're having trouble connecting to your GitHub account. Please check your GitHub username and make sure you have public, non-forked repositories.",
      html_url: `https://github.com/${username}`,
      stargazers_url: '',
      forks_url: '',
      homepage: '',
      license: undefined,
      stargazers_count: 0,
      watchers_count: 0,
      forks_count: 0,
      topics: ['debug'],
      languages: [{ name: 'JavaScript', size: 100 }],
      created_at: 'now',
      updated_at: 'now',
      pushed_at: 'now',
      last_commit_at: 'now',
      last_commit_date: new Date().toISOString(),
    },
  ]
}

// Fetches the README and returns the first few paragraphs or up to 400 characters
async function getReadmeSummary(fullName: string): Promise<string> {
  try {
    console.log(`Fetching README for ${fullName}...`)
    const res = await fetch(`https://api.github.com/repos/${fullName}/readme`, fetchOptions)

    if (!res.ok) {
      console.log(`No README found for ${fullName} - Status: ${res.status}`)
      return 'No description available'
    }

    const data = await res.json()
    if (!data.content) {
      console.log(`README content missing for ${fullName}`)
      return 'No description available'
    }

    let content = data.content
    if (data.encoding === 'base64') {
      content = Buffer.from(content, 'base64').toString('utf-8')
    }

    // Clean and extract meaningful content from the README
    return extractReadmeContent(content)
  } catch (e) {
    console.error(`Error getting README for ${fullName}:`, e)
    return 'No description available'
  }
}

// Extract meaningful content from README
function extractReadmeContent(content: string): string {
  try {
    // Remove code blocks as they're not useful for descriptions
    content = content.replace(/```[\s\S]*?```/g, '')

    // Split content by lines and filter out empty lines and headers
    let lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('---'))

    // Get meaningful paragraph text (first few non-empty lines that look like sentences)
    let meaningfulLines = lines
      .filter((line) => line.length > 20 && /[a-z]/i.test(line) && !line.startsWith('- ') && !line.startsWith('* '))
      .slice(0, 5)

    // If we didn't find meaningful paragraphs, fallback to any non-empty lines
    if (meaningfulLines.length === 0) {
      meaningfulLines = lines.filter((line) => line.length > 0).slice(0, 5)
    }

    // Join the first 3-4 lines to get a good description
    let result = meaningfulLines.slice(0, 4).join(' ')

    // Truncate to reasonable length (400 chars max) if needed
    if (result.length > 400) {
      // Try to truncate at a sentence boundary
      const truncated = result.substring(0, 400)
      const lastPeriodPos = truncated.lastIndexOf('.')

      if (lastPeriodPos > 300) {
        // If we found a good sentence boundary, use it
        result = truncated.substring(0, lastPeriodPos + 1)
      } else {
        // Otherwise, just cut at 400 chars and add ellipsis
        result = truncated + '...'
      }
    }

    return result || 'No description available'
  } catch (e) {
    console.error('Error extracting README content:', e)
    return 'No description available'
  }
}

export default getProjects
