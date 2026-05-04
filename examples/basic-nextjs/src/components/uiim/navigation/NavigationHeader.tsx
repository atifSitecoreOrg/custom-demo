'use client';

import React, { JSX, useState, useEffect } from 'react';
import { TextField, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';
import { MiskCityLogo } from '@/components/branding/MiskCityLogo';

/**
 * Shape of each navigation item provided by the Navigation Contents Resolver.
 */
interface NavField {
  Id: string;
  Styles: string[];
  Href: string;
  Querystring: string;
  DisplayName?: string;
  Title?: TextField;
  NavigationTitle?: TextField;
  Children?: NavField[];
}

type NavigationHeaderProps = ComponentProps & {
  fields: NavField[] | Record<string, NavField>;
};

const NavigationHeaderDefaultComponent = (): JSX.Element => (
  <div className="component navigation-header">
    <div className="component-content">
      <span className="is-empty-hint">NavigationHeader</span>
    </div>
  </div>
);

/**
 * Normalize fields from the Navigation Contents Resolver.
 * Can arrive as an array or an object with numeric keys.
 */
function getNavItems(fields: NavField[] | Record<string, NavField>): NavField[] {
  if (!fields) return [];
  if (Array.isArray(fields)) return fields;
  return Object.values(fields).filter((f) => f && typeof f === 'object' && 'Href' in f);
}

function getNavText(item: NavField): JSX.Element | string {
  if (item.NavigationTitle?.value) return <Text field={item.NavigationTitle} />;
  if (item.Title?.value) return <Text field={item.Title} />;
  return item.DisplayName || '';
}

const navLinkClass = (onDark: boolean) =>
  cn(
    'text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200',
    onDark
      ? 'text-white/95 hover:text-white'
      : 'text-[#1c1c24] hover:text-[#233fad]'
  );

const NavLinks = ({
  className,
  items,
  onDark,
}: {
  className?: string;
  items: NavField[];
  onDark: boolean;
}) => (
  <nav className={cn('hidden items-center justify-center gap-5 md:gap-6 md:flex', className)}>
    {items.map((item) => (
      <a
        key={item.Id}
        href={item.Href + (item.Querystring ? `?${item.Querystring}` : '')}
        className={navLinkClass(onDark)}
      >
        {getNavText(item)}
      </a>
    ))}
  </nav>
);

const MobileMenu = ({
  items,
  open,
  onClose,
  onDark,
}: {
  items: NavField[];
  open: boolean;
  onClose: () => void;
  onDark: boolean;
}) => {
  if (!open) return null;
  return (
    <div
      className="border-t md:hidden"
      style={{
        borderColor: onDark ? 'rgba(255,255,255,0.12)' : 'var(--brand-border, #e2e4ea)',
        backgroundColor: onDark ? 'rgba(12, 15, 28, 0.98)' : 'var(--brand-header-bg, #fff)',
      }}
    >
      <div className="flex flex-col gap-1 px-4 py-4">
        {items.map((item) => (
          <a
            key={item.Id}
            href={item.Href + (item.Querystring ? `?${item.Querystring}` : '')}
            className={cn('py-2 text-sm font-semibold uppercase tracking-wider', navLinkClass(onDark))}
            onClick={onClose}
          >
            {getNavText(item)}
          </a>
        ))}
        <a
          href="#contact"
          className="mt-2 inline-flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold"
          style={{
            backgroundColor: 'var(--brand-primary)',
            color: 'var(--brand-primary-foreground, #fff)',
          }}
          onClick={onClose}
        >
          Contact
        </a>
      </div>
    </div>
  );
};

const CtaButton = ({ className, onDark }: { className?: string; onDark?: boolean }) => (
  <a
    href="#contact"
    className={cn(
      'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-opacity duration-200 hover:opacity-90',
      onDark && 'ring-1 ring-white/30',
      className
    )}
    style={{
      backgroundColor: onDark ? 'transparent' : 'var(--brand-primary)',
      color: onDark ? '#fff' : 'var(--brand-primary-foreground, #fff)',
      border: onDark ? '1px solid rgba(255,255,255,0.5)' : undefined,
    }}
  >
    Contact
  </a>
);

const LangSwitch = ({ onDark }: { onDark: boolean }) => (
  <div
    className={cn(
      'hidden items-center gap-1 text-[10px] font-semibold uppercase tracking-wider sm:flex',
      onDark ? 'text-white/80' : 'text-[#6b6c7e]'
    )}
    aria-hidden
  >
    <span className={cn(!onDark && 'text-[#233fad]')}>EN</span>
    <span className="opacity-40">|</span>
    <span className="opacity-60">AR</span>
  </div>
);

const MenuButton = ({ open, onClick, onDark }: { open: boolean; onClick: () => void; onDark: boolean }) => (
  <button
    className="p-2 md:hidden"
    onClick={onClick}
    aria-label="Toggle menu"
    style={{ color: onDark ? '#fff' : 'var(--brand-header-fg, #1c1c24)' }}
  >
    {open ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ) : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    )}
  </button>
);

