import { DEFAULT_EMBED_ID, LOTA_LLM_EMBED_API_URL } from '@/lib/lota-llm-config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const embedId = searchParams.get('embedId') || DEFAULT_EMBED_ID;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const response = await fetch(`${LOTA_LLM_EMBED_API_URL}/${embedId}/${sessionId}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from LOTA-LLM server: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying request to LOTA-LLM server:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to LOTA-LLM server' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const embedId = searchParams.get('embedId') || DEFAULT_EMBED_ID;

    const body = await request.json();

    const response = await fetch(`${LOTA_LLM_EMBED_API_URL}/${embedId}/stream-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from LOTA-LLM server: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.text();
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error proxying request to LOTA-LLM server:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to LOTA-LLM server' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const embedId = searchParams.get('embedId') || DEFAULT_EMBED_ID;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const response = await fetch(`${LOTA_LLM_EMBED_API_URL}/${embedId}/${sessionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from LOTA-LLM server: ${response.statusText}` },
        { status: response.status }
      );
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Error proxying request to LOTA-LLM server:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to LOTA-LLM server' },
      { status: 500 }
    );
  }
} 