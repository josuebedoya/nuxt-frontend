import {addImportsDir, createResolver, defineNuxtModule, extendPages} from '@nuxt/kit'

import pagesConfig from './config/pages'

export default defineNuxtModule({
  meta: {
    name: 'iuser'
  },
  async setup (_, nuxt)
  {
    //Imports
    const {resolve} = createResolver(import.meta.url)
    const runtimeDir = resolve('runtime')
    // Alias for the module
    nuxt.options.alias['#iuser'] = runtimeDir
    // Auto-imports
    addImportsDir(resolve(runtimeDir, 'composables'))
    addImportsDir(resolve(runtimeDir, 'stores'))
    // Components (optional)
    // addComponentsDir({path: resolve(runtimeDir, 'components') prefix:'Iuser', pathPrefix: false})
    // Plugins (optional)
    // addPlugin(resolve(runtimeDir, 'plugins/some.plugin.ts'))
    //Extend pages
    extendPages((pages) => pagesConfig.forEach(
      page => pages.push({...page, file: resolve(page.page)})
    ))
    // Add middleware
    nuxt.hook('app:resolve', (app) => {
      app.middleware.unshift({
        name: 'iauth',
        path: resolve(runtimeDir, 'middleware/iauth')
      })
    })
    //Extend i18n
    nuxt.hook('i18n:registerModule', register => register({
      langDir: resolve('./i18n'),
      locales: [
        {code: 'en', file: 'en.json'},
        {code: 'es', file: 'es.json'}
      ]
    }))
  }
})
