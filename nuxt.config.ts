// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
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
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    lazy: true,
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        file: 'en.js', 
        name: 'English'
      },
      {
        code: 'es',
        file: 'es.js', 
        name: 'Español'
      },      
    ],
  },

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
  },

  app: {
    head: {
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' 
        }
      ]
    }
  },
})
