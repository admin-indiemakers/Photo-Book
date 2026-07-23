'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show on home page
  if (!pathname || pathname === '/') {
    return null;
  }

  const paths = pathname.split('/').filter(Boolean);

  const getBreadcrumbLabel = (path: string) => {
    const labelMap: Record<string, string> = {
      'products': 'Collections',
      'cart': 'Bag',
      'orders': 'Orders',
      'templates': 'Studio',
      'polaroid': 'Polaroids',
      'frame': 'Frames',
      'canvas-frames': 'Canvas',
      'fridge-magnet': 'Magnets',
      'acrylic-frames': 'Acrylic',
    };
    return labelMap[path.toLowerCase()] || path.replace(/-/g, ' ');
  };

  return (
    <div className="w-full px-6 pt-32 pb-4 md:px-12 max-w-[1400px] mx-auto z-40 relative">
      <motion.nav 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center text-[10px] uppercase tracking-[0.2em] font-medium"
      >
        <Link href="/" className="text-gray-400 hover:text-black transition-colors">
          Home
        </Link>

        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;

          return (
            <React.Fragment key={path}>
              <span className="mx-3 text-gray-300 font-light">/</span>
              {isLast ? (
                <span className="text-black">
                  {getBreadcrumbLabel(path)}
                </span>
              ) : (
                <Link href={href} className="text-gray-400 hover:text-black transition-colors">
                  {getBreadcrumbLabel(path)}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </motion.nav>
    </div>
  );
}
