import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/signup") {
    return;
  }

  if (request.cookies.has("token") && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(
      new URL("/gastos-mensuales", request.nextUrl).toString()
    );
  }

  if (!request.cookies.has("token") && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.nextUrl).toString());
  }
}
