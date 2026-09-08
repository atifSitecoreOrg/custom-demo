'use client';

import { createElement, type ReactNode } from 'react';
import { Text, type Field } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';

type EyebrowProps = {
  field?: Field<string>;
  children?: ReactNode;
  tag?: string;
  className?: string;
};

export const Eyebrow = ({ field, children, tag = 'p', className }: EyebrowProps) => {
  const classes = cn(
    'text-start text-xs font-medium uppercase leading-relaxed text-[var(--brand-accent)]',
    'ltr:tracking-[0.18em] rtl:tracking-normal',
    className
  );

  if (field) {
    return <Text field={field} tag={tag} className={classes} />;
  }

  return createElement(tag, { className: classes }, children);
};
