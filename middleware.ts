import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
});

export const config = {
  matcher:
    "/((?!api/auth/[^/]+$|auth|api/auth|images|_next/static|_next/image*|contact|favicon.ico|^/$|api/payment/record-payment).+)/",
};
