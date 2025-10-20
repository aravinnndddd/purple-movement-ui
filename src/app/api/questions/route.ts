import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

interface QuestionData {
  question: string
  timestamp: string
  userAgent?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: QuestionData = await request.json()

    // Validate required fields
    if (!body.question?.trim()) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    // Get client IP address
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown'

    // Prepare data for insertion
    const questionRecord = {
      question_text: body.question.trim(),
      user_agent: body.userAgent || null,
      ip_address: clientIp,
      created_at: new Date().toISOString(),
      status: 'pending'
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('contact_questions')
      .insert([questionRecord])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save question' },
        { status: 500 }
      )
    }

    // Safely extract ID from response
    let questionId = null
    if (data && Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'id' in data[0]) {
      questionId = data[0].id
    } else if (data && typeof data === 'object' && 'id' in data) {
      questionId = data.id
    }

    return NextResponse.json(
      { 
        message: 'Question submitted successfully',
        id: questionId
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Question submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}