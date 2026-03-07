'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sprout, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { supabase } from '@/lib/supabaseClient';

export function Header() {
  const router = useRouter();
  const { profile, role, loading } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  // Role-based theming
  const isOperator = role === 'operator';
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
        <Link href="/" className="flex items-center space-x-2">
          <Sprout className={`h-6 w-6 ${logoColor}`} />
          <span className={`text-xl font-bold ${titleColor}`}>KRISHI-VERIFY</span>
        </Link>

        {!loading && (
          <div className="flex items-center gap-4">
            {profile ? (
              // Authenticated user view
              <>
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full ${avatarBg} flex items-center justify-center`}>
                    <span className={`text-sm font-medium ${avatarText}`}>
                      {profile.full_name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className={`text-sm font-medium ${nameColor}`}>{profile.full_name}</p>
                    <p className={`text-xs ${roleColor} capitalize`}>{profile.role}</p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className={logoutBorder}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              // Guest view - Show Sign In button
              <Button 
                onClick={() => router.push('/login')}
                className={signInBg}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}