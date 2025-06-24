"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useLoading } from "./loading-provider";

interface LoadingLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  showLoading?: boolean;
}

export const LoadingLink: React.FC<LoadingLinkProps> = ({
  children,
  className,
  onClick,
  showLoading = true,
  ...linkProps
}) => {
  const { startLoading } = useLoading();
  const currentPath = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only show loading if navigating to a different page
    const targetHref = typeof linkProps.href === 'string' ? linkProps.href : linkProps.href.pathname || '';

    if (showLoading && targetHref !== currentPath) {
      startLoading();
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link {...linkProps} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};
