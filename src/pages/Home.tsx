import { ArrowRight, CheckCircle2, Zap, Shield, BarChart3, Users, Box, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuresData = [
  { title: 'Smart Billing', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100', desc: 'Automate your invoicing and accept global payments effortlessly.' },
  { title: 'Inventory Management', icon: Box, color: 'text-blue-500', bg: 'bg-blue-100', desc: 'Track stock levels in real-time across multiple warehouses.' },
  { title: 'Customer CRM', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-100', desc: 'Build stronger relationships with complete customer history.' },
  { title: 'Advanced Analytics', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-100', desc: 'Make data-driven decisions with custom reports and dashboards.' },
  { title: 'Enterprise Security', icon: Shield, color: 'text-rose-500', bg: 'bg-rose-100', desc: 'Bank-grade encryption keeping your business data safe.' },
  { title: 'Seamless Integrations', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-100', desc: 'Connect with your favorite tools in just a few clicks.' },
];

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-16 md:pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            Symbosys ERP v2.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Manage your business <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">without the chaos</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            The all-in-one ERP software designed for modern teams. Streamline inventory, automate billing, and build stronger customer relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 text-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center gap-2">
              Book a Demo
            </a>
          </div>

          <div className="mt-12 text-sm text-slate-500 flex items-center justify-center gap-6">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 14-day free trial</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cancel anytime</span>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="rounded-xl border border-slate-200/60 bg-white shadow-2xl p-2 md:p-4 backdrop-blur-sm bg-white/50">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Dashboard Preview" 
                className="rounded-lg shadow-sm border border-slate-100 w-full object-cover max-h-[600px] opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Powerful Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Everything you need to scale</h3>
            <p className="text-lg text-slate-600">
              Stop juggling multiple tools. Symbosys brings your entire business operations under one roof with powerful, easy-to-use features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300 bg-white">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">{feature.desc}</p>
                  <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                    Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your business?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of modern businesses that use Symbosys to streamline their operations and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">
              Get Started Now
            </Link>
            <a href="#contact" className="px-8 py-4 rounded-full bg-white/10 text-white border border-white/20 text-lg font-medium hover:bg-white/20 transition-all">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
