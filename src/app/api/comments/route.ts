import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const postId = searchParams.get('postId')

  if (!postId) {
    return NextResponse.json({ error: 'Post ID required' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    
    // Parse postId if needed
    let whereQuery: Record<string, unknown> = { post: { equals: postId } }
    if (/^\d+$/.test(postId)) {
        whereQuery = { post: { equals: parseInt(postId, 10) } }
    }

    const comments = await payload.find({
      collection: 'comments',
      where: {
        ...whereQuery,
        approved: { equals: true },
      },
      sort: '-createdAt',
      limit: 100,
    })

    return NextResponse.json({
      comments: comments.docs.map(comment => ({
        id: comment.id,
        author: comment.author,
        content: comment.content,
        createdAt: comment.createdAt,
      })),
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { postId, email, content } = body

    if (!postId || !email || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // Get user from waitlist
    const userQuery = await payload.find({
      collection: 'waitlist',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (userQuery.docs.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = userQuery.docs[0]
    
    // Parse postId to number (Postgres numeric IDs)
    let resolvedPostId: number
    
    if (typeof postId === 'number') {
      resolvedPostId = postId
    } else if (typeof postId === 'string' && /^\d+$/.test(postId)) {
      resolvedPostId = parseInt(postId, 10)
    } else {
       return NextResponse.json({ error: 'Invalid Post ID format' }, { status: 400 })
    }

    // Verify post exists
    try {
      const post = await payload.findByID({
        collection: 'posts',
        id: resolvedPostId,
      })

      if (!post) {
        console.error(`Post not found with ID: ${resolvedPostId}`)
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
    } catch (error) {
       console.error(`Error finding post with ID: ${resolvedPostId}`, error)
       return NextResponse.json({ error: 'Invalid Post ID' }, { status: 400 })
    }

    // Create comment
    const comment = await payload.create({
      collection: 'comments',
      data: {
        post: resolvedPostId,
        author: user.name || email.split('@')[0],
        authorEmail: email,
        content: content.substring(0, 1000), // Limit length
        approved: true, // Auto-approve for now
      },
    })

    return NextResponse.json({ success: true, comment })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}
