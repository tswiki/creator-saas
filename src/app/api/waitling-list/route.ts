

// app/api/waiting-list/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod' // Note: You'll need to install zod

// Schema for validating request body
const waitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  referralSource: z.string().optional()
})

// Types based on the schema
type WaitlistEntry = z.infer<typeof waitlistSchema>

export async function POST(request: Request) {
  try {
    // Parse the request body
    const json = await request.json()
    
    // Validate the request body against our schema
    const body = waitlistSchema.parse(json)
    
    // Here you would typically:
    // 1. Check if email already exists
    // 2. Save to your database
    // 3. Send confirmation email
    // For example with Prisma:
    /*
    const entry = await prisma.waitlist.create({
      data: {
        email: body.email,
        name: body.name,
        referralSource: body.referralSource,
      },
    })
    */
    
    // For now, we'll just return a success response
    return NextResponse.json(
      { 
        message: 'Successfully joined waitlist',
        data: body 
      }, 
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Invalid request data', 
          errors: error.errors 
        }, 
        { status: 400 }
      )
    }

    // Log the error internally
    console.error('Waitlist API Error:', error)
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: Implement GET to check waitlist status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json(
      { message: 'Email parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Here you would typically:
    // 1. Query your database for the email
    // 2. Return the status/position
    /*
    const entry = await prisma.waitlist.findUnique({
      where: { email }
    })
    */

    return NextResponse.json({
      message: 'Waitlist status retrieved',
      // data: entry
    })
  } catch (error) {
    console.error('Waitlist Status Error:', error)
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}