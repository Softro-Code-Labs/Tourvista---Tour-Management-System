import { Shield, Lock, Eye, RefreshCw, Cookie, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-100 dark:shadow-none">
        {/* HEADER SECTION */}
        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="p-3.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Shield size={36} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Last Updated: May 2026
            </p>
          </div>
        </div>

        {/* INTRODUCTION */}
        <div className="text-slate-600 dark:text-slate-300 space-y-8 text-sm md:text-base leading-relaxed">
          <p className="text-base text-slate-700 dark:text-slate-200 font-medium bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            We respect your privacy and are committed to protecting the personal
            data you share with us. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            website, create an account, or book a tour reservation. By using our
            platform, you consent to the data practices described in this
            policy.
          </p>

          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Eye size={20} className="text-blue-500" />
              1. Information We Collect
            </h2>
            <p>
              We collect information that identifies, relates to, or could
              reasonably be linked to you. This includes:
            </p>
            <ul className="list-none pl-0 space-y-3 mt-3">
              <li className="flex gap-3 bg-slate-50/50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-0.5">
                    Account & Identity Data
                  </strong>
                  First name, last name, email address, and profile details
                  provided securely via our authentication provider,{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Clerk
                  </span>
                  .
                </div>
              </li>
              <li className="flex gap-3 bg-slate-50/50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-0.5">
                    Booking Details
                  </strong>
                  Check-in/arrival dates, traveler counts, destination
                  preferences, custom trip notes, tour reviews, and scheduling
                  details.
                </div>
              </li>
              <li className="flex gap-3 bg-slate-50/50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-0.5">
                    Transaction Metadata
                  </strong>
                  When you initiate payments, we store your dynamic tracking
                  IDs, payment methods used (PayHere), billing indicators, and
                  raw transaction statuses.{' '}
                  <span className="font-semibold text-rose-500">
                    We do not collect or store credit/debit card numbers on our
                    servers.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <UserCheck size={20} className="text-blue-500" />
              2. How We Use Your Information
            </h2>
            <p>
              We utilize the collected information strictly for business
              operational integrity:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {[
                'To authenticate user accounts and manage active traveler profile contexts.',
                'To process, modify, and display your tour itineraries inside your /reservations dashboard.',
                'To coordinate securely with our financial payment processors to verify successful transactions.',
                'To communicate essential updates, service adjustments, or customer support responses regarding your bookings.',
              ].map((text, idx) => (
                <li
                  key={idx}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-slate-800/60 text-sm"
                >
                  {text}
                </li>
              ))}
            </ul>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Lock size={20} className="text-blue-500" />
              3. Data Protection & Secure Third-Party Services
            </h2>
            <p>
              We partner with industry-leading, compliant platforms to process
              your data safely:
            </p>
            <div className="space-y-3 mt-2">
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                  User Authentication (Clerk)
                </span>
                Your login credentials, multi-factor settings, and identity
                assertions are managed safely by Clerk's secure infrastructure.
              </div>
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                  Payment Gateways (PayHere)
                </span>
                All credit card numbers, CVVs, and secure bank processing
                protocols take place entirely inside PayHere’s encrypted
                iframe/hosted modal windows. Our platform only receives an
                encrypted tracking string token and a success/failure status
                code webhook response.
              </div>
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                  Data Storage
                </span>
                Your platform application records are securely housed in an
                encrypted PostgreSQL database. All internal data transitions are
                secured using standard SSL/HTTPS protocols.
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Cookie size={20} className="text-blue-500" />
              4. Cookies and Session Management
            </h2>
            <p>
              We use standard local browser storage tokens and essential cookies
              to maintain secure user login states, remember booking form inputs
              while you customize packages, and optimize page performance. You
              can choose to disable cookies through your browser settings,
              though doing so may prevent you from logging in or retaining
              active reservation items.
            </p>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Shield size={20} className="text-blue-500" />
              5. Data Retention & Your Rights
            </h2>
            <p>
              We retain your account profile and booking logs for as long as
              your account remains active or as required to fulfill legal tax
              and accounting requirements. You retain full rights to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>
                Access, update, or correct your personal information directly
                through your dashboard profile settings.
              </li>
              <li>
                Request the absolute deletion of your personal account records
                and reservation logs by dropping an electronic query to our data
                support queue.
              </li>
            </ul>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <RefreshCw size={20} className="text-blue-500" />
              6. Updates to This Policy
            </h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time to
              align with changing digital regulations or structural upgrades.
              The "Last Updated" date at the bottom of this page will reflect
              the latest version timeline.
            </p>
          </section>

          {/* FOOTER SUPPORT NOTE */}
          <div className="pt-8 mt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            For data inquiries or privacy-related questions, contact us at{' '}
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
