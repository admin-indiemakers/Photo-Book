'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const customEase = [0.16, 1, 0.3, 1] as const;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const attemptLogin = async () => {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        if (loginError.message.includes('Email not confirmed')) {
          // Auto-confirm the email for existing users missing confirmation
          const { confirmUserEmailByEmail } = await import('@/app/actions/auth');
          const confirmResult = await confirmUserEmailByEmail(email);
          
          if (confirmResult.success) {
            // Retry login after confirmation
            const retryData = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (retryData.error) {
              let errMsg = retryData.error.message;
              if (errMsg === 'Invalid login credentials') errMsg = 'Invalid email or password. Please try again.';
              setError(errMsg);
              return null;
            }
            return retryData.data;
          }
        }
        
        let errMsg = loginError.message;
        if (errMsg === 'Invalid login credentials') errMsg = 'Invalid email or password. Please try again.';
        setError(errMsg);
        return null;
      }
      return data;
    };

    const data = await attemptLogin();

    if (data?.user) {
      // Ensure user exists in customers table bypassing RLS
      const { syncCustomerData } = await import('@/app/actions/auth');
      await syncCustomerData(
        data.user.id, 
        email, 
        data.user.user_metadata?.full_name || email.split('@')[0]
      );
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden text-black font-sans selection:bg-[#f26523] selection:text-white">
      {/* Left side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: customEase }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black"
      >
        <img 
          src="/images/books.png" 
          alt="Premium photobook" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: customEase }}
          className="absolute bottom-20 left-20 text-white pr-12"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-6 leading-tight font-light">Your memories,<br/>beautifully told.</h2>
          <p className="text-gray-300 max-w-md text-lg font-light leading-relaxed">
            Welcome back to Offline Living. Continue crafting your heirloom-quality artifacts and preserving the moments that matter most.
          </p>
        </motion.div>
      </motion.div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 md:py-12 sm:px-12 lg:px-24 xl:px-32 bg-white relative">
        
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f26523] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: customEase }}
          className="w-full max-w-md mx-auto relative z-10"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-10 md:mb-16 group">
            <span className="font-serif text-2xl tracking-wide text-black hover:text-[#f26523] transition-colors">Offline Living</span>
          </Link>
          
          <h2 className="text-3xl md:text-4xl font-serif text-black mb-2 md:mb-3">
            Welcome back
          </h2>
          <p className="text-gray-500 mb-8 md:mb-10 font-light text-base md:text-lg">
            Don't have an account?{' '}
            <Link href="/signup" className="text-black font-medium hover:text-[#f26523] transition-colors">
              create account
            </Link>
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100 flex items-start gap-3"
              >
                <span>{error}</span>
              </motion.div>
            )}
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                suppressHydrationWarning
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                autoFocus
                disabled={loading}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="block w-full px-4 py-3 bg-transparent border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-[#f26523] transition-colors text-black disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 bg-transparent border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-[#f26523] transition-colors text-black disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-gray-400 hover:text-[#f26523] focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#f26523] focus:ring-[#f26523] border-gray-300 rounded cursor-pointer transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-gray-500 hover:text-[#f26523] transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-8">
              <button
                suppressHydrationWarning
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden group rounded-full border border-black px-8 py-4 bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <div className="absolute inset-0 bg-[#f26523] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 font-medium tracking-wide flex justify-center items-center">
                  {loading ? 'Signing in...' : 'Sign in to your account'}
                </span>
              </button>
            </div>
          </form>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-gray-200 rounded-full shadow-sm bg-white text-sm font-medium text-black hover:border-black transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </button>
              <button suppressHydrationWarning className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-gray-200 rounded-full shadow-sm bg-white text-sm font-medium text-black hover:border-black transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M15.429 8.24c-.035-1.786 1.428-3.526 3.125-3.626C17.75 2.476 15.698 1.02 13.911 1c-1.894-.093-3.69 1.258-4.664 1.258-.973 0-2.456-1.134-3.99-1.1-2.046.046-3.931 1.222-4.995 3.109-2.148 3.791-.552 9.4 1.542 12.49 1.018 1.503 2.222 3.197 3.822 3.137 1.53-.061 2.128-.992 3.968-.992 1.841 0 2.385.992 3.995.961 1.637-.03 2.65-1.533 3.65-3.037 1.157-1.737 1.633-3.418 1.656-3.506-.037-.015-3.238-1.257-3.466-5.1zM11.666 4.96c.866-1.077 1.442-2.57 1.282-4.045-1.246.052-2.822.844-3.714 1.9-.798.932-1.488 2.453-1.298 3.905 1.393.111 2.863-.685 3.73-1.76z" />
                </svg>
                Apple
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
