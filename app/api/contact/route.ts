import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { z } from 'zod';

// Define validation schema for contact form
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiryType: z.string().min(1, 'Inquiry type is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the request body
    const result = contactFormSchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { firstName, lastName, email, phone, organization, message, inquiryType } = result.data;
    
    // Insert the contact submission into the database
    const query = `
      INSERT INTO contact_submissions 
        (first_name, last_name, email, phone, organization, message, inquiry_type) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id
    `;
    
    const params = [firstName, lastName, email, phone || null, organization || null, message, inquiryType];
    
    const dbResult = await executeQuery(query, params);
    
    // Return success response with the created submission ID
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      submissionId: dbResult.rows[0].id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'An error occurred while submitting the form' },
      { status: 500 }
    );
  }
}

// Get all contact submissions
export async function GET() {
  try {
    const query = 'SELECT * FROM contact_submissions ORDER BY created_at DESC';
    const result = await executeQuery(query);
    
    return NextResponse.json({
      success: true,
      submissions: result.rows
    });
    
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching submissions' },
      { status: 500 }
    );
  }
}
