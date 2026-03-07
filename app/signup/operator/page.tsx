'use client';

import { useState } from 'react';
import { Sprout, UserPlus, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function OperatorSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mandiName, setMandiName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Create the Auth User with metadata
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          full_name: fullName,
          mandi_name: mandiName,
          role: 'operator' 
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // 2. Wait for Trigger (Essential for Hackathons)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 3. Verify Profile was created successfully
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'operator') {
        // Use window.location for a "hard" redirect to ensure Sidebar loads correctly
        window.location.assign('/operator');
      } else {
        console.error("Profile check failed:", profileError);
        setError("Account created, but database sync is slow. Please try Logging In.");
        
        // Fallback: If profile isn't there yet, redirect to login so they can try again
        setTimeout(() => router.push('/login'), 3000);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="mb-6 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Sprout className="h-10 w-10 text-blue-600" />
          <span className="text-2xl font-bold text-blue-900 tracking-tight text-center">KRISHI-VERIFY</span>
        </Link>
        <h2 className="text-xl font-medium text-slate-800 text-center">Operator Registration</h2>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-blue-100 overflow-hidden">
        <div className="p-4 border-b border-blue-50 bg-blue-50/30 flex items-center gap-2">
          <Link href="/signup">
            <button className="p-2 hover:bg-blue-100 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5 text-blue-600" />
            </button>
          </Link>
          <h3 className="text-blue-800 font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" /> Sign Up as Operator
          </h3>
        </div>
        
        <form onSubmit={handleSignUp} className="p-6 space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Mandi Name</label>
            <input
              type="text"
              placeholder="e.g. Punjab Central Mandi"
              className="w-full p-3 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={mandiName}
              onChange={(e) => setMandiName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              placeholder="operator@mandi.gov.in"
              className="w-full p-3 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><UserPlus size={18} /> Create Operator Account</>}
          </button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}