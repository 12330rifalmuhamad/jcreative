import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "J Creative Division | Premier Film & Production House",
  description: "J Creative Division is an elite production house specializing in high-end commercial films, music videos, brand documentaries, and 8K visual storytelling.",
  keywords: ["Production House", "J Creative Division", "Commercial Film", "Music Video", "Cinematography", "Jakarta Production House", "Video Production"],
  openGraph: {
    title: "J Creative Division | Production House",
    description: "Crafting Cinematic Masterpieces & High-Impact Visual Stories",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
