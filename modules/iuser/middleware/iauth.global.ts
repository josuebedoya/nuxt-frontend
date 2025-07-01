// modules/iuser/middleware/auth.global.ts

export default defineNuxtRouteMiddleware((to) =>
{
  const auth = useAuthStore()

  // You decide which pages require auth by setting meta.auth = true
  if (!auth.isAuthenticated)
  {
    return navigateTo({name: 'iuser.login'})
  }
})
