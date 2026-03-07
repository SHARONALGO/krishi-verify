'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, Shield, User, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Sprout },
    { href: '/operator', label: 'Operator', icon: User },
    { href: '/farmer', label: 'Farmer', icon: Shield },
    { href: '/public', label: 'Public', icon: Globe },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold text-emerald-800">KRISHI-VERIFY</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-emerald-600',
                  isActive ? 'text-emerald-600' : 'text-forest-700'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-emerald-600 bg-background hover:bg-emerald-50 text-emerald-700 h-10 px-4 py-2">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
}
