// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    //Custom
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: ''// can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
  colorMode:{
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },
  css: [
    //keep this order
    '~/assets/css/libraries.css',
    '~/assets/css/main.css',
  ],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    langDir: 'locales',
    locales: []
  },
  vite: {
    plugins: [tailwindcss()]
  },
})
