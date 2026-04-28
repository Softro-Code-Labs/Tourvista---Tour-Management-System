'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const LINKS = {
  quick: [
    { name: 'Home', href: '/' },
    { name: 'Attractions', href: '/attractions' },
    { name: 'Culture', href: '/culture' },
    { name: 'Tours', href: '/tours' },
    { name: 'Contact', href: '/contact' },
  ],
  explore: ['Ella', 'Sigiriya', 'Kandy', 'Galle', 'Mirissa'],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Support', href: '/support' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t transition-colors duration-300 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* BRAND SECTION */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Tourvista<span className="text-blue-600"> Tours</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-[240px]">
              Discover the beauty of Sri Lanka through unforgettable travel
              experiences, curated tours, and island adventures.
            </p>
          </div>

          {/* QUICK LINKS */}
          <FooterColumn title="Quick Links">
            {LINKS.quick.map((link) => (
              <FooterLink key={link.name} href={link.href}>
                {link.name}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* EXPLORE SECTION */}
          <FooterColumn title="Explore Sri Lanka">
            {LINKS.explore.map((city) => (
              <li
                key={city}
                className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 group cursor-default"
              >
                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors" />
                {city}
              </li>
            ))}
          </FooterColumn>

          {/* CONTACT SECTION */}
          <FooterColumn title="Get in Touch">
            <ul className="space-y-3">
              <ContactItem
                icon={<Mail size={14} />}
                text="info@tourvistatours.com"
              />
              <ContactItem icon={<Phone size={14} />} text="+94 77 914 1298" />
              <ContactItem
                icon={<MapPin size={14} />}
                text="Galle, Sri Lanka"
              />
            </ul>
          </FooterColumn>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
            © {currentYear} Tourvista. Proudly crafted in Sri Lanka.
          </p>

          <div className="flex items-center gap-6">
            {LINKS.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-500 dark:hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-5">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {title}
      </h3>
      <ul className="flex flex-col space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1 group"
      >
        {children}
        <ExternalLink
          size={12}
          className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-blue-500"
        />
      </Link>
    </li>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
      <span className="p-1.5 rounded-md bg-slate-100 dark:bg-white/5 text-blue-600 dark:text-blue-400">
        {icon}
      </span>
      {text}
    </li>
  );
}
