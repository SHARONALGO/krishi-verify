'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, Shield, User, Globe, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#features', label: 'Features' },
    { href: '/#services', label: 'Services' },
    { href: '/#programs', label: 'Programs' },
    { href: '/#about', label: 'About' },
  ];

  const quickLinks = [
    { href: '/operator', label: 'For Operators', icon: User },
    { href: '/farmer', label: 'For Farmers', icon: Shield },
    { href: '/public', label: 'Public Data', icon: Globe },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-600">
            <Sprout className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-emerald-800 hidden sm:inline">KRISHI-VERIFY</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-forest-700 hover:bg-emerald-50 hover:text-emerald-600'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="/operator" className="hidden md:inline">
            <button className="inline-flex items-center justify-center rounded-md text-xs md:text-sm font-medium transition-all px-3 py-2 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700">
              Operator
            </button>
          </Link>
          
          <Link href="/farmer" className="hidden md:inline">
            <button className="inline-flex items-center justify-center rounded-md text-xs md:text-sm font-medium transition-all px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              Farmer Login
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-emerald-200 bg-background hover:bg-emerald-50 text-emerald-700 h-10 w-10"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-200 bg-white/98">
          <div className="container px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-sm font-medium text-forest-700 hover:bg-emerald-50 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-emerald-200 my-2 pt-2 space-y-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
