import { cn } from '@/lib/utils';

type HairlineProps = {
  className?: string;
};

export const Hairline = ({ className }: HairlineProps) => (
  <hr
    className={cn(
      'm-0 h-px w-full border-0 bg-[var(--brand-primary)] [border-radius:var(--brand-radius)]',
      className
    )}
  />
);
