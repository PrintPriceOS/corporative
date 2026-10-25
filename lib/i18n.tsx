'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { es } from './translations/es';
import { en } from './translations/en';
import { de } from './translations/de';

export type Locale = 'es' | 'en' | 'de';

export interface Translations {
  nav: {
    products: string;
    priceIt: string;
    priceItDesc: string;
    fixIt: string;
    fixItDesc: string;
    printIt: string;
    printItDesc: string;
    mockup: string;
    mockupDesc: string;
    controlPlane: string;
    controlPlaneDesc: string;
    forWhom: string;
    authors: string;
    authorsDesc: string;
    publishers: string;
    publishersDesc: string;
    printhouses: string;
    printhousesDesc: string;
    suppliers: string;
    suppliersDesc: string;
    howItWorks: string;
    comparisons: string;
    resources: string;
    docs: string;
    docsDesc: string;
    developers: string;
    developersDesc: string;
    paperHub: string;
    paperHubDesc: string;
    contact: string;
    login: string;
    start: string;
  };
  home: {
    heroLabel: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    heroCheck1: string;
    heroCheck2: string;
    heroCheck3: string;
    stakeholdersHeading: string;
    stakeholdersSubtitle: string;
    authorsTitle: string;
    authorsTagline: string;
    authorsDesc: string;
    authorsBadge: string;
    authorsCta: string;
    publishersTitle: string;
    publishersTagline: string;
    publishersDesc: string;
    publishersBadge: string;
    publishersCta: string;
    printhousesTitle: string;
    printhousesTagline: string;
    printhousesDesc: string;
    printhousesBadge: string;
    printhousesCta: string;
    suppliersTitle: string;
    suppliersTagline: string;
    suppliersDesc: string;
    suppliersBadge: string;
    suppliersCta: string;
    howHeading: string;
    howSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    productsHeading: string;
    productsSubtitle: string;
    capsHeading: string;
    capsSubtitle: string;
    compHeading: string;
    compSubtitle: string;
    tabAuthors: string;
    tabPrinters: string;
    tabPriceIt: string;
    tabFixIt: string;
    tabPrintIt: string;
    compFeature: string;
    compScope: string;
    compTraditional: string;
    productsPill: string;
    stakeholdersPill: string;
    workflowPill: string;
    comparisonsPill: string;
    transparencyPill: string;
    complementaryBadge: string;
    visualizeStep: string;
    scrollHint: string;
    faqHeading: string;
    faqSubtitle: string;
    ctaCloseHeading: string;
    ctaCloseSubtitle: string;
    ctaClosePrimary: string;
    ctaCloseSecondary: string;
  };
  authorsPage: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badgeNote: string;
    howHeading: string;
    howSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    toolsHeading: string;
    toolsSubtitle: string;
    tool1Title: string;
    tool1Desc: string;
    tool2Title: string;
    tool2Desc: string;
    tool3Title: string;
    tool3Desc: string;
    faqHeading: string;
    finalCtaHeading: string;
    finalCtaSub: string;
    finalCtaBtn: string;
  };
  publishersPage: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badgeNote: string;
    howHeading: string;
    howSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    toolsHeading: string;
    toolsSubtitle: string;
    tool1Title: string;
    tool1Desc: string;
    tool2Title: string;
    tool2Desc: string;
    tool3Title: string;
    tool3Desc: string;
    faqHeading: string;
    finalCtaHeading: string;
    finalCtaSub: string;
    finalCtaBtn: string;
  };
  printhousesPage: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badgeNote: string;
    howHeading: string;
    howSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    toolsHeading: string;
    toolsSubtitle: string;
    tool1Title: string;
    tool1Desc: string;
    tool2Title: string;
    tool2Desc: string;
    tool3Title: string;
    tool3Desc: string;
    faqHeading: string;
    finalCtaHeading: string;
    finalCtaSub: string;
    finalCtaBtn: string;
  };
  suppliersPage: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badgeNote: string;
    howHeading: string;
    howSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    toolsHeading: string;
    toolsSubtitle: string;
    tool1Title: string;
    tool1Desc: string;
    tool2Title: string;
    tool2Desc: string;
    tool3Title: string;
    tool3Desc: string;
    faqHeading: string;
    finalCtaHeading: string;
    finalCtaSub: string;
    finalCtaBtn: string;
  };
  modals: {
    loginTitle: string;
    loginSub: string;
    loginBudgetTitle: string;
    loginBudgetDesc: string;
    loginControlTitle: string;
    loginControlDesc: string;
    loginNote: string;
    startTitle: string;
    startSub: string;
    startAuthorTitle: string;
    startAuthorDesc: string;
    startPublisherTitle: string;
    startPublisherDesc: string;
    startPrinterTitle: string;
    startPrinterDesc: string;
    startSupplierTitle: string;
    startSupplierDesc: string;
    close: string;
  };
  footer: {
    brandDesc: string;
    slogan: string;
    forWhom: string;
    tools: string;
    resources: string;
    companyLegal: string;
    legalCenter: string;
    partnerTerms: string;
    rights: string;
    cookies: string;
    priceItLabel: string;
    fixItLabel: string;
    printItLabel: string;
    mockupLabel: string;
    controlPlaneLabel: string;
    termsOfService: string;
    privacyPolicy: string;
    legalNotice: string;
    followX: string;
    connectLinkedIn: string;
    facebookPage: string;
  };
}

const dictionaries: Record<Locale, Translations> = { es, en, de };

const LOCALE_STORAGE_KEY = 'ppp_locale';

export const getStoredLocale = (): Locale => {
  if (typeof window === 'undefined') return 'es';
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'es' || saved === 'en' || saved === 'de') {
      return saved;
    }
  } catch (e) {}
  return 'es';
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: Translations;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    const initial = getStoredLocale();
    setLocaleState(initial);
    document.documentElement.lang = initial;

    const onLocaleChange = (e: CustomEvent<Locale>) => {
      if (e.detail && e.detail !== locale) {
        setLocaleState(e.detail);
      }
    };
    window.addEventListener('ppp-locale-change', onLocaleChange as EventListener);
    return () => window.removeEventListener('ppp-locale-change', onLocaleChange as EventListener);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
        document.documentElement.lang = newLocale;
        window.dispatchEvent(new CustomEvent('ppp-locale-change', { detail: newLocale }));
      } catch (e) {}
    }
  };

  const dict = useMemo(() => dictionaries[locale] || dictionaries.es, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextValue => {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Safe SSR fallback
    return {
      locale: 'es',
      setLocale: () => {},
      dict: dictionaries.es,
    };
  }
  return ctx;
};
