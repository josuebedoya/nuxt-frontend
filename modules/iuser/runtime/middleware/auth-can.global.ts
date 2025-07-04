// modules/iuser/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  const localePath = useLocalePath()

  const requiresAuth = to.meta.auth === true
  const isLoginPage = to.name?.toString().startsWith('iuser.login')

  if (!auth.isAuthenticated && requiresAuth) {
    return navigateTo({
      path: localePath('iuser.login'),
      query: { redirectTo: to.fullPath }
    })
  }

  if (auth.isAuthenticated && isLoginPage) {
    // If the user is already logged in and goes to the login page, redirect to home
    return navigateTo(localePath('/'))
  }
})