export const Default = (props: NavigationHeaderProps): JSX.Element => {
  const { params, fields } = props;
  const { styles, RenderingIdentifier } = params;
  const [menuOpen, setMenuOpen] = useState(false);

  const items = getNavItems(fields);

  if (!params) return <NavigationHeaderDefaultComponent />;

  return (
    <div className={cn('component navigation-header', styles)} id={RenderingIdentifier}>
      <header
        className="w-full border-b bg-white/95 shadow-[0_1px_0_rgba(28,28,36,0.04)] backdrop-blur-sm"
        style={{ borderColor: 'var(--brand-border, #e2e4ea)' }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3.5 sm:px-6 md:grid-cols-[auto_1fr_auto] md:gap-6">
          <MiskCityLogo size="default" variant="onLight" className="min-w-0 justify-self-start" />
          <NavLinks items={items} onDark={false} />
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <LangSwitch onDark={false} />
            <CtaButton className="hidden md:inline-flex" />
            <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} onDark={false} />
          </div>
        </div>
        <MobileMenu items={items} open={menuOpen} onClose={() => setMenuOpen(false)} onDark={false} />
      </header>
    </div>
  );
};

export const Transparent = (props: NavigationHeaderProps): JSX.Element => {
  const { params, fields } = props;
  const { styles, RenderingIdentifier } = params;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = getNavItems(fields);
  const onDark = !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!params) return <NavigationHeaderDefaultComponent />;

  return (
    <div className={cn('component navigation-header', styles)} id={RenderingIdentifier}>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300',
          scrolled && 'border-b border-[#e2e4ea] bg-white/95 shadow-sm backdrop-blur-sm'
        )}
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3.5 sm:px-6 md:grid-cols-[auto_1fr_auto] md:gap-6">
          <MiskCityLogo
            size="default"
            variant={scrolled ? 'onLight' : 'onDark'}
            className="min-w-0 justify-self-start"
          />
          <NavLinks items={items} onDark={onDark} />
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <LangSwitch onDark={onDark} />
            <CtaButton onDark={onDark} className="hidden md:inline-flex" />
            <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} onDark={onDark} />
          </div>
        </div>
        <MobileMenu
          items={items}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onDark={!scrolled}
        />
      </header>
    </div>
  );
};

export const Minimal = (props: NavigationHeaderProps): JSX.Element => {
  const { params } = props;
  const { styles, RenderingIdentifier } = params;

  if (!params) return <NavigationHeaderDefaultComponent />;

  return (
    <div className={cn('component navigation-header', styles)} id={RenderingIdentifier}>
      <header className="w-full border-b border-[#e2e4ea] bg-white">
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-4 sm:px-6">
          <MiskCityLogo size="default" variant="onLight" />
        </div>
      </header>
    </div>
  );
};
