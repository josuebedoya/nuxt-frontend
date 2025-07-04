// modules/iuser/middleware/auth.global.ts

export default defineNuxtRouteMiddleware((to) =>
{
  const auth = useAuthStore()
  // You decide which pages require auth by setting meta.auth = true
  if (!auth.isAuthenticated)
  {
    const localePath = useLocalePath()
    return navigateTo({
      path: localePath('iuser.login'),
      query: {
        redirectTo: to.fullPath
      },
    })
  }
})
