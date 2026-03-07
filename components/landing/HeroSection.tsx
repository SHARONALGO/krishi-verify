'use client';

import { Shield, Sprout, Lock, TrendingUp, MessageSquare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-0 bg-gradient-to-b from-emerald-50 to-white">
      {/* Video Banner Background */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect fill='%23047857' width='1200' height='600'/%3E%3C/svg%3E"
        >
          <source src="https://agri.punjab.gov.in/frontend/images/banner/banner_video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-white/80 bg-white/10 backdrop-blur px-4 py-2 text-sm font-medium text-white">
                <Shield className="mr-2 h-4 w-4" />
                Transparent Agricultural Marketplace
              </div>
              
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                Fair Prices for Every{' '}
                <span className="text-emerald-300">Farmer</span>
              </h1>
              
              <p className="max-w-[600px] text-white/90 md:text-lg leading-relaxed">
                KRISHI-VERIFY ensures transparent MSP procurement with blockchain-inspired security. 
                Real-time price tracking, immutable records, and guaranteed fair pricing for agricultural produce.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/operator">
                  <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                    <Sprout className="mr-2 h-5 w-5" />
                    For Operators
                  </Button>
                </Link>
                <Link href="/farmer">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/50 text-white hover:bg-white/20">
                    <Shield className="mr-2 h-5 w-5" />
                    For Farmers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Features Row Below Video */}
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Lock, title: 'Secure', desc: 'SHA-256 Encrypted' },
            { icon: TrendingUp, title: 'Real-time MSP', desc: 'Auto Calculated' },
            { icon: Check, title: 'Verified', desc: 'Blockchain Assured' },
            { icon: MessageSquare, title: '24/7 Support', desc: 'Kisan Helpline' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <item.icon className="h-6 w-6 text-emerald-700" />
                </div>
              </div>
              <h3 className="font-semibold text-emerald-900">{item.title}</h3>
              <p className="text-sm text-forest-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
