import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are considered public or admin
  const isAdminRoute = path.startsWith('/admin');
  const isLoginRoute = path === '/admin/login';

  // Get the token from cookies
  const token = request.cookies.get('admin_auth_token')?.value;

  if (isAdminRoute && !isLoginRoute) {
    if (!token) {
      // Redirect to login if accessing an admin route without a token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isLoginRoute && token) {
    // Redirect to dashboard if trying to access login while already authenticated
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
