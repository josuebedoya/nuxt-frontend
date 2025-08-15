import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'es-ES',
  title: 'Nuxt Frontend Docs',
  description: 'Documentación de componentes',
  locales: {
    root: {
      label: 'Español',
      lang: 'es-ES',
      link: '/es/',
      themeConfig: {
        outline: {
          label: 'En esta página'
        },
        returnToTopLabel: 'Volver arriba',
        darkModeSwitchLabel: 'Modo oscuro',
        sidebarMenuLabel: 'Menú de navegación',
        docFooter: {
          prev: 'Página anterior',
          next: 'Página siguiente'
        },
        lastUpdatedText: 'Última actualización',
        search: {
          provider: 'local',
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/'
    }
  },

  themeConfig: {
    nav: [
      { text: 'ES', link: '/es/' },
      { text: 'EN', link: '/en/' }
    ],
    sidebar: {
      '/es/': [
        {
          text: 'Componentes',
          items: [
            { text: 'IMedia', link: '/es/components/IMedia' }
          ]
        }
      ],
      '/en/': [
        {
          text: 'Components',
          items: [
            { text: 'IMedia', link: '/en/components/IMedia' }
          ]
        }
      ]
    }
  }
})