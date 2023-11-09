import 'server-only'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('./locales/content/en.json').then((module) => module.default),
  de: () => import('./locales/content/de.json').then((module) => module.default),
  pl: () => import('./locales/content/pl.json').then((module) => module.default),
  fr: () => import('./locales/content/fr.json').then((module) => module.default),
  es: () => import('./locales/content/es.json').then((module) => module.default),
  pt: () => import('./locales/content/pt.json').then((module) => module.default),
  ru: () => import('./locales/content/ru.json').then((module) => module.default),
  ja: () => import('./locales/content/ja.json').then((module) => module.default),
  ko: () => import('./locales/content/ko.json').then((module) => module.default),
  zh: () => import('./locales/content/zh.json').then((module) => module.default),
}

const metadata = {
  en: () => import('./locales/metadata/en.json').then((module) => module.default),
  de: () => import('./locales/metadata/de.json').then((module) => module.default),
  pl: () => import('./locales/metadata/pl.json').then((module) => module.default),
  fr: () => import('./locales/metadata/fr.json').then((module) => module.default),
  es: () => import('./locales/metadata/es.json').then((module) => module.default),
  pt: () => import('./locales/metadata/pt.json').then((module) => module.default),
  ru: () => import('./locales/metadata/ru.json').then((module) => module.default),
  ja: () => import('./locales/metadata/ja.json').then((module) => module.default),
  ko: () => import('./locales/metadata/ko.json').then((module) => module.default),
  zh: () => import('./locales/metadata/zh.json').then((module) => module.default),
}

export const getLocales = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en()

export const getMetadataLocales = async (locale: Locale) =>
  metadata[locale]?.() ?? metadata.en()
  