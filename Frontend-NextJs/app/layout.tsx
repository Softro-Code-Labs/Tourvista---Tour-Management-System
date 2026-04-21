import { ClerkProvider } from '@clerk/nextjs';
import { ENV } from '@/lib/env';
import { ThemeProvider } from './providers';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider
          publishableKey={ENV.CLERK_PUBLISHABLE_KEY}
          signUpFallbackRedirectUrl={ENV.CLERK_FALLBACK_REDIRECT_URL}
          signInFallbackRedirectUrl={ENV.CLERK_FALLBACK_REDIRECT_URL}
          afterSignOutUrl={ENV.CLERK_FALLBACK_REDIRECT_URL}
        >
          <Toaster position="top-right" />
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
