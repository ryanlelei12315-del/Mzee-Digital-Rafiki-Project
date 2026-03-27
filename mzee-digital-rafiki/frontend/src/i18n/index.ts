import { sw } from './sw';
import { en } from './en';

export const translations = {
    sw,
    en,
};

export type Language = 'sw' | 'en';

export function getTranslation(lang: Language) {
    return translations[lang];
}

// Helper function to replace placeholders in strings
export function interpolate(str: string, params: Record<string, string | number>): string {
    return str.replace(/\{(\w+)\}/g, (match, key) => {
        return params[key]?.toString() || match;
    });
}
