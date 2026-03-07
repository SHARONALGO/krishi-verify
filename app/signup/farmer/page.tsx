'use client';

import { useState } from 'react';
import { Sprout, UserPlus, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function FarmerSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role: 'farmer' }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            full_name: fullName,
            role: 'farmer',
          }]);

        if (profileError) throw profileError;

        setSuccess(true);
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">Account Created!</h2>
          <p className="text-sage-600">Redirecting you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4">
      <div className="mb-6 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Sprout className="h-10 w-10 text-emerald-600" />
          <span className="text-2xl font-bold text-emerald-900 tracking-tight">KRISHI-VERIFY</span>
        </Link>
        <h2 className="text-xl font-medium text-forest-800 text-center">Farmer Registration</h2>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden">
        <div className="p-4 border-b border-emerald-50 bg-emerald-50/30 flex items-center gap-2">
          <Link href="/signup">
            <button className="p-2 hover:bg-emerald-100 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5 text-emerald-600" />
            </button>
          </Link>
          <h3 className="text-emerald-800 font-bold flex items-center gap-2">
            <UserPlus className="h-5 w-5" /> Sign Up as Farmer
          </h3>
        </div>
        
        <form onSubmit={handleSignUp} className="p-6 space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-forest-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-forest-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-forest-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-3 rounded-lg border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-100">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><UserPlus size={18} /> Create Farmer Account</>}
          </button>

          <p className="text-center text-sm text-sage-600">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-600 font-bold hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}