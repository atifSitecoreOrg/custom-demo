'use client';

import { useSitecore } from '@sitecore-content-sdk/nextjs';

export function useIsEditing(): boolean {
  try {
    const { page } = useSitecore();
    return Boolean(page?.mode?.isEditing);
  } catch {
    return false;
  }
}
