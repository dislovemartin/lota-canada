import { NextRequest, NextResponse } from 'next/server';

const MONAI_API_URL = process.env.MONAI_WORKFLOW_API_URL || process.env.NEXT_PUBLIC_MONAI_WORKFLOW_API_URL || 'http://localhost:5000';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const response = await fetch(`${MONAI_API_URL}/workflows/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to get workflow: ${response.statusText}` },
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

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const response = await fetch(`${MONAI_API_URL}/workflows/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to update workflow: ${response.statusText}` },
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

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const response = await fetch(`${MONAI_API_URL}/workflows/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to delete workflow: ${response.statusText}` },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error proxying request to MONAI Workflow Manager:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to connect to MONAI Workflow Manager' },
            { status: 500 }
        );
    }
} 