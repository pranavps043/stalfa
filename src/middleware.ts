import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is not using HTTPS and is not moving to localhost
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https' &&
    !request.nextUrl.hostname.includes('localhost')
  ) {
    // Construct the new HTTPS URL
    const httpsUrl = `https://${request.headers.get('host')}${request.nextUrl.pathname}${request.nextUrl.search}`;
    
    // Redirect to the HTTPS URL
    return NextResponse.redirect(httpsUrl, 301);
  }

  // Continue to next middleware or route handler for other requests
  return NextResponse.next();
}

// Optionally, configure the matcher to apply the middleware to specific routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
