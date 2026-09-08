'use client';

import type { ReactNode } from 'react';
import { m } from 'motion/react';
import { cn } from '@/lib/utils';
import { motionDuration, motionEase, useMotionSafe } from '@/lib/motion';

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export const ImageReveal = ({ children, className, delay = 0 }: ImageRevealProps) => {
  const motionSafe = useMotionSafe();

  if (!motionSafe) {
    return <div className={cn('overflow-hidden', className)}>{children}</div>;
  }

  return (
    <div className={cn('overflow-hidden', className)}>
      <m.div
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: motionDuration.slow, ease: motionEase, delay }}
      >
        {children}
      </m.div>
    </div>
  );
};
