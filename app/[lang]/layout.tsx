import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { i18n, Locale } from "@/i18n.config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <main className="absolute top-0 w-full">
      <ThemeContextProvider>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </ThemeContextProvider>
    </main>
  );
}
