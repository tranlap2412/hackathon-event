import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "vi"]; // hoặc thêm ["es", "fr", "zh"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Loại bỏ tiền tố ngôn ngữ cho file tĩnh
  if (
    pathname.match(
      /^\/(en|es|fr|vi|zh)\/(marketing|videos|images|.well-known|manifest.json|devtools.json)/
    )
  ) {
    const cleanPath = pathname.replace(/^\/(en|es|fr|vi|zh)/, "");
    return NextResponse.rewrite(new URL(cleanPath, request.url));
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect nếu không có locale cho route động
  const locale = getRequestLocale(request.headers, locales);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

function getRequestLocale(requestHeaders: Headers, locales: string[]): string {
  const langHeader = requestHeaders.get("accept-language") || "";
  const languages = new Negotiator({
    headers: { "accept-language": langHeader },
  }).languages(locales);

  return languages[0] || "en";
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|json)$|manifest.json|.well-known/.*).*)",
  ],
};
