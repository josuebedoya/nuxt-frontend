export default defineNuxtPlugin(() =>
{
  const authApiFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
    async onRequest ({request, options})
    {
      const authStore = useIuserAuthStore()
      // Normalize URL to string for checking
      const url = typeof request === 'string' ? request : request.toString()
      // token refresh
      if (!url.includes('/auth/refresh-token')) await authStore.refreshAccessTokenIfNeeded()
      // Add authorization header if token is available eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9
      if (authStore.token?.accessToken)
      {
        options.headers.set('Authorization', `Bearer ${authStore.token.accessToken}`)
      }
    }
  })

  // Expose to useNuxtApp().$authApiFetch
  return {
    provide: {authApiFetch}
  }
})
