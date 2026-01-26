import { LayoutDashboard } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to access your AENZBi dashboard</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <a
            href="/api/login"
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold transition shadow-lg shadow-emerald-500/25"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            Continue with Replit
          </a>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800/50 text-slate-500">Secure authentication</span>
            </div>
          </div>

          <div className="text-center text-slate-400 text-sm">
            <p className="mb-4">Sign in with your Replit account using:</p>
            <div className="flex justify-center gap-4 text-slate-500">
              <span>Google</span>
              <span>GitHub</span>
              <span>Email</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-slate-500">
            Don't have an account?{" "}
            <a href="/get-started" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Get Started Free
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
