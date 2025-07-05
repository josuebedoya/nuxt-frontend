const layout = 'blank'
const pages = [
  {
    name: 'iuser.auth-login',
    path: '/auth/login',
    page: 'runtime/pages/auth/auth-login.vue',
    meta: {layout},
  },
  {
    name: 'iuser.no-access',
    path: '/auth/no-access',
    page: 'runtime/pages/auth/no-access.vue',
    meta: {layout},
  }
]

export default pages
