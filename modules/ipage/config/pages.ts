const layout = 'blank'
const pages = [
  {
    name: 'ipage.dynamic',
    path: '/:slug',
    page: 'runtime/pages/[page-slug].vue',
    meta: {layout},
  }
]

export default pages
