'use client';

import { Sprout, UserPlus, ArrowRight, User, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Sprout className="h-10 w-10 text-emerald-600" />
          <span className="text-2xl font-bold text-emerald-900 tracking-tight text-center">KRISHI-VERIFY</span>
        </Link>
        <h2 className="text-xl font-medium text-forest-800 text-center">Create Your Account</h2>
        <p className="text-sm text-sage-600 mt-2 text-center">Choose your account type to get started</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden">
        <div className="p-6 border-b border-emerald-50 bg-emerald-50/30">
          <h3 className="text-emerald-800 font-bold flex items-center gap-2">
            <UserPlus className="h-5 w-5" /> Select Account Type
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Farmer Sign Up - Primary Green */}
          <Link href="/signup/farmer">
            <button className="w-full p-4 rounded-lg border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <User className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-emerald-800">Sign Up as Farmer</p>
                <p className="text-sm text-emerald-600">Access MSP calculators and track your sales</p>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-400 group-hover:text-emerald-600" />
            </button>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-sage-500">or</span>
            </div>
          </div>

          {/* Operator Sign Up - Blue */}
          <Link href="/signup/operator">
            <button className="w-full p-4 rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-blue-800">Sign Up as Operator</p>
                <p className="text-sm text-blue-600">Manage procurement and view analytics</p>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-400 group-hover:text-blue-600" />
            </button>
          </Link>
        </div>

        <div className="p-4 bg-slate-50 border-t border-emerald-100">
          <p className="text-center text-sm text-sage-600">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}