import ContactForm from '@/features/contact/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Need help planning your Sri Lankan adventure? Contact Tourvista for customized tour packages, travel advice, and 24/7 customer support. Get in touch via email or phone.',
  keywords: [
    'contact Tourvista Tours',
    'Sri Lanka travel planning',
    'customized tour packages Sri Lanka',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Tourvista | Let's Plan Your Next Adventure",
    description:
      'Get in touch with Tourvista Sri Lanka for any inquiries, feedback, or travel collaborations.',
    url: 'https://tourvistatours.com/contact',
    images: [
      {
        url: '/images/og-packages.png',
        width: 1200,
        height: 630,
        alt: 'Contact Tourvista Tours Sri Lanka',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Tourvista Sri Lanka',
    description: 'Plan your dream Sri Lankan vacation with our expert guides.',
    images: ['/images/og-packages.png'],
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
