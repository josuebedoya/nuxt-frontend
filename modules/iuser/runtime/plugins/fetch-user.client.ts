// plugins/fetch-user.client.ts
export default defineNuxtPlugin(async (nuxtApp) =>
{
  const authStore = useIuserAuthStore()
  if (authStore.isAuthenticated) await authStore.fetchUser()
})
