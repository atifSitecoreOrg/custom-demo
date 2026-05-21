'use client';

/**
 * Suppresses the "Each child in a list should have a unique key prop" React dev warning
 * that originates inside @sitecore-content-sdk/nextjs AppPlaceholder (v2.1.0).
 * The SDK renders placeholder component arrays without React key props internally.
 * This warning is development-only and does not appear in production builds.
 * Remove this file when the SDK ships a fix.
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const original = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : '';
    if (
      msg.includes('Each child in a list should have a unique') ||
      msg.includes('Warning: Each child in a list')
    ) {
      return;
    }
    original(...args);
  };
}

export {};
