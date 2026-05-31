import {
  FileText,
  UserCheck,
  DollarSign,
  CreditCard,
  AlertTriangle,
  Scale,
} from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-100 dark:shadow-none">
        {/* HEADER SECTION */}
        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="p-3.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
            <FileText size={36} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Last Updated: May 2026
            </p>
          </div>
        </div>

        {/* INTRODUCTION */}
        <div className="text-slate-600 dark:text-slate-300 space-y-8 text-sm md:text-base leading-relaxed">
          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Scale size={20} className="text-blue-500" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing this website, registering an account via{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Clerk
              </span>
              , or initializing a tour booking, you agree to be bound by these
              Terms and Conditions, all applicable local laws, and regulations.
              If you do not agree with any of these terms, you are prohibited
              from using or accessing this site.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <UserCheck size={20} className="text-blue-500" />
              2. User Accounts & Security
            </h2>
            <p>
              You must provide accurate, current, and complete information
              during the booking process. Account identity monitoring and
              authentication are securely managed via Clerk. You are entirely
              responsible for maintaining the confidentiality of your session
              tokens and actions performed under your account profile.
            </p>
            <p className="bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 p-4 border border-amber-100 dark:border-amber-900/40 rounded-xl text-xs font-medium">
              ⚠️ We reserve the absolute right to suspend, terminate, or
              restrict user access profiles if fraud, malicious script
              execution, or breach of these terms is suspected.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <DollarSign size={20} className="text-blue-500" />
              3. Booking and Pricing Regulations
            </h2>
            <p>
              All prices displayed across our tour packages are subject to
              change without prior notice based on seasonal adjustments,
              supplier inflation, or currency variations.
            </p>
            <p>
              A booking is <strong>not legally confirmed</strong> until a
              successful transaction status webhook is dispatched from our
              integrated payment gateway (
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                PayHere
              </span>
              ) and your reservation status flag shifts to either{' '}
              <code className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                ACTIVE
              </code>{' '}
              (for partial payments) or{' '}
              <code className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                CONFIRMED
              </code>{' '}
              (for full payments).
            </p>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <CreditCard size={20} className="text-blue-500" />
              4. Payment Terms & Gateway Processing
            </h2>
            <p>
              We provide interfaces to process payments securely via{' '}
              <strong>PayHere</strong>. When selecting the{' '}
              <strong>Advance Payment</strong> option, you explicitly
              acknowledge that you are locking in a promotional or scheduled
              slot by completing a non-refundable 25% deposit.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800/60">
              The remaining 75% outstanding balance must be fully settled via
              your dashboard (
              <code className="text-xs font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                /reservations
              </code>
              ) no later than <strong>14 days prior</strong> to the check-in
              arrival date. Failure to settle the outstanding balance within
              this timeline will grant management the right to automatically
              cancel the reservation and forfeit the deposit.
            </div>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <AlertTriangle size={20} className="text-blue-500" />
              5. Limitation of Liability
            </h2>
            <p>
              Our platform operates as a luxury tour aggregation and
              coordination system. While we partner exclusively with verified
              local service providers, accommodations, and transport operators,
              we are not directly liable for any personal injury, loss of
              luggage, property damage, itinerary delays, or unexpected trip
              interruptions caused directly by third-party suppliers.
            </p>
            <p>
              Under no circumstances shall our platform or its developers be
              held liable for any digital transaction failures, bank network
              timeouts, or processing errors caused externally by the PayHere
              payment networks or your card-issuing bank.
            </p>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <FileText size={20} className="text-blue-500" />
              6. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the local e-commerce laws and consumer protection
              frameworks of Sri Lanka, and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          {/* FOOTER SUPPORT NOTE */}
          <div className="pt-8 mt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            Have questions about our terms? Get in touch at{' '}
            <a
              href="mailto:info@tourvistatours.com"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              info@tourvistatours.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
