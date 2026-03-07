'use client';

import { Sprout, Facebook, Twitter, Linkedin, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-emerald-200 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-5 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-400">
                <Sprout className="h-5 w-5 text-emerald-900" />
              </div>
              <span className="text-xl font-bold">KRISHI-VERIFY</span>
            </div>
            <p className="text-sm text-emerald-100 mb-4">
              Transparent agricultural marketplace ensuring fair prices for every farmer in India.
            </p>
            <div className="flex gap-3">
              <a href="#" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Farmers */}
          <div>
            <h4 className="font-bold mb-4 text-emerald-300">For Farmers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/farmer" className="text-emerald-100 hover:text-emerald-300 transition-colors">Dashboard</Link></li>
              <li><Link href="/blog" className="text-emerald-100 hover:text-emerald-300 transition-colors">Blog & Tips</Link></li>
              <li><Link href="/faq" className="text-emerald-100 hover:text-emerald-300 transition-colors">FAQ & Help</Link></li>
              <li><Link href="/public" className="text-emerald-100 hover:text-emerald-300 transition-colors">Market Data</Link></li>
              <li><a href="tel:1800-180-1551" className="text-emerald-100 hover:text-emerald-300 transition-colors">Kisan Helpline</a></li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h4 className="font-bold mb-4 text-emerald-300">For Business</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/operator" className="text-emerald-100 hover:text-emerald-300 transition-colors">Operator Portal</Link></li>
              <li><Link href="/services" className="text-emerald-100 hover:text-emerald-300 transition-colors">Services</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors">API Docs</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors">Enterprise</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors">Partnerships</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-emerald-300">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-emerald-100 hover:text-emerald-300 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-emerald-100 hover:text-emerald-300 transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-emerald-100 hover:text-emerald-300 transition-colors">FAQ</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors">Downloads</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-emerald-300">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-emerald-100 hover:text-emerald-300 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors">Report Issue</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="grid gap-4 md:grid-cols-3 mb-8 pb-8 border-t border-emerald-800">
          <div className="flex items-center gap-3 text-sm mt-6">
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-800">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-emerald-300 text-xs uppercase tracking-wide">Kisan Helpline</p>
              <p className="font-bold">1800-180-1551</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm mt-6">
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-800">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <p className="text-emerald-300 text-xs uppercase tracking-wide">Email Support</p>
              <p className="font-bold">support@krishiverify.gov.in</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm mt-6">
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-800">
              <Sprout className="h-4 w-4" />
            </div>
            <div>
              <p className="text-emerald-300 text-xs uppercase tracking-wide">Government Certified</p>
              <p className="font-bold">DoAFW, India</p>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-emerald-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-emerald-100">
            <p>© 2026 KRISHI-VERIFY. All rights reserved. Building trust through transparency.</p>
            <p>Designed & Developed by Ministry of Agriculture | Last Updated: March 7, 2026</p>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-emerald-950 border-t border-emerald-800 py-3">
        <div className="container px-4 md:px-6 text-center text-xs text-emerald-200">
          Department of Agriculture & Farmers' Welfare, Government of India
        </div>
      </div>
    </footer>
  );
}
