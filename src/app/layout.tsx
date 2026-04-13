import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DKA-Consulting | Cabinet Foncier & Immobilier au Togo",
  description: "DKA-Consulting Sarl - Votre partenaire de confiance pour la création, mutation et morcellement de titres fonciers au Togo. Conseil juridique et accompagnement immobilier à Lomé.",
  keywords: "titre foncier, immobilier, Togo, Lomé, mutation, morcellement, conseil juridique, DKA-Consulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
