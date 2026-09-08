'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useMotionSafe } from '@/lib/motion';

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
};

export const Marquee = ({ children, className, durationSeconds = 28 }: MarqueeProps) => {
  const motionSafe = useMotionSafe();

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className={cn('brand-marquee-track flex w-max gap-8 ps-8', !motionSafe && 'animate-none')}
        style={{ ['--marquee-duration' as string]: `${durationSeconds}s` }}
      >
        <div className="flex shrink-0 gap-8">{children}</div>
        {motionSafe ? (
          <div className="flex shrink-0 gap-8" aria-hidden="true">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
};
