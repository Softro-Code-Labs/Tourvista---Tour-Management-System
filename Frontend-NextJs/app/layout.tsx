import './globals.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        {/* Toast System (GLOBAL) */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0b1220',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#0b1220',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#0b1220',
              },
            },
          }}
        />

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
