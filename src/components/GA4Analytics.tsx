'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/gtag';

export default function GA4Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip firing page_view on the very first mount if gtag.js initial config handles it,
    // but fire on every SPA soft-navigation route change.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const url = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
