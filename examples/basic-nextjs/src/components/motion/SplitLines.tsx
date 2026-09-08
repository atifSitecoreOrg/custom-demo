'use client';

import { Text, type Field } from '@sitecore-content-sdk/nextjs';
import { m } from 'motion/react';
import { cn } from '@/lib/utils';
import { motionDuration, motionEase, useMotionSafe } from '@/lib/motion';

type SplitLinesProps = {
  field?: Field<string>;
  tag?: string;
  className?: string;
  delay?: number;
};

/**
 * Animates a Sitecore Text field as a unit.
 * Never splits the field string — the SDK helper stays intact for editing.
 */
export const SplitLines = ({ field, tag = 'p', className, delay = 0 }: SplitLinesProps) => {
  const motionSafe = useMotionSafe();
  const text = <Text field={field} tag={tag} className={cn('text-start leading-relaxed', className)} />;

  if (!motionSafe) {
    return text;
  }

  return (
    <div className="overflow-hidden">
      <m.div
        initial={{ opacity: 0, y: '0.6em' }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionDuration.base, ease: motionEase, delay }}
      >
        {text}
      </m.div>
    </div>
  );
};
