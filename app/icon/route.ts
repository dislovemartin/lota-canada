import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.redirect(new URL('/favicon.ico', 'https://lota-canada.vercel.app'));
}