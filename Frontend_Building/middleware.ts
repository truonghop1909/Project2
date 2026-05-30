// middleware.ts (giữ nguyên như bạn đã viết, chỉ sửa publicRoutes)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register', '/buildings']; // thêm /buildings
const publicApiRoutes = ['/api/public', '/api/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  const isPublicApi = publicApiRoutes.some(route => pathname.startsWith(route));
  const isStatic = pathname.startsWith('/_next') || pathname.includes('.');

  if (isPublicRoute || isPublicApi || isStatic) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};