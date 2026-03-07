'use client';

import { Shield, Sprout, Lock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 gradient-green">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-emerald-600 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              <Shield className="mr-2 h-4 w-4" />
              Decentralized Trust Platform
            </div>
            
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-emerald-900">
              Farmer-Owned Data,{' '}
              <span className="text-emerald-600">Tamper-Proof Trust</span>
            </h1>
            
            <p className="max-w-[600px] text-forest-700 md:text-xl">
              KRISHI-VERIFY ensures transparent MSP procurement using blockchain-inspired 
              technology. Every transaction is hashed, verified, and immutable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/operator">
                <Button size="lg" className="w-full sm:w-auto">
                  <Sprout className="mr-2 h-5 w-5" />
                  Start as Operator
                </Button>
              </Link>
              <Link href="/farmer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Shield className="mr-2 h-5 w-5" />
                  Farmer Dashboard
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <Card className="glass-card">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-emerald-100 p-4">
                    <Lock className="h-8 w-8 text-emerald-700 mb-2" />
                    <p className="text-sm font-medium text-emerald-800">SHA-256 Hashed</p>
                    <p className="text-xs text-sage-600">Tamper-proof receipts</p>
                  </div>
                  <div className="rounded-lg bg-sage-100 p-4">
                    <TrendingUp className="h-8 w-8 text-sage-700 mb-2" />
                    <p className="text-sm font-medium text-sage-800">Real-time MSP</p>
                    <p className="text-xs text-forest-600">Auto-calculations</p>
                  </div>
                </div>
                
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-800">Latest Transaction</span>
                    <span className="text-xs text-sage-600">Just now</span>
                  </div>
                  <code className="block text-xs text-forest-700 break-all">
                    0x7f83b1...a9c4e2
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] opacity-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-sage-400 blur-3xl" />
      </div>
    </section>
  );
}
