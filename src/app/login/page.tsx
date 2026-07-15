import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Login | Offline Living",
  description: "Login to your Offline Living account to save your progress, view orders, and more.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-theme-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
          <svg className="w-12 h-12 text-theme-black" viewBox="0 0 40 40" fill="none">
            <path d="M20 4C16 4 12 8 10 12C8 16 8 20 10 24C12 28 16 30 18 32C19 33 19.5 34 20 36C20.5 34 21 33 22 32C24 30 28 28 30 24C32 20 32 16 30 12C28 8 24 4 20 4Z" fill="currentColor"/>
          </svg>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-theme-black">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-theme-black/60">
          Or{' '}
          <Link href="/signup" className="font-medium text-theme-black underline">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-theme-black/10 sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-theme-black">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-theme-black/20 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-theme-black focus:border-theme-black sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-theme-black">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-theme-black/20 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-theme-black focus:border-theme-black sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-theme-black focus:ring-theme-black border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-theme-black">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-theme-black hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-theme-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-black transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Apple</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M15.429 8.24c-.035-1.786 1.428-3.526 3.125-3.626C17.75 2.476 15.698 1.02 13.911 1c-1.894-.093-3.69 1.258-4.664 1.258-.973 0-2.456-1.134-3.99-1.1-2.046.046-3.931 1.222-4.995 3.109-2.148 3.791-.552 9.4 1.542 12.49 1.018 1.503 2.222 3.197 3.822 3.137 1.53-.061 2.128-.992 3.968-.992 1.841 0 2.385.992 3.995.961 1.637-.03 2.65-1.533 3.65-3.037 1.157-1.737 1.633-3.418 1.656-3.506-.037-.015-3.238-1.257-3.466-5.1zM11.666 4.96c.866-1.077 1.442-2.57 1.282-4.045-1.246.052-2.822.844-3.714 1.9-.798.932-1.488 2.453-1.298 3.905 1.393.111 2.863-.685 3.73-1.76z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
