import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type MiskCityLogoProps = {
  className?: string;
  /** Use on dark backgrounds (e.g. footer) */
  variant?: 'onLight' | 'onDark';
  /** Header default; sm for compact areas */
  size?: 'default' | 'sm';
  /** Home link target */
  href?: string;
};

/**
 * Misk City — official geometric mark (from miskcity.sa favicon asset) + wordmark.
 * Mark file: /public/branding/misk-favicon-official.svg (served locally for Sitecore / AI preview reliability).
 */
export function MiskCityLogo({
  className,
  variant = 'onLight',
  size = 'default',
  href = '/',
}: MiskCityLogoProps): React.ReactElement {
  const icon = size === 'sm' ? 32 : 40;
  const titleClass =
    variant === 'onLight'
      ? 'text-[#1c1c24] group-hover:text-[#233FAD]'
      : 'text-white group-hover:text-white/90';
  const subClass =
    variant === 'onLight' ? 'text-[#6b6c7e]' : 'text-white/60';

  return (
    <Link
      href={href}
      className={cn('group flex min-w-0 items-center gap-2.5 sm:gap-3', className)}
    >
      <Image
        src="/branding/misk-favicon-official.svg"
        alt="Misk City"
        width={icon}
        height={icon}
        className="h-8 w-8 shrink-0 sm:h-10 sm:w-10"
        priority
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            'font-[var(--brand-heading-font,system-ui)] text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm',
            titleClass
          )}
        >
          Misk City
        </span>
        <span
          className={cn(
            'mt-0.5 hidden max-w-[14rem] truncate text-[9px] font-medium uppercase tracking-[0.12em] sm:block sm:text-[10px]',
            subClass
          )}
        >
          Mohammed Bin Salman Nonprofit City
        </span>
      </span>
    </Link>
  );
}
