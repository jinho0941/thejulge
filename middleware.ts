import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
  const isLoggedIn = request.cookies.has('accessToken')
  if (!isLoggedIn)
    return NextResponse.redirect(new URL('/sign-in', request.url))
  return NextResponse.next()
}

export const config = {
  matcher: ['/my-shop', '/my-shop/:path*'],
}
