import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from './providers';
import { CLIENT_ENV } from '@/config/env.client';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const SITE_URL = 'https://tourvistatours.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tourvista Tours | Sri Lanka Tour Packages & Travel Guide',
    template: '%s | Tourvista Tours',
  },
  description:
    'Book unforgettable Sri Lanka tours with Tourvista. Curated tour packages, cultural experiences, top attractions, and expert local guides for every traveler.',
  keywords: [
    'Sri Lanka tours',
    'Sri Lanka tour packages',
    'Sri Lanka travel',
    'Sri Lanka holiday packages',
    'best Sri Lanka tours',
  ],
  authors: [{ name: 'Tourvista Tours' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: 'Tourvista Tours',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('font-sans', geist.variable)}
    >
      <body>
        <ClerkProvider
          publishableKey={CLIENT_ENV.CLERK_PUBLISHABLE_KEY}
          signUpFallbackRedirectUrl={CLIENT_ENV.CLERK_FALLBACK_REDIRECT_URL}
          signInFallbackRedirectUrl={CLIENT_ENV.CLERK_FALLBACK_REDIRECT_URL}
          afterSignOutUrl={CLIENT_ENV.CLERK_FALLBACK_REDIRECT_URL}
        >
          <Providers>
            {children}

            <Script
              src="https://www.payhere.lk/lib/payhere.js"
              strategy="lazyOnload"
            />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
