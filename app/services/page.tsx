import { AppWindow, TrendingUp, Smartphone, Users, Award, Zap, BookOpen, HeadsetIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Comprehensive solutions designed to empower farmers and support agricultural businesses
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            {[
              {
                icon: AppWindow,
                title: 'Digital Marketplace',
                desc: 'Real-time buying and selling platform',
                features: [
                  'Direct buyer-seller connections',
                  'Live auction system',
                  'Price comparison tools',
                  'Multi-crop support',
                  'Instant notifications',
                ]
              },
              {
                icon: TrendingUp,
                title: 'Market Intelligence',
                desc: 'AI-powered analytics and insights',
                features: [
                  'Real-time price tracking',
                  'Historical price trends',
                  'Demand forecasting',
                  'Export data analysis',
                  'Regional market comparisons',
                ]
              },
              {
                icon: Award,
                title: 'Digital Certification',
                desc: 'QR-coded digital receipts',
                features: [
                  'Tamper-proof receipts',
                  'QR code scanning',
                  'Authenticity verification',
                  'Transaction history',
                  'Blockchain verification',
                ]
              },
              {
                icon: Smartphone,
                title: 'Mobile App',
                desc: 'Full-featured mobile platform',
                features: [
                  'Local language support',
                  'Offline access',
                  'Push notifications',
                  'Biometric login',
                  'Low-bandwidth mode',
                ]
              },
              {
                icon: Users,
                title: 'Farmer Support',
                desc: '24/7 customer support network',
                features: [
                  '24/7 helpline',
                  'Expert consultation',
                  'Training programs',
                  'Community forums',
                  'Video tutorials',
                ]
              },
              {
                icon: Zap,
                title: 'Instant Payments',
                desc: 'Fast, secure transactions',
                features: [
                  'Direct bank transfer',
                  '24-hour settlement',
                  'Multi-payment modes',
                  'Zero transaction fees',
                  'Secure encryption',
                ]
              },
              {
                icon: BookOpen,
                title: 'Knowledge Base',
                desc: 'Comprehensive educational content',
                features: [
                  'Best practices guide',
                  'Crop-specific tutorials',
                  'Government schemes info',
                  'Market reports',
                  'Expert blogs',
                ]
              },
              {
                icon: HeadsetIcon,
                title: 'API Integration',
                desc: 'For developers and businesses',
                features: [
                  'RESTful API',
                  'Webhooks support',
                  'Real-time data feeds',
                  'SDK availability',
                  'Enterprise support',
                ]
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="rounded-lg border border-emerald-200 p-8 hover:shadow-lg transition-all">
                  <Icon className="h-12 w-12 text-emerald-600 mb-4" />
                  <h3 className="text-2xl font-bold text-emerald-900 mb-2">{service.title}</h3>
                  <p className="text-forest-700 mb-6">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center text-sm text-forest-700">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/operator">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 md:py-24 bg-emerald-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-emerald-900 mb-12 text-center">Simple Pricing</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { tier: 'Farmer', price: 'Free', desc: 'Perfect for individual farmers' },
              { tier: 'Operator', price: '₹50/txn', desc: 'For agricultural operators', highlight: true },
              { tier: 'Enterprise', price: 'Custom', desc: 'For large-scale operations' },
            ].map((plan, idx) => (
              <div key={idx} className={`rounded-lg p-8 ${plan.highlight ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' : 'bg-white border border-emerald-200'}`}>
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? '' : 'text-emerald-900'}`}>{plan.tier}</h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-emerald-100' : 'text-forest-700'}`}>{plan.desc}</p>
                <p className={`text-4xl font-bold mb-6 ${plan.highlight ? '' : 'text-emerald-600'}`}>{plan.price}</p>
                <Link href="/operator">
                  <Button className={`w-full ${plan.highlight ? 'bg-white text-emerald-600 hover:bg-emerald-50' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                    Choose Plan
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
