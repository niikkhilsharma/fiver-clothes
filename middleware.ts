import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  console.log(pathname, "from middleware");

  // Early return if it's an API route
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale and also make sure it is not a api route
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        req.url,
      ),
    );
  }

  const isPublicRoute = i18n.locales.some(
    (locale) => pathname === `/${locale}`,
  );

  const locale = getLocale(req);
  if (!isPublicRoute && !req.auth) {
    return Response.redirect(new URL(`/${locale}`, req.nextUrl.origin));
  }
});

export const config = {
  matcher:
    "/((?!api/auth/*|auth|api/stripe/all-products|api/payment/webhook|assets/images|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/cloudinary/image-upload|^/$).+)",
};
