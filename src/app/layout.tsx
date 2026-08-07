import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "J Creative Division | Event Documentation & Media Production",
  description: "J Creative Division spesialis dokumentasi event profesional, liputan konser, corporate gathering, konferensi, dan video aftermovie sinematik.",
  keywords: ["Dokumentasi Event", "J Creative Division", "Event Documentation", "Video Aftermovie", "Liputan Konser", "Corporate Event Coverage", "Dokumentasi Gathering"],
  openGraph: {
    title: "J Creative Division | Event Documentation Studio",
    description: "Dokumentasi Event Profesional, Live Highlights & Video Recap Sinematik",
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
