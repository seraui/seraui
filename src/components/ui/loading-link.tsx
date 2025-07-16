"use client";

import React, { useCallback } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLoadingBar } from '@/contexts/loading-bar-context';

interface LoadingLinkProps extends Omit<LinkProps, 'onClick'> {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  loadingId?: string;
  disabled?: boolean;
}

export function LoadingLink({
  children,
  href,
  className,
  onClick,
  loadingId,
  disabled = false,
  ...props
}: LoadingLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { startLoading, finishLoading } = useLoadingBar();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }

    // Don't show loading for same page or external links
    const targetHref = typeof href === 'string' ? href : href.pathname || '';
    const isExternal = targetHref.startsWith('http') || targetHref.startsWith('//');
    const isSamePage = pathname === targetHref;

    if (isExternal || isSamePage) {
      return;
    }

    // Start loading
    const id = startLoading(loadingId || `link-${targetHref}`);

    // Handle navigation
    e.preventDefault();
    
    // Use router.push for client-side navigation
    router.push(targetHref);

    // Finish loading after a short delay to ensure the route change is processed
    setTimeout(() => {
      finishLoading(id);
    }, 100);
  }, [disabled, onClick, href, pathname, startLoading, finishLoading, loadingId, router]);

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}

// Hook for programmatic navigation with loading
export function useLoadingNavigation() {
  const router = useRouter();
  const { startLoading, finishLoading } = useLoadingBar();

  const navigate = useCallback((
    href: string,
    options?: {
      loadingId?: string;
      replace?: boolean;
      scroll?: boolean;
    }
  ) => {
    const id = startLoading(options?.loadingId || `nav-${href}`);

    const navigationPromise = options?.replace 
      ? router.replace(href, { scroll: options.scroll })
      : router.push(href, { scroll: options.scroll });

    // Handle the navigation
    Promise.resolve(navigationPromise)
      .then(() => {
        // Small delay to ensure route change is complete
        setTimeout(() => finishLoading(id), 100);
      })
      .catch(() => {
        finishLoading(id);
      });
  }, [router, startLoading, finishLoading]);

  return { navigate };
}
