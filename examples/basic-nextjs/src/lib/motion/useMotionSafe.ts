'use client';

import { useEffect, useState } from 'react';
import { useIsEditing } from './useIsEditing';

export function useMotionSafe(): boolean {
  const isEditing = useIsEditing();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return !isEditing && !prefersReducedMotion;
}
