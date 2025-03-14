import { NextRequest, NextResponse } from 'next/server';

const MONAI_API_URL = process.env.MONAI_WORKFLOW_API_URL || process.env.NEXT_PUBLIC_MONAI_WORKFLOW_API_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pageNumber = searchParams.get('pageNumber') || '1';
        const pageSize = searchParams.get('pageSize') || '10';

        const response = await fetch(
            `${MONAI_API_URL}/workflows?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to get workflows: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error proxying request to MONAI Workflow Manager:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to connect to MONAI Workflow Manager' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${MONAI_API_URL}/workflows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to create workflow: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error proxying request to MONAI Workflow Manager:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to connect to MONAI Workflow Manager' },
            { status: 500 }
        );
    }
} 