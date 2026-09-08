'use client';

import type { ReactNode } from 'react';
import { Link as ContentSdkLink, type LinkField } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';

type CtaLinkProps = {
  field?: LinkField;
  href?: string;
  children?: ReactNode;
  className?: string;
};

export const CtaLink = ({ field, href, children, className }: CtaLinkProps) => {
  const classes = cn(
    'inline-flex items-center gap-2 text-start font-[family-name:var(--brand-body-font)]',
    'text-sm font-medium leading-relaxed text-[var(--brand-primary)]',
    'underline decoration-[var(--brand-primary)] underline-offset-4',
    'rtl:tracking-normal',
    className
  );

  if (field) {
    return <ContentSdkLink field={field} className={classes} />;
  }

  return (
    <a href={href || '#'} className={classes}>
      {children}
    </a>
  );
};
