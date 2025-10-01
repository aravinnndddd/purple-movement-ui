import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

interface FeedbackData {
  reaction?: string | null
  feedback?: string
  timestamp: string
  userAgent?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackData = await request.json()

    // Validate that at least one field is provided
    if (!body.reaction && !body.feedback?.trim()) {
      return NextResponse.json(
        { error: 'Either reaction or feedback is required' },
        { status: 400 }
      )
    }

    // Get client IP address
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown'

    // Prepare data for insertion
    const feedbackRecord = {
      reaction: body.reaction || null,
      feedback_text: body.feedback?.trim() || null,
      user_agent: body.userAgent || null,
      ip_address: clientIp,
      created_at: new Date().toISOString(),
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('feedback_submissions')
      .insert([feedbackRecord])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save feedback' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Feedback submitted successfully',
        id: data[0]?.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Feedback submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}