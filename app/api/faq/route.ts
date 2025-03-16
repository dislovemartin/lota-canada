import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { z } from 'zod';

// Define validation schema for FAQ items
const faqItemSchema = z.object({
  categoryId: z.number().optional(),
  question: z.string().min(5, 'Question must be at least 5 characters'),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
  isPublished: z.boolean().default(true),
});

// Get all FAQ items, optionally filtered by category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    let query = 'SELECT f.*, c.name as category_name FROM faq_items f LEFT JOIN faq_categories c ON f.category_id = c.id';
    const params: any[] = [];
    
    if (categoryId) {
      query += ' WHERE f.category_id = $1';
      params.push(parseInt(categoryId));
    }
    
    query += ' ORDER BY f.created_at DESC';
    
    const result = await executeQuery(query, params);
    
    return NextResponse.json({
      success: true,
      items: result.rows
    });
    
  } catch (error) {
    console.error('Error fetching FAQ items:', error);
    
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching FAQ items' },
      { status: 500 }
    );
  }
}

// Create a new FAQ item
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the request body
    const result = faqItemSchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { categoryId, question, answer, isPublished } = result.data;
    
    // Insert the FAQ item into the database
    const query = `
      INSERT INTO faq_items 
        (category_id, question, answer, is_published) 
      VALUES 
        ($1, $2, $3, $4) 
      RETURNING id
    `;
    
    const params = [categoryId || null, question, answer, isPublished];
    
    const dbResult = await executeQuery(query, params);
    
    // Return success response with the created item ID
    return NextResponse.json({
      success: true,
      message: 'FAQ item created successfully',
      itemId: dbResult.rows[0].id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating FAQ item:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'An error occurred while creating the FAQ item' },
      { status: 500 }
    );
  }
}
