import { Sprout, Shield, Users, Globe, Zap, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About KRISHI-VERIFY</h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Transforming Indian agriculture through technology, transparency, and trust since 2024
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-4">Our Mission</h2>
              <p className="text-forest-700 leading-relaxed text-lg">
                To empower Indian farmers through a transparent, decentralized marketplace that ensures fair pricing, 
                immediate payments, and complete data ownership. We eliminate middlemen and connect farmers directly with 
                legitimate buyers while providing government-verified security and blockchain technology.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-4">Our Vision</h2>
              <p className="text-forest-700 leading-relaxed text-lg">
                To create an India where every farmer has access to technology, market information, and fair trading platforms. 
                We envision a digital agricultural ecosystem where transparency drives trust, efficiency improves livelihoods, 
                and technology serves the last mile farmer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-emerald-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-emerald-900 mb-12 text-center">Our Core Values</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: 'Trust', desc: 'Building unbreakable trust through transparency and accountability' },
              { icon: Sprout, title: 'Growth', desc: 'Empowering farmers to grow and prosper with modern tools' },
              { icon: Zap, title: 'Efficiency', desc: 'Reducing costs and time through technology and direct connections' },
              { icon: Users, title: 'Community', desc: 'Supporting farming communities across India with shared resources' },
              { icon: Globe, title: 'Impact', desc: 'Creating systemic change that benefits millions of farmers nationwide' },
              { icon: Award, title: 'Excellence', desc: 'Maintaining highest standards in every aspect of our platform' },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="text-center p-6 rounded-lg bg-white hover:shadow-lg transition-shadow">
                  <Icon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-bold text-emerald-900 text-lg mb-2">{value.title}</h3>
                  <p className="text-forest-700 text-sm">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4 text-center">Leadership Team</h2>
          <p className="text-center text-forest-700 mb-12 max-w-2xl mx-auto">
            Experienced professionals dedicated to transforming agriculture
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: 'Dr. Rajesh Kumar', role: 'Founder & CEO', exp: '25+ years in Agritech' },
              { name: 'Priya Sharma', role: 'CTO', exp: 'Blockchain & Web3 expert' },
              { name: 'Arun Singh', role: 'Chief Operations Officer', exp: 'Government relations specialist' },
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center text-4xl font-bold text-emerald-600">
                  👤
                </div>
                <h3 className="font-bold text-emerald-900 text-lg mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-1">{member.role}</p>
                <p className="text-sm text-forest-700">{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-emerald-900 mb-12 text-center">Achievements</h2>
          
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center p-6 rounded-lg border border-emerald-200">
              <p className="text-4xl font-bold text-emerald-600 mb-2">45,000+</p>
              <p className="text-forest-700">Active Farmers</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-emerald-200">
              <p className="text-4xl font-bold text-emerald-600 mb-2">₹2.45 Cr</p>
              <p className="text-forest-700">Transactions Processed</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-emerald-200">
              <p className="text-4xl font-bold text-emerald-600 mb-2">23+</p>
              <p className="text-forest-700">States Covered</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-emerald-200">
              <p className="text-4xl font-bold text-emerald-600 mb-2">99.8%</p>
              <p className="text-forest-700">Platform Uptime</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
