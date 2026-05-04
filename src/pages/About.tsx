import { useState, useEffect } from 'react';
import { Users, Target, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardApi } from '../lib/api';

const valuesData = [
  {
    title: 'Simplicity First',
    icon: Target,
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    description: "We believe that powerful software shouldn't require a manual. We design for clarity, ease of use, and speed.",
  },
  {
    title: 'Customer Obsession',
    icon: Users,
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    description: 'Your success is our success. Every feature we build is driven by the real needs of our amazing users.',
  },
  {
    title: 'Built for Scale',
    icon: Globe,
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
    description: "Whether you're a team of two or two thousand, our infrastructure is designed to grow flawlessly alongside you.",
  },
];

// ─── Dynamic stat cards (fetched from /dashboard) ────────────────────────────

interface StatCard {
  value: string;
  label: string;
  bg: string;
  border: string;
  text: string;
  offsetY: string;
}

const defaultStats: StatCard[] = [
  { value: '5,000+', label: 'Active Businesses', bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', offsetY: '' },
  { value: '$2B+', label: 'Invoices Processed', bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', offsetY: 'translate-y-8' },
  { value: '99.9%', label: 'Uptime Guarantee', bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', offsetY: '' },
  { value: '24/7', label: 'Customer Support', bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', offsetY: 'translate-y-8' },
];

function StatsGrid() {
  const [stats, setStats] = useState<StatCard[]>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to fetch real revenue + customer data from dashboard
    // The dashboard route is protected, so this will only succeed if user is logged in
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    dashboardApi.getStats()
      .then((res) => {
        const dashStats = res.data.stats;
        const revenue = dashStats.find(s => s.title === 'Net Revenue');
        const customers = dashStats.find(s => s.title === 'Total Customers');

        setStats([
          {
            value: customers ? customers.value : '5,000+',
            label: 'Active Customers',
            bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', offsetY: '',
          },
          {
            value: revenue ? revenue.value : '$2B+',
            label: 'Revenue Processed',
            bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', offsetY: 'translate-y-8',
          },
          {
            value: '99.9%',
            label: 'Uptime Guarantee',
            bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', offsetY: '',
          },
          {
            value: '24/7',
            label: 'Customer Support',
            bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', offsetY: 'translate-y-8',
          },
        ]);
      })
      .catch(() => {
        // Silently fall back to default stats if not logged in or API fails
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      {isLoading
        ? defaultStats.map((_, i) => (
            <div key={i} className={`p-8 bg-slate-100 rounded-2xl border border-slate-200 ${_.offsetY} animate-pulse`}>
              <div className="h-10 bg-slate-200 rounded-lg w-3/4 mb-2" />
              <div className="h-4 bg-slate-200 rounded w-full" />
            </div>
          ))
        : stats.map((stat, index) => (
            <div
              key={index}
              className={`p-8 ${stat.bg} rounded-2xl border ${stat.border} text-center ${stat.offsetY} transition-all hover:shadow-md`}
            >
              <p className={`text-4xl font-extrabold ${stat.text} mb-2`}>{stat.value}</p>
              <p className="text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-16 md:pt-24 pb-24">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 -translate-y-12 -translate-x-1/3">
          <div className="w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
            Our mission is to make <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">business operations seamless</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            We started Symbosys with a simple belief: ERP software shouldn't be complicated, expensive, or hard to use. It should empower your team, not slow them down.
          </p>
        </div>
      </section>

      {/* Story & Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">The Symbosys Story</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Founded in 2024, we saw how small to medium businesses were struggling with fragmented tools. Billing was in one app, inventory in another, and customer data lived in messy spreadsheets.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We built Symbosys to bring everything under one beautifully designed roof. Today, we help thousands of businesses streamline their workflows and focus on what they do best: growing.
              </p>
            </div>
            {/* Live stats grid */}
            <StatsGrid />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600">The principles that guide everything we do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuesData.map((val, index) => {
              const Icon = val.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${val.bg} ${val.text} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                  <p className="text-slate-600">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Join the Symbosys journey</h2>
          <p className="text-lg text-slate-600 mb-10">
            Experience the future of business operations today.
          </p>
          <Link to="/signup" className="px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
            Start your free trial
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
