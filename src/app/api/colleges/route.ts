import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
  const payload = await getPayload({ config: configPromise })

  try {
    const colleges = await payload.find({
      collection: 'colleges',
      limit: 1000,
      sort: 'name',
    })

    return NextResponse.json(colleges, { status: 200 })
  } catch (err) {
    console.error('Error fetching colleges:', err)
    return NextResponse.json({ message: 'Error fetching colleges' }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  const payload = await getPayload({ config: configPromise })
  const { name } = await req.json()

  if (!name || !name.trim()) {
    return NextResponse.json({ message: 'College name is required' }, { status: 400 })
  }

  try {
    // Check if college already exists
    const existing = await payload.find({
      collection: 'colleges',
      where: {
        name: {
          equals: name.trim(),
        },
      },
    })

    if (existing.docs.length > 0) {
      return NextResponse.json(
        { message: 'College already exists', college: existing.docs[0] },
        { status: 200 },
      )
    }

    // Create new college
    const newCollege = await payload.create({
      collection: 'colleges',
      data: {
        name: name.trim(),
      },
    })

    return NextResponse.json(
      { message: 'College added successfully', college: newCollege },
      { status: 201 },
    )
  } catch (err) {
    console.error('Error adding college:', err)
    return NextResponse.json({ message: 'Error adding college' }, { status: 500 })
  }
}
