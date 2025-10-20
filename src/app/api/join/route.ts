import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

interface JoinFormData {
  selectedRole: string
  defining: string
  whyHere: string
  portfolioLink?: string
  name?: string
  email?: string
  phone?: string
  notInterested: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: JoinFormData = await request.json()

    // Validate required fields
    if (!body.selectedRole || !body.defining || !body.whyHere) {
      return NextResponse.json(
        { error: 'Missing required fields: selectedRole, defining, or whyHere' },
        { status: 400 }
      )
    }

    // Validate personal details if not opted out
    if (!body.notInterested) {
      if (!body.name || !body.email || !body.phone) {
        return NextResponse.json(
          { error: 'Personal details are required when not opted out' },
          { status: 400 }
        )
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }

      // Validate phone format (minimum 10 digits)
      const cleanPhone = body.phone.replace(/[\s\-\(\)]/g, '')
      if (cleanPhone.length < 10) {
        return NextResponse.json(
          { error: 'Phone number must be at least 10 digits' },
          { status: 400 }
        )
      }
    }

    // Get client info for metadata
    const userAgent = request.headers.get('user-agent') || ''
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || ''

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('join_applications')
      .insert({
        selected_role: body.selectedRole,
        defining_category: body.defining,
        why_here: body.whyHere,
        portfolio_link: body.portfolioLink || null,
        name: body.notInterested ? null : body.name,
        email: body.notInterested ? null : body.email,
        phone: body.notInterested ? null : body.phone,
        not_interested: body.notInterested,
        user_agent: userAgent,
        ip_address: ipAddress || null,
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save application' },
        { status: 500 }
      )
    }

    // Safely extract ID from response
    let applicationId = null
    if (data && Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'id' in data[0]) {
      applicationId = data[0].id
    } else if (data && typeof data === 'object' && 'id' in data) {
      applicationId = data.id
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        applicationId: applicationId
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}