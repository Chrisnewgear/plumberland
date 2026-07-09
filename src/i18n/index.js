import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import es from './locales/es.json'
import en from './locales/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    // Only match the base language (es-MX -> es) and remember the choice.
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already escapes.
    },
  })

// Keep the <html lang> attribute in sync so screen readers and search engines
// see the active language.
const applyHtmlLang = (lng) => {
  document.documentElement.lang = lng
}
applyHtmlLang(i18n.resolvedLanguage)
i18n.on('languageChanged', applyHtmlLang)

export default i18n
