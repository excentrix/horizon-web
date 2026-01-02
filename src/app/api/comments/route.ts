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
    
    const comments = await payload.find({
      collection: 'comments',
      where: {
        post: { equals: postId },
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

    // Create comment
    const comment = await payload.create({
      collection: 'comments',
      data: {
        post: postId,
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
