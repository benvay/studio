import type { Metadata } from 'next';
import { EB_Garamond, Cinzel } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hogwarts House Sorter',
  description: 'Discover your true Hogwarts house!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.variable} ${cinzel.variable} antialiased text-foreground bg-background`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
