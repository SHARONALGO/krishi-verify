'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PhoneIcon, MapPin, MailIcon } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-700 to-emerald-600">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of farmers already benefiting from transparent, fair pricing and blockchain-verified transactions. Start earning better prices today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/farmer">
              <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50">
                I am a Farmer
              </Button>
            </Link>
            <Link href="/operator">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/20">
                I am an Operator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-emerald-100">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-emerald-900 mb-12 text-center">Get in Touch</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-block p-3 rounded-full bg-emerald-100 mb-4">
                <PhoneIcon className="h-6 w-6 text-emerald-700" />
              </div>
              <h3 className="font-bold text-emerald-900 mb-2">Kisan Helpline</h3>
              <p className="text-forest-700 mb-2">Call us anytime for support</p>
              <p className="text-emerald-600 font-semibold">1800-180-1551</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-3 rounded-full bg-emerald-100 mb-4">
                <MailIcon className="h-6 w-6 text-emerald-700" />
              </div>
              <h3 className="font-bold text-emerald-900 mb-2">Email Support</h3>
              <p className="text-forest-700 mb-2">Send us your questions</p>
              <p className="text-emerald-600 font-semibold">support@krishiverify.gov.in</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-3 rounded-full bg-emerald-100 mb-4">
                <MapPin className="h-6 w-6 text-emerald-700" />
              </div>
              <h3 className="font-bold text-emerald-900 mb-2">Headquarters</h3>
              <p className="text-forest-700 mb-2">Department of Agriculture</p>
              <p className="text-emerald-600 font-semibold">New Delhi, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
