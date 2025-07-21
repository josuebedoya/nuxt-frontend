import {addImportsDir, createResolver, defineNuxtModule, extendPages, addPlugin} from '@nuxt/kit'

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
    addImportsDir(resolve(runtimeDir, 'utils'))
    // Plugins
    addPlugin({
      src: resolve(runtimeDir, 'plugins/auth-api-fetch'),
      mode: 'all',
      order: -10
    })
    addPlugin(resolve(runtimeDir, 'plugins/fetch-user.client'))
    // Components (optional)
    // addComponentsDir({path: resolve(runtimeDir, 'components') prefix:'Iuser', pathPrefix: false})
    //Extend pages
    extendPages((pages) => pagesConfig.forEach(
      page => pages.push({...page, file: resolve(page.page)})
    ))
    // Add middleware
    nuxt.hook('app:resolve', (app) =>
    {
      app.middleware.unshift({
        name: 'iuser-auth-can',
        path: resolve(runtimeDir, 'middleware/auth-can.global'),
        global: true
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
