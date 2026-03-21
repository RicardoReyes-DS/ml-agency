import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, getLocaleFromPathname, stripLocaleFromPathname } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const locale = getLocaleFromPathname(pathname);
  const hasLocalePrefix = pathname.startsWith("/es") || pathname.startsWith("/en");

  if (!hasLocalePrefix) {
    const target = stripLocaleFromPathname(pathname);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = target === "/" ? `/${defaultLocale}` : `/${defaultLocale}${target}`;
    redirectUrl.search = search;
    return NextResponse.redirect(redirectUrl);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
