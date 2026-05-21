'use client';

import React, { JSX, useState, useEffect, useRef } from 'react';
import { Field, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

interface NavTabItem {
  id: string;
  tabLabel?: { jsonValue?: Field<string> };
  anchorId?: { jsonValue?: Field<string> };
}

interface CarModelNavTabsDatasource {
  children?: { results: NavTabItem[] };
}

type CarModelNavTabsProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: CarModelNavTabsDatasource;
    };
  };
};

const CarModelNavTabsDefaultComponent = (): JSX.Element => (
  <div className="component car-model-nav-tabs">
    <span className="is-empty-hint">Car Model Nav Tabs</span>
  </div>
);

export const Default = ({ fields, params, page }: CarModelNavTabsProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  const tabs = datasource?.children?.results || [];

  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setIsSticky(navRef.current.getBoundingClientRect().top <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (idx: number, anchorId?: string) => {
    setActiveTab(idx);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!datasource) return <CarModelNavTabsDefaultComponent />;

  return (
    <div
      ref={navRef}
      className={cn(
        'component car-model-nav-tabs sticky top-0 z-40 w-full transition-shadow',
        isSticky ? 'shadow-lg' : '',
        styles
      )}
      id={RenderingIdentifier}
      style={{ backgroundColor: 'var(--brand-dark, #111111)' }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="flex items-center gap-0 overflow-x-auto scrollbar-none rtl:flex-row-reverse"
          role="tablist"
          aria-label="Car model sections"
        >
          {tabs.map((tab, idx) => {
            const label = tab.tabLabel?.jsonValue?.value || `Tab ${idx + 1}`;
            const anchor = tab.anchorId?.jsonValue?.value || '';
            const isActive = idx === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabClick(idx, anchor)}
                className={cn(
                  'shrink-0 border-b-2 px-5 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors',
                  isActive ? 'border-[var(--brand-accent,#c8102e)] text-white' : 'border-transparent text-white/50 hover:text-white/80'
                )}
              >
                {isEditing ? (
                  <Text field={tab.tabLabel?.jsonValue} tag="span" />
                ) : (
                  label
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const JetourUAE = Default;
