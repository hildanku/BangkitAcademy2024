import { createContext, useEffect, useState } from 'react';
import { strings } from '../lib/language';

type Language = 'id' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (id: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        return (localStorage.getItem('language') as Language) || 'id';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'id' ? 'en' : 'id'));
    };

    const t = (id: string) => strings[language][id as keyof typeof strings['id']] || id;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}
