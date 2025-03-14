import { NextRequest, NextResponse } from 'next/server';

const MONAI_API_URL = process.env.MONAI_WORKFLOW_API_URL || process.env.NEXT_PUBLIC_MONAI_WORKFLOW_API_URL || 'http://localhost:5000';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ instanceId: string }> }
) {
    try {
        const { instanceId } = await params;

        const response = await fetch(`${MONAI_API_URL}/workflowinstances/${instanceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to get workflow instance: ${response.statusText}` },
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