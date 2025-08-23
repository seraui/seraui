import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle MD file requests at /docs/ path
  if (request.nextUrl.pathname.startsWith('/docs/') && request.nextUrl.pathname.endsWith('.md')) {
    const response = NextResponse.next();
    
    // Set proper content-type for MD files
    response.headers.set('Content-Type', 'text/markdown; charset=utf-8');
    response.headers.set('Cache-Control', 'public, max-age=3600, immutable');
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/docs/:path*.md'
  ]
};