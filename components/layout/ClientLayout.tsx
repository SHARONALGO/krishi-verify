'use client';

import { useUser } from '@/hooks/use-user';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { role, loading } = useUser();
  const pathname = usePathname();
  
  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }
  
  // Add sidebar margin for all desktop views (sidebar is visible on md+ screens)
  const hasSidebar = true;
  
  return (
    <main className={`flex-1 pb-20 md:pb-0 ${hasSidebar ? 'md:ml-64' : ''}`}>
      {children}
    </main>
  );
}
