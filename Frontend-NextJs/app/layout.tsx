import { ClerkProvider } from '@clerk/nextjs';
import { ENV } from '@/lib/env';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <ClerkProvider publishableKey={ENV.CLERK_PUBLISHABLE_KEY}>
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
