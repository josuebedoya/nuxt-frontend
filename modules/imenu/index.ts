import {createResolver, defineNuxtModule} from '@nuxt/kit'
//import pagesConfig from './config/pages'

export default defineNuxtModule({
  meta: {
    name: 'imenu'
  },
  async setup (_, nuxt)
  {
    //Imports
    const {resolve} = createResolver(import.meta.url)
    const runtimeDir = resolve('runtime')
    // Alias for the module
    nuxt.options.alias['#imenu'] = runtimeDir
    // Auto-imports
    //addImportsDir(resolve(runtimeDir, 'composables'))
    //addImportsDir(resolve(runtimeDir, 'stores'))
    //addImportsDir(resolve(runtimeDir, 'utils'))
    // Plugins
    //addPlugin(resolve(runtimeDir, 'plugins/fetch-user.client'))
    // Components (optional)
    // addComponentsDir({path: resolve(runtimeDir, 'components') prefix:'Iuser', pathPrefix: false})
    //Extend pages
    //extendPages((pages) => pagesConfig.forEach(
    //  page => pages.push({...page, file: resolve(page.page)})
    //))
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
