import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import { CLIENT_ENV } from '@/config/env.client';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
