'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, User, Shield, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Sprout },
    { href: '/operator', label: 'Operator', icon: User },
    { href: '/farmer', label: 'Farmer', icon: Shield },
    { href: '/public', label: 'Public', icon: Globe },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 flex-col border-r border-emerald-200 bg-white p-6">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 rounded-md px-3 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-forest-700 hover:bg-emerald-50 hover:text-emerald-700'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto">
          <div className="rounded-lg bg-emerald-50 p-4">
            <p className="text-xs text-sage-700">
              Powered by Blockchain Technology
            </p>
            <p className="mt-1 text-xs font-medium text-emerald-700">
              Tamper-Proof & Transparent
            </p>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-emerald-200 bg-white">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center rounded-md p-2 text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-forest-700 hover:bg-emerald-50'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
