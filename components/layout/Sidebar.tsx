'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  History, 
  Calculator, 
  User, 
  ClipboardList, 
  BarChart3, 
  ShieldCheck, 
  Settings,
  Home,
  LogIn,
  LogOut,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';

const farmerNavItems = [
  { href: '/farmer', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/farmer/book-slots', label: 'Book Slots', icon: Calendar },
  { href: '/farmer/history', label: 'My History', icon: History },
  { href: '/farmer/calculator', label: 'MSP Calculator', icon: Calculator },
  { href: '/farmer/profile', label: 'My Profile', icon: User },
];

const operatorNavItems = [
  { href: '/operator/procurement', label: 'Procurement Desk', icon: ClipboardList },
  { href: '/operator', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/operator/analytics', label: 'Mandi Analytics', icon: BarChart3 },
  { href: '/operator/logs', label: 'Merkle Audit Logs', icon: ShieldCheck },
  { href: '/operator/settings', label: 'Settings', icon: Settings },
];

const publicNavItems = [
  { href: '/', label: 'Home', icon: Home },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role, profile, loading } = useUser();

  if (loading) {
    return (
      <aside className="hidden md:flex w-64 flex-col border-r border-emerald-200 bg-white">
        <div className="p-6">
          <div className="h-8 bg-emerald-100 rounded animate-pulse" />
        </div>
      </aside>
    );
  }

  // Public navigation for non-authenticated users
  if (!role) {
    const isOperatorTheme = pathname?.includes('/operator');
    const asideClasses = isOperatorTheme 
      ? 'border-blue-200 bg-blue-50' 
      : 'border-emerald-200 bg-emerald-50';
    const headerTextClass = isOperatorTheme ? 'text-blue-600' : 'text-sage-600';
    const activeClass = isOperatorTheme ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700';
    const hoverClass = isOperatorTheme ? 'text-blue-800 hover:bg-blue-100 hover:text-blue-800' : 'text-forest-700 hover:bg-emerald-50 hover:text-emerald-700';
    const bannerBgClass = isOperatorTheme ? 'bg-blue-100' : 'bg-emerald-100';
    const bannerTextClass = isOperatorTheme ? 'text-blue-700' : 'text-emerald-700';

    return (
      <aside className={`hidden md:flex w-64 h-full flex-shrink-0 flex-col border-r ${asideClasses} overflow-y-auto`}>
        <div className="p-6">
          <h2 className={`text-xs font-semibold uppercase tracking-wider ${headerTextClass}`}>
            Public
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {publicNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors',
                  isActive ? activeClass : hoverClass
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={`p-4 m-4 rounded-lg ${bannerBgClass}`}>
          <p className={`text-xs ${bannerTextClass}`}>
            Join KRISHI-VERIFY for transparent MSP procurement
          </p>
        </div>
      </aside>
    );
  }

  // Role-based navigation items
  const navItems = role === 'farmer' ? farmerNavItems : operatorNavItems;
  
  // Role-based theme
  const isFarmer = role === 'farmer';
  const themeClasses = isFarmer 
    ? 'bg-emerald-50 border-emerald-200' 
    : 'bg-blue-900 border-blue-800';
  const activeClasses = isFarmer
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-blue-800 text-blue-100';
  const hoverClasses = isFarmer
    ? 'hover:bg-emerald-50 hover:text-emerald-700'
    : 'hover:bg-blue-800 hover:text-blue-100';
  const textColor = isFarmer ? 'text-forest-700' : 'text-blue-100';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <aside className={`hidden md:flex w-64 h-full flex-shrink-0 flex-col border-r ${themeClasses} overflow-y-auto`}>
      {/* Portal Title Section */}
      <div className="p-6 border-b border-opacity-20 border-slate-300">
        <h2 className={`text-xs font-semibold uppercase tracking-wider ${isFarmer ? 'text-sage-600' : 'text-blue-300'}`}>
          {role === 'farmer' ? 'Farmer Portal' : 'Operator Console'}
        </h2>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors',
                isActive ? activeClasses : `${textColor} ${hoverClasses}`
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
            isFarmer 
              ? 'text-forest-700 hover:bg-emerald-100' 
              : 'text-blue-100 hover:bg-blue-800'
          }`}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>

      <div className={`p-4 m-4 rounded-lg ${isFarmer ? 'bg-emerald-100' : 'bg-blue-800'}`}>
        <p className={`text-xs ${isFarmer ? 'text-emerald-700' : 'text-blue-200'}`}>
          {role === 'farmer' 
            ? 'Check MSP prices before visiting the mandi' 
            : 'All transactions are recorded on the blockchain'}
        </p>
      </div>
    </aside>
  );
}