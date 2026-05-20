// D:\HocBai\LapTrinh\Building\Frontend_Building\middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes không cần đăng nhập
const publicRoutes = [
  '/',
  '/login',
  '/register',
];

// API public routes (không cần token)
const publicApiRoutes = [
  '/api/public',
  '/api/auth',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  
  // Kiểm tra nếu là API public
  const isPublicApi = publicApiRoutes.some(route => pathname.startsWith(route));
  
  // Kiểm tra nếu là public route
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // Cho phép public routes và public API
  if (isPublicRoute || isPublicApi) {
    return NextResponse.next();
  }
  
  // Cho phép static files (Next.js internal)
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Nếu không có token, redirect về login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};