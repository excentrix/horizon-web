import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { Waitlist } from '../../../payload-types'

export const POST = async (req: NextRequest) => {
  const payload = await getPayload({ config: configPromise })
  const { email, name, referrer } = await req.json()

  try {
    // Check if email already exists
    const existing = await payload.find({
      collection: 'waitlist',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existing.docs.length > 0) {
      const doc = existing.docs[0] as unknown as Waitlist
      return NextResponse.json(
        { message: 'Email already registered', referralCode: doc.referralCode },
        { status: 200 },
      )
    }

    // Handle referral
    let referredBy = null
    if (referrer) {
      const referrerDoc = await payload.find({
        collection: 'waitlist',
        where: {
          referralCode: {
            equals: referrer,
          },
        },
      })

      if (referrerDoc.docs.length > 0) {
        referredBy = referrerDoc.docs[0].id
        // Increment referral count for the referrer
        await payload.update({
          collection: 'waitlist',
          id: referrerDoc.docs[0].id,
          data: {
            referralCount: ((referrerDoc.docs[0] as unknown as Waitlist).referralCount || 0) + 1,
          },
        })
      }
    }

    // Generate referral code
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase()

    // Create new waitlist entry
    console.log('Creating waitlist entry for:', email)
    const newEntry = await payload.create({
      collection: 'waitlist',
      data: {
        email,
        name,
        referredBy,
        referralCode,
      },
    }) as unknown as Waitlist
    console.log('Created entry:', newEntry)

    return NextResponse.json(
      { message: 'Successfully joined waitlist', referralCode: newEntry.referralCode },
      { status: 201 },
    )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Error joining waitlist:', err)
    return NextResponse.json({ message: 'Error joining waitlist' }, { status: 500 })
  }
}
