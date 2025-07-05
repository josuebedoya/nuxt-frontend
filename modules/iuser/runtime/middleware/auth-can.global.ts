// modules/iuser/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useIuserAuthStore()
  const localePath = useLocalePath()

  const requiresAuth = to.meta.auth === true
  const requiredPermission = to.meta.permission as string | undefined
  const isLoginPage = to.name?.toString().startsWith('iuser.auth-login')

  // Redirect to the login if auth required and not authenticated
  if (!auth.isAuthenticated && requiresAuth) {
    return navigateTo({
      path: localePath('iuser.auth-login'),
      query: { redirectTo: to.fullPath }
    })
  }

  // Redirect authenticated users away from login page
  if (auth.isAuthenticated && isLoginPage) {
    return navigateTo(localePath('/'))
  }

  // Check permission if required
  if (requiredPermission && !auth.hasPermission(requiredPermission)) {
    return navigateTo(localePath('iuser.no-access')) // or a 403 page
  }
})
