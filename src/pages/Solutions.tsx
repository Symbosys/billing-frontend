import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShoppingBag, Briefcase, Stethoscope } from 'lucide-react';

const solutionsData = [
  {
    title: 'Manufacturing',
    shortName: 'Manufacturing',
    icon: Building2,
    colors: { bg: 'bg-blue-100', text: 'text-blue-600', bullet: 'bg-blue-600', hoverText: 'hover:text-blue-700' },
    description: 'Streamline your production line. Track raw materials in real-time, automate reordering, and ensure quality control across all your facilities.',
    features: ['Bill of Materials Management', 'Production Planning', 'Supply Chain Visibility'],
  },
  {
    title: 'Retail & E-commerce',
    shortName: 'Retail',
    icon: ShoppingBag,
    colors: { bg: 'bg-purple-100', text: 'text-purple-600', bullet: 'bg-purple-600', hoverText: 'hover:text-purple-700' },
    description: 'Unify your sales channels. Manage inventory across physical stores and online platforms seamlessly, and deliver exceptional customer experiences.',
    features: ['Multi-channel Inventory', 'POS Integration', 'Customer Loyalty Programs'],
  },
  {
    title: 'Professional Services',
    shortName: 'Services',
    icon: Briefcase,
    colors: { bg: 'bg-emerald-100', text: 'text-emerald-600', bullet: 'bg-emerald-600', hoverText: 'hover:text-emerald-700' },
    description: 'Optimize your billable hours. Track project progress, manage resources efficiently, and automate invoicing for improved cash flow.',
    features: ['Time Tracking', 'Project Management', 'Automated Invoicing'],
  },
  {
    title: 'Healthcare',
    shortName: 'Healthcare',
    icon: Stethoscope,
    colors: { bg: 'bg-rose-100', text: 'text-rose-600', bullet: 'bg-rose-600', hoverText: 'hover:text-rose-700' },
    description: 'Focus on patient care. Manage medical supplies securely, automate compliance reporting, and streamline administrative workflows.',
    features: ['Compliance Tracking', 'Secure Patient Data', 'Medical Inventory'],
  },
];

const Solutions = () => {
  return (
    <div className="pt-20">
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Built for every industry</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Discover how Symbosys ERP adapts to your unique business needs, providing specialized tools that drive efficiency and growth.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {solutionsData.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div key={index} className="flex flex-col p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-16 h-16 ${solution.colors.bg} ${solution.colors.text} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{solution.title}</h3>
                  <p className="text-slate-600 mb-8 flex-grow">{solution.description}</p>
                  <ul className="space-y-3 mb-8">
                    {solution.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-slate-700">
                        <span className={`w-2 h-2 rounded-full ${solution.colors.bullet} mr-3`}></span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup" className={`inline-flex items-center ${solution.colors.text} font-semibold ${solution.colors.hoverText}`}>
                    Explore {solution.shortName} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-center text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't see your industry?</h2>
          <p className="text-lg text-blue-100 mb-10">
            Symbosys is highly customizable. Talk to our team to see how we can configure our ERP for your specific business case.
          </p>
          <button className="px-8 py-4 rounded-full bg-white text-blue-600 text-lg font-bold hover:bg-slate-100 transition-all shadow-lg cursor-pointer">
            Contact Sales
          </button>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
