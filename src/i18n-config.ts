export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de', 'pl', 'fr', 'es', 'pt', 'ru', 'ja', 'ko', 'zh'],
} as const

export type Locale = (typeof i18n)['locales'][number]
