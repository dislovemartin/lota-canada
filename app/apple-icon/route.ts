import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.redirect(new URL('/images/brand/lota logo 2x2 transparent background.png', 'https://lota-canada.vercel.app'));
}