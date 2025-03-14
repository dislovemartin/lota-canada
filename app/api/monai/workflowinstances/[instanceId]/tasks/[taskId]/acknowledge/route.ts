import { NextRequest, NextResponse } from 'next/server';

const MONAI_API_URL = process.env.MONAI_WORKFLOW_API_URL || process.env.NEXT_PUBLIC_MONAI_WORKFLOW_API_URL || 'http://localhost:5000';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ instanceId: string; taskId: string }> }
) {
    try {
        const { instanceId, taskId } = await params;

        const response = await fetch(
            `${MONAI_API_URL}/workflowinstances/${instanceId}/tasks/${taskId}/acknowledge`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to acknowledge failed task: ${response.statusText}` },
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