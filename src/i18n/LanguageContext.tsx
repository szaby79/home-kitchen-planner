import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'hu' | 'en';

type LanguageContextValue = {
  language: Language;
  isEnglish: boolean;
  setLanguage: (language: Language) => void;
  tr: (hungarian: string, english: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_KEY = 'plan-pan-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'hu');

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    isEnglish: language === 'en',
    setLanguage,
    tr: (hungarian, english) => language === 'en' ? english : hungarian,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
