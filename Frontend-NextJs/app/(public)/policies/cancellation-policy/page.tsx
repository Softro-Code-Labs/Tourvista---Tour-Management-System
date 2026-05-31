import { RefreshCcw, Clock, AlertCircle, HelpCircle, Send } from 'lucide-react';

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-100 dark:shadow-none">
        {/* HEADER SECTION */}
        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="p-3.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
            <RefreshCcw size={36} className="animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Refund Policy
            </h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Cancellation & Returns • Last Updated: May 2026
            </p>
          </div>
        </div>

        {/* INTRODUCTION */}
        <div className="text-slate-600 dark:text-slate-300 space-y-8 text-sm md:text-base leading-relaxed">
          <p className="text-base text-slate-700 dark:text-slate-200 font-medium">
            Welcome to Tourvista Tours. We aim to provide premium, seamless
            travel and tour experiences. Because our services require advance
            logistical preparations and vendor commitments, cancellations and
            refunds are governed strictly by the timelines outlined below.
          </p>

          {/* SECTION 1: PAYMENT STRUCTURES */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              1. Payment Structures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">
                  Advance Option
                </h4>
                <p className="text-sm">
                  A non-refundable 25% structural security deposit paid at the
                  time of reservation to secure slots.
                </p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">
                  Full Option
                </h4>
                <p className="text-sm">
                  Settle 100% of the calculated tour package fees immediately
                  during the checkout process.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: THE REFUND TABLE (CRITICAL FOR BANKS) */}
          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Clock size={20} className="text-blue-500" />
              2. Cancellation Timelines
            </h2>
            <p className="text-sm">
              Refund eligibility is calculated based on the notice period given
              before your arrival date:
            </p>

            <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <th className="p-4 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">
                      Timeline Notice
                    </th>
                    <th className="p-4 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">
                      Refund Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs md:text-sm">
                  <tr>
                    <td className="p-4 font-medium">30 Days or more notice</td>
                    <td className="p-4 text-emerald-600 font-bold">
                      100% of remaining balance
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">14 to 29 Days notice</td>
                    <td className="p-4 text-amber-600 font-bold">
                      50% of remaining balance
                    </td>
                  </tr>
                  <tr className="bg-rose-50/30 dark:bg-rose-950/10">
                    <td className="p-4 font-medium">
                      Less than 14 Days notice
                    </td>
                    <td className="p-4 text-rose-500 font-bold">
                      0% Refund eligible
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 italic font-medium px-2">
              * Note: The initial 25% deposit is excluded from all refund
              calculations as per our non-refundable policy.
            </p>
          </section>

          {/* SECTION 3: NON-REFUNDABLE SCENARIOS */}
          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <AlertCircle size={20} className="text-rose-500" />
              3. Non-Refundable Scenarios
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="shrink-0 w-1 bg-rose-500 rounded-full" />
                <div>
                  <strong className="text-slate-900 dark:text-white text-sm block">
                    Advance Deposits
                  </strong>
                  <p className="text-sm mt-1">
                    The 25% deposit is non-refundable as it secures local
                    operator commitments and tour slot lockouts.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-1 bg-rose-500 rounded-full" />
                <div>
                  <strong className="text-slate-900 dark:text-white text-sm block">
                    No-Shows
                  </strong>
                  <p className="text-sm mt-1">
                    Failure to arrive without prior electronic notification
                    results in a 100% forfeit of all accumulated funds.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-1 bg-blue-500 rounded-full" />
                <div>
                  <strong className="text-slate-900 dark:text-white text-sm block">
                    Force Majeure
                  </strong>
                  <p className="text-sm mt-1">
                    In extreme political or weather events, balances are
                    preserved as a 12-month Digital Tour Credit Voucher.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* SECTION 4: HOW TO INITIATE */}
          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Send size={20} className="text-blue-500" />
              4. Initiation Process
            </h2>
            <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800/60 space-y-4">
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-black">
                  01
                </span>
                <p className="text-sm">
                  Log into your dashboard, go to <strong>/reservations</strong>{' '}
                  and find your <strong>RES-XXXX</strong> Booking ID.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-black">
                  02
                </span>
                <p className="text-sm">
                  Submit a request via our Contact Form or email us at{' '}
                  <span className="text-blue-600 font-bold">
                    info@tourvistatours.com
                  </span>
                  .
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-black">
                  03
                </span>
                <p className="text-sm">
                  Approved refunds will be credited back via{' '}
                  <strong>PayHere</strong> to the original card used during
                  checkout.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5: TIMEFRAMES */}
          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <HelpCircle size={20} className="text-blue-500" />
              5. Settlement Timeframes
            </h2>
            <p className="text-sm leading-relaxed p-5 border-l-4 border-blue-500 bg-blue-50/30 dark:bg-blue-900/10">
              Approved refunds are processed on our end within{' '}
              <strong>3 business days</strong>. However, banking channels may
              take an additional <strong>5 to 10 working days</strong> to
              reflect the credit back into your account statement.
            </p>
          </section>

          {/* FOOTER NOTE */}
          <div className="pt-8 mt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Secure Refund Processing
            </p>
            <div className="flex justify-center gap-4 grayscale opacity-50">
              {/* You can add small visa/mastercard logos here if you have them */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
