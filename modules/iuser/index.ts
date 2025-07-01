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
    //Resolve alias for the module
    nuxt.options.alias['#iuser'] = resolve(__dirname)
    nuxt.options.router.middleware.push('iauth.global')
    // add the need imports dirs
    addImportsDir(resolve('composable'))
    addImportsDir(resolve('stores'))

    //Extend pages
    extendPages((pages) => pagesConfig.forEach(
      page => pages.push({...page, file: resolve(page.page)})
    ))
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
