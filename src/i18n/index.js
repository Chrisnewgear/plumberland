import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import es from './locales/es.json'
import en from './locales/en.json'

// Spanish is the default. We deliberately do NOT auto-detect the browser
// language — detection reads only from a persisted choice, otherwise falls
// back to Spanish. The navbar toggle writes the choice to localStorage.
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
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'lang',
    },
    interpolation: { escapeValue: false }, // React already escapes
  })

// Keep <html lang> and the document title in sync with the active language.
function syncDocumentLanguage(lng) {
  const lang = (lng || i18n.language || 'es').split('-')[0]
  document.documentElement.lang = lang
  document.title = i18n.t('meta.title')
}

syncDocumentLanguage(i18n.language)
i18n.on('languageChanged', syncDocumentLanguage)

export default i18n
