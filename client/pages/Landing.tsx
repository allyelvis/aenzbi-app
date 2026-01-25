import { LayoutDashboard, Users, Package, TrendingUp, Shield, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AENZBi</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
              <a
                href="/api/login"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Enterprise Resource Planning
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Made Simple
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Streamline your business operations with AENZBi ERP. Manage sales, inventory, 
            customers, and finances all in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/api/login"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-lg shadow-emerald-500/25"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition border border-slate-700"
            >
              Learn More
            </a>
          </div>
          <p className="text-slate-500 mt-6">Free forever plan available. No credit card required.</p>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need to Run Your Business
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Customer Management", desc: "Track customers, segments, and relationships with powerful CRM tools." },
              { icon: Package, title: "Inventory Control", desc: "Real-time stock tracking, reorder alerts, and warehouse management." },
              { icon: TrendingUp, title: "Sales & Orders", desc: "Process orders, generate invoices, and track revenue effortlessly." },
              { icon: LayoutDashboard, title: "Analytics Dashboard", desc: "Visualize your business performance with interactive charts." },
              { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security with role-based access control." },
              { icon: Zap, title: "Fast & Efficient", desc: "Built for speed with modern technology stack." },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-2xl p-6 transition group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">Start free and scale as you grow</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Free", price: "$0", features: ["5 customers", "10 products", "Basic dashboard", "Email support"] },
              { name: "Starter", price: "$29", features: ["50 customers", "100 products", "Full dashboard", "Priority support", "Reports"], popular: false },
              { name: "Professional", price: "$79", features: ["Unlimited customers", "Unlimited products", "Advanced analytics", "API access", "Custom integrations"], popular: true },
              { name: "Enterprise", price: "$199", features: ["Everything in Pro", "Dedicated support", "Custom development", "SLA guarantee"] },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative bg-slate-800 border rounded-2xl p-6 ${
                  plan.popular ? "border-emerald-500 shadow-lg shadow-emerald-500/10" : "border-slate-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/api/login"
                  className={`block text-center py-2 rounded-lg font-medium transition ${
                    plan.popular
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-500">
          <p>&copy; 2026 AENZBi ERP System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
