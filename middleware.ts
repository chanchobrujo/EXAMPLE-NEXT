import {jwtVerify} from 'jose';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

import {name_cokie, secret} from './pages/api/auth/utils/GeneralUtils';

function redirectNext(path: string, request: NextRequest) {
  return NextResponse.redirect(new URL(path, request.url));
}

export async function middleware(request: NextRequest) {
  const enc = new TextEncoder();

  const token: string = request.cookies.get(name_cokie) || '';
  const valid: boolean = token == '';

  if (valid) return redirectNext('/login', request);

  try {
    await jwtVerify(token, enc.encode(secret));
    return NextResponse.next();
  } catch (error: any) {
    return redirectNext('/login', request);
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
};
