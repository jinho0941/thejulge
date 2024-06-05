import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/profile', '/settings']
const authRoutes = ['/sign-in', '/sign-up']

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  const isLoggedIn = request.cookies.has('accessToken')
  const isProtectedRoute = protectedRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
