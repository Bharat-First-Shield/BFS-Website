
import type { Metadata } from 'next';
import { Exo_2, Space_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

const exo2 = Exo_2({
  variable: '--font-exo-2',
  subsets: ['latin'],
  display: 'swap',
  weights: ['400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Shield Master - Bharat-First-Shield',
  description: 'Comprehensive Cybersecurity Solutions: VAPT, SOC, and Digital Forensics by Bharat-First-Shield.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${exo2.variable} ${spaceMono.variable} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
