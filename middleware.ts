// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/table/:path*'],
}
 
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  // Call our authentication function to check the request
  if(!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}
