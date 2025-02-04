import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { Comfortaa } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Try On Clothes Virtually with AI | GetPolara.ai",
  description:
    "Upload your image and see yourself wearing any outfit with AI! GetPolara.ai lets you visualize how clothes look on you before buying. Try it now!",
  keywords:
    "AI clothing try-on, virtual dressing room, try clothes online, virtual wardrobe, AI outfit generator, try on outfits, AI fashion app",
  authors: [{ name: "GetPolara.ai" }],
  openGraph: {
    title: "Try On Clothes Virtually with AI | GetPolara.ai",
    description:
      "Upload your image and see yourself wearing any outfit with AI! GetPolara.ai lets you visualize how clothes look on you before buying. Try it now!",
    url: "https://getpolara.ai/",
    type: "website",
    images: [
      {
        url: "https://getpolara.ai/assets/logo.jpg",
        alt: "GetPolara AI preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Try On Clothes Virtually with AI | GetPolara.ai",
    description:
      "Upload your image and see yourself wearing any outfit with AI! GetPolara.ai lets you visualize how clothes look on you before buying. Try it now!",
    images: ["https://getpolara.ai/assets/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${comfortaa.variable} ${comfortaa.className} relative bg-gray-50 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem]"></div>
        <div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
