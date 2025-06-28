// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    lazy: true,
    langDir: 'locales',
    locales: []
  },
})
