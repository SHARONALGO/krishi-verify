'use client';

import { Sprout, Facebook, Twitter, Linkedin, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/use-user';

export function Footer() {
  const pathname = usePathname();
  const { role } = useUser();

  const isOperatorRoute = pathname?.includes('/operator');
  const isOperator = role === 'operator' || (!role && isOperatorRoute);

  const themeClasses = isOperator ? {
    borderTMain: 'border-blue-200',
    bgMain: 'bg-gradient-to-b from-blue-900 to-blue-950',
    logoBg: 'bg-blue-400',
    logoIcon: 'text-blue-900',
    textMuted: 'text-blue-100',
    socialBg: 'bg-blue-800',
    socialHover: 'hover:bg-blue-700',
    heading: 'text-blue-300',
    linkHover: 'hover:text-blue-300',
    borderDark: 'border-blue-800',
    bottomBg: 'bg-blue-950',
    bottomText: 'text-blue-200'
  } : {
    borderTMain: 'border-emerald-200',
    bgMain: 'bg-gradient-to-b from-emerald-900 to-emerald-950',
    logoBg: 'bg-emerald-400',
    logoIcon: 'text-emerald-900',
    textMuted: 'text-emerald-100',
    socialBg: 'bg-emerald-800',
    socialHover: 'hover:bg-emerald-700',
    heading: 'text-emerald-300',
    linkHover: 'hover:text-emerald-300',
    borderDark: 'border-emerald-800',
    bottomBg: 'bg-emerald-950',
    bottomText: 'text-emerald-200'
  };

  return (
    <footer className={`border-t ${themeClasses.borderTMain} ${themeClasses.bgMain} text-white mt-auto`}>
      {/* Main Footer Content */}
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-5 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className={`inline-flex items-center justify-center h-8 w-8 rounded-lg ${themeClasses.logoBg}`}>
                <Sprout className={`h-5 w-5 ${themeClasses.logoIcon}`} />
              </div>
              <span className="text-xl font-bold">KRISHI-VERIFY</span>
            </div>
            <p className={`text-sm ${themeClasses.textMuted} mb-4`}>
              Transparent agricultural marketplace ensuring fair prices for every farmer in India.
            </p>
            <div className="flex gap-3">
              <a href="#" className={`inline-flex items-center justify-center h-10 w-10 rounded-full ${themeClasses.socialBg} ${themeClasses.socialHover} transition-colors`}>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className={`inline-flex items-center justify-center h-10 w-10 rounded-full ${themeClasses.socialBg} ${themeClasses.socialHover} transition-colors`}>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className={`inline-flex items-center justify-center h-10 w-10 rounded-full ${themeClasses.socialBg} ${themeClasses.socialHover} transition-colors`}>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Farmers */}
          <div>
            <h4 className={`font-bold mb-4 ${themeClasses.heading}`}>For Farmers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/farmer" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Dashboard</Link></li>
              <li><Link href="/blog" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Blog & Tips</Link></li>
              <li><Link href="/faq" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>FAQ & Help</Link></li>
              <li><Link href="/public" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Market Data</Link></li>
              <li><a href="tel:1800-180-1551" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Kisan Helpline</a></li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h4 className={`font-bold mb-4 ${themeClasses.heading}`}>For Business</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/operator" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Operator Portal</Link></li>
              <li><Link href="/services" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Services</Link></li>
              <li><Link href="#" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>API Docs</Link></li>
              <li><Link href="#" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Enterprise</Link></li>
              <li><Link href="#" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Partnerships</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={`font-bold mb-4 ${themeClasses.heading}`}>Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>About Us</Link></li>
              <li><Link href="/blog" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Blog</Link></li>
              <li><Link href="/faq" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>FAQ</Link></li>
              <li><Link href="#" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Documentation</Link></li>
              <li><Link href="#" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Downloads</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`font-bold mb-4 ${themeClasses.heading}`}>Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Contact Us</Link></li>
              <li><Link href="/faq" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Help Center</Link></li>
              <li><Link href="#" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Report Issue</Link></li>
              <li><Link href="#" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Terms & Conditions</Link></li>
              <li><Link href="#" className={`${themeClasses.textMuted} ${themeClasses.linkHover} transition-colors`}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div className={`grid gap-4 md:grid-cols-3 mb-8 pb-8 border-t ${themeClasses.borderDark}`}>
          <div className="flex items-center gap-3 text-sm mt-6">
            <div className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${themeClasses.socialBg}`}>
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className={`${themeClasses.heading} text-xs uppercase tracking-wide`}>Kisan Helpline</p>
              <p className="font-bold">1800-180-1551</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm mt-6">
            <div className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${themeClasses.socialBg}`}>
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <p className={`${themeClasses.heading} text-xs uppercase tracking-wide`}>Email Support</p>
              <p className="font-bold">support@krishiverify.gov.in</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm mt-6">
            <div className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${themeClasses.socialBg}`}>
              <Sprout className="h-4 w-4" />
            </div>
            <div>
              <p className={`${themeClasses.heading} text-xs uppercase tracking-wide`}>Government Certified</p>
              <p className="font-bold">DoAFW, India</p>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className={`border-t ${themeClasses.borderDark} pt-8`}>
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${themeClasses.textMuted}`}>
            <p>© 2026 KRISHI-VERIFY. All rights reserved. Building trust through transparency.</p>
            <p>Designed & Developed by Ministry of Agriculture | Last Updated: March 7, 2026</p>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className={`${themeClasses.bottomBg} border-t ${themeClasses.borderDark} py-3`}>
        <div className={`container px-4 md:px-6 text-center text-xs ${themeClasses.bottomText}`}>
          Department of Agriculture & Farmers' Welfare, Government of India
        </div>
      </div>
    </footer>
  );
}
