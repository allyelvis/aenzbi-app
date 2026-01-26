import { LayoutDashboard, Check } from "lucide-react";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Get Started Free</h1>
          <p className="text-slate-400">Create your account and start managing your business today</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">What you'll get with Free plan:</h3>
            <ul className="space-y-3">
              {[
                "Manage up to 5 customers",
                "Track up to 10 products",
                "Basic dashboard analytics",
                "Point of Sale system",
                "Sales order management",
                "Email support",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="/api/login"
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-4 px-4 rounded-xl font-semibold text-lg transition shadow-lg shadow-emerald-500/25"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            Create Free Account
          </a>

          <p className="text-center text-slate-500 text-sm mt-4">
            No credit card required. Upgrade anytime.
          </p>
        </div>

        <div className="text-center mt-6">
          <p className="text-slate-500">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Sign In
            </a>
          </p>
        </div>

        <div className="text-center mt-4">
          <a href="/" className="text-slate-500 hover:text-slate-400 text-sm">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
