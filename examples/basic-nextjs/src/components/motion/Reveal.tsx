'use client';

import type { ReactNode } from 'react';
import { m } from 'motion/react';
import { cn } from '@/lib/utils';
import { motionDuration, motionEase, useMotionSafe } from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const motionSafe = useMotionSafe();

  if (!motionSafe) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: motionDuration.base, ease: motionEase, delay }}
    >
      {children}
    </m.div>
  );
};
