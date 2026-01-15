import { NextRequest, NextResponse } from 'next/server'
import getProjects from '../../(root)/(app)/projects/getProjects'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Simple in-memory cache
let cachedData: any = null
let lastFetch = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const now = Date.now()
    const forceRefresh = request.nextUrl.searchParams.get('refresh') === 'true'

    // Use cache if available and not expired (unless force refresh)
    if (!forceRefresh && cachedData && now - lastFetch < CACHE_DURATION) {
      console.log('API: Returning cached repositories')
      return NextResponse.json(
        {
          ...cachedData,
          cached: true,
          cacheAge: Math.round((now - lastFetch) / 1000),
        },
        {
          headers: {
            'Cache-Control': 'public, max-age=300', // 5 minutes client cache
          },
        },
      )
    }

    console.log('API: Fetching fresh GitHub projects...')
    const repositories = await getProjects()
    console.log(`API: Returning ${repositories.length} repositories`)

    // Update cache
    cachedData = {
      repositories,
      timestamp: new Date().toISOString(),
      count: repositories.length,
    }
    lastFetch = now

    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, max-age=300', // 5 minutes client cache
      },
    })
  } catch (error) {
    console.error('API: Error fetching projects:', error)

    // Return cached data if available, even on error
    if (cachedData) {
      console.log('API: Returning stale cached data due to error')
      return NextResponse.json({
        ...cachedData,
        cached: true,
        stale: true,
        error: 'Fresh data unavailable, showing cached results',
      })
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch repositories',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    )
  }
}
