import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const cookies = cookieHeader
    ? Object.fromEntries(new URLSearchParams(cookieHeader.replace(/; /g, "&")))
    : {};
  const token = cookies.token;
  const path = request.nextUrl.pathname;
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, max-age=0');

  if (path === "/") {
    return token
      ? NextResponse.redirect(new URL("/Dashboard", request.url))
      : NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  if (path.startsWith("/Dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
