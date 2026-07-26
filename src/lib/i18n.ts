/**
 * i18n konfiguracija (brief §1: BHS na lansiranju, EN kasnije).
 * Dodavanje engleskog = dodati "en" u LOCALES i prevode u dictionaries.
 * URL struktura /bs/... i /en/... je time spremna od prvog dana.
 */
export const LOCALES = ["bs"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "bs";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
