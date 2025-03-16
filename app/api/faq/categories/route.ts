import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { z } from 'zod';

// Define validation schema for FAQ categories
const faqCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().optional(),
});

// Get all FAQ categories
export async function GET() {
  try {
    const query = 'SELECT * FROM faq_categories ORDER BY name ASC';
    const result = await executeQuery(query);
    
    return NextResponse.json({
      success: true,
      categories: result.rows
    });
    
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
    
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching FAQ categories' },
      { status: 500 }
    );
  }
}

// Create a new FAQ category
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the request body
    const result = faqCategorySchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { name, description } = result.data;
    
    // Insert the FAQ category into the database
    const query = `
      INSERT INTO faq_categories 
        (name, description) 
      VALUES 
        ($1, $2) 
      RETURNING id
    `;
    
    const params = [name, description || null];
    
    const dbResult = await executeQuery(query, params);
    
    // Return success response with the created category ID
    return NextResponse.json({
      success: true,
      message: 'FAQ category created successfully',
      categoryId: dbResult.rows[0].id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating FAQ category:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'An error occurred while creating the FAQ category' },
      { status: 500 }
    );
  }
}
