'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Sprout, LogOut, User, ChevronDown, FileText, Leaf, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { supabase } from '@/lib/supabaseClient';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { profile, role, loading } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const navigateToProfile = () => {
    const profilePath = role === 'farmer' ? '/farmer/profile' : '/operator/settings';
    router.push(profilePath);
    setIsDropdownOpen(false);
  };

  // Role-based theming
  const isOperatorRoute = pathname?.includes('/operator');
  const isOperator = role === 'operator' || (!role && isOperatorRoute);
  const headerBorder = isOperator ? 'border-blue-200' : 'border-emerald-200';
  const logoColor = isOperator ? 'text-blue-600' : 'text-emerald-600';
  const titleColor = isOperator ? 'text-blue-800' : 'text-emerald-800';
  const avatarBg = isOperator ? 'bg-blue-100' : 'bg-emerald-100';
  const avatarText = isOperator ? 'text-blue-700' : 'text-emerald-700';
  const nameColor = isOperator ? 'text-slate-800' : 'text-forest-800';
  const roleColor = isOperator ? 'text-blue-600' : 'text-sage-600';
  const logoutBorder = isOperator ? 'border-blue-200 text-blue-700 hover:bg-blue-50' : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50';
  const signInBg = isOperator ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700';

  return (
    <header className={`sticky top-0 z-50 w-full border-b ${headerBorder} bg-white/95 backdrop-blur`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105">
          {/* Animated Logo Container */}
          <div className={`relative flex items-center justify-center h-10 w-10 rounded-xl ${
            isOperator 
              ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-200' 
              : 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-200'
          } transition-all duration-300 group-hover:shadow-xl group-hover:rotate-3`}>
            <Sprout className="h-6 w-6 text-white" />
            {/* Subtle glow effect */}
            <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isOperator ? 'bg-blue-400' : 'bg-emerald-400'
            } blur-md -z-10`} />
          </div>
          
          {/* Brand Name with Gradient Text */}
          <div className="flex flex-col">
            <span className={`text-xl font-bold bg-gradient-to-r ${
              isOperator 
                ? 'from-blue-700 to-blue-500' 
                : 'from-emerald-800 to-emerald-500'
            } bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wide`}>
              KRISHI-VERIFY
            </span>
            {/* Tagline */}
            <span className={`text-[10px] font-medium uppercase tracking-widest ${
              isOperator ? 'text-blue-400' : 'text-emerald-500'
            } opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300`}>
              Transparent MSP
            </span>
          </div>
        </Link>

        {!loading && (
          <div className="flex items-center gap-4">
            {profile && (
              // Authenticated user view - Professional Profile Dropdown
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:shadow-md ${
                    isOperator ? 'hover:bg-blue-50' : 'hover:bg-emerald-50'
                  }`}
                >
                  {/* Avatar */}
                  <div className={`h-10 w-10 rounded-full ${avatarBg} flex items-center justify-center border-2 ${
                    isOperator ? 'border-blue-200' : 'border-emerald-200'
                  }`}>
                    <span className={`text-base font-bold ${avatarText}`}>
                      {profile.full_name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  
                  {/* User Info */}
                  <div className="hidden md:block text-left">
                    <p className={`text-sm font-semibold ${nameColor} leading-tight`}>{profile.full_name}</p>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        isOperator ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {role === 'farmer' ? 'Farmer' : 'Operator'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Dropdown Arrow */}
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    isOperator ? 'text-blue-400' : 'text-emerald-400'
                  } ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg border z-50 overflow-hidden ${
                    isOperator ? 'bg-blue-900 border-blue-700' : 'bg-white border-emerald-100'
                  }`}>
                    {/* User Header */}
                    <div className={`p-4 border-b ${isOperator ? 'border-blue-700' : 'border-emerald-100'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-full ${avatarBg} flex items-center justify-center`}>
                          <span className={`text-lg font-bold ${avatarText}`}>
                            {profile.full_name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className={`font-semibold ${isOperator ? 'text-white' : 'text-emerald-900'}`}>
                            {profile.full_name}
                          </p>
                          <p className={`text-xs ${isOperator ? 'text-blue-300' : 'text-sage-600'}`}>
                            {profile.full_name?.toLowerCase().replace(' ', '.')}@email.com
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        onClick={navigateToProfile}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isOperator 
                            ? 'text-blue-100 hover:bg-blue-800' 
                            : 'text-forest-700 hover:bg-emerald-50'
                        }`}
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </button>
                      
                      <button
                        onClick={() => {
                          const historyPath = role === 'farmer' ? '/farmer/history' : '/operator/logs';
                          router.push(historyPath);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isOperator 
                            ? 'text-blue-100 hover:bg-blue-800' 
                            : 'text-forest-700 hover:bg-emerald-50'
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                        {role === 'farmer' ? 'My History' : 'Audit Logs'}
                      </button>

                    </div>

                    {/* Logout */}
                    <div className={`p-2 border-t ${isOperator ? 'border-blue-700' : 'border-emerald-100'}`}>
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isOperator 
                            ? 'text-red-300 hover:bg-blue-800' 
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}