import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  // Your custom middleware logic goes here

  // console.log(req.auth, "auth");
  // console.log(req.nextUrl.pathname, "pathname");
  // console.log(req.nextUrl, "origin");
  if (!req.auth) {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }
});

export const config = {
  matcher:
    "/((?!api/auth/*|auth|api/stripe/all-products|api/payment/webhook|assets/images|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/cloudinary/image-upload|^/$).+)",
};
