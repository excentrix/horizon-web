'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'

export async function joinWaitlist(prevState: any, formData: FormData) {
  const payload = await getPayload({ config: configPromise })

  const email = formData.get('email') as string
  const name = formData.get('name') as string
  const college = formData.get('college') as string
  const referralCode = formData.get('referralCode') as string // Code from URL or manual input

  if (!email) {
    return { error: 'Email is required' }
  }

  try {
    // Check if email already exists
    const existingUser = await payload.find({
      collection: 'waitlist',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existingUser.docs.length > 0) {
      const user = existingUser.docs[0]
      return {
        success: true,
        user: {
          name: user.name,
          email: user.email,
          referralCode: user.referralCode,
          referralCount: user.referralCount,
          tokens: user.tokens,
          completedTasks: user.completedTasks,
        },
        message: 'You are already on the list!',
      }
    }

    let referredBy = null

    // Fetch settings for token values
    const settings = await payload.findGlobal({
      slug: 'referral-settings',
    })
    const tokenValue = settings.tokenValuePerReferral || 10

    // Handle referral logic
    if (referralCode) {
      const referrer = await payload.find({
        collection: 'waitlist',
        where: {
          referralCode: {
            equals: referralCode,
          },
        },
      })

      if (referrer.docs.length > 0) {
        referredBy = referrer.docs[0].id
        
        // Increment referrer count and tokens
        await payload.update({
          collection: 'waitlist',
          id: referrer.docs[0].id,
          data: {
            referralCount: (referrer.docs[0].referralCount || 0) + 1,
            tokens: (referrer.docs[0].tokens || 0) + tokenValue,
          },
        })
      }
    }

    // Create new user
    const newUser = await payload.create({
      collection: 'waitlist',
      data: {
        email,
        name,
        college,
        referredBy: referredBy ? referredBy : undefined,
        tokens: 0,
      },
    })

    return {
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        referralCode: newUser.referralCode,
        referralCount: newUser.referralCount,
        tokens: newUser.tokens,
        completedTasks: newUser.completedTasks,
      },
    }
  } catch (error) {
    console.error('Error joining waitlist:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function completeTask(email: string, taskSlug: string) {
  const payload = await getPayload({ config: configPromise })

  try {
    const userQuery = await payload.find({
      collection: 'waitlist',
      where: { email: { equals: email } },
    })

    if (userQuery.docs.length === 0) return { error: 'User not found' }
    const user = userQuery.docs[0]

    // Check if task already completed
    if (user.completedTasks?.some((t: any) => t.taskSlug === taskSlug)) {
      return { error: 'Task already completed' }
    }

    // Get task reward value
    const settings = await payload.findGlobal({ slug: 'referral-settings' })
    const task = settings.tasks?.find((t: any) => t.slug === taskSlug)
    
    if (!task) return { error: 'Task not found' }

    const reward = task.rewardTokens || 0
    const bonusPercentage = settings.referralBonusPercentage || 10

    // Update user tokens and completed tasks
    await payload.update({
      collection: 'waitlist',
      id: user.id,
      data: {
        tokens: (user.tokens || 0) + reward,
        completedTasks: [
          ...(user.completedTasks || []),
          { taskSlug, completedAt: new Date().toISOString() },
        ],
      },
    })

    // Collaborative Bonus: Award referrer
    if (user.referredBy) {
      const referrerId = typeof user.referredBy === 'object' ? user.referredBy.id : user.referredBy
      const referrer = await payload.findByID({
        collection: 'waitlist',
        id: referrerId,
      })

      if (referrer) {
        const bonus = Math.floor(reward * (bonusPercentage / 100))
        if (bonus > 0) {
          await payload.update({
            collection: 'waitlist',
            id: referrerId,
            data: {
              tokens: (referrer.tokens || 0) + bonus,
            },
          })
        }
      }
    }

    return { success: true, tokens: (user.tokens || 0) + reward }
  } catch (error) {
    console.error('Error completing task:', error)
    return { error: 'Failed to complete task' }
  }
}

export async function getWaitlistStatus(email: string) {
  const payload = await getPayload({ config: configPromise })

  try {
    const existingUser = await payload.find({
      collection: 'waitlist',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existingUser.docs.length > 0) {
      const user = existingUser.docs[0]
      return {
        success: true,
        user: {
          name: user.name,
          email: user.email,
          referralCode: user.referralCode,
          referralCount: user.referralCount,
          tokens: user.tokens,
          completedTasks: user.completedTasks,
        },
      }
    }
    return { success: false, error: 'User not found' }
  } catch (error) {
    console.error('Error fetching waitlist status:', error)
    return { success: false, error: 'Failed to fetch status' }
  }
}

export async function getReferralSettings() {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({
    slug: 'referral-settings',
  })
  return settings
}
