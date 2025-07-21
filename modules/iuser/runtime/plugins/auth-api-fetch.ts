export default defineNuxtPlugin(() =>
{
  const authApiFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
    async onRequest ({request, options})
    {
      const authStore = useIuserAuthStore()
      let accessToken = authStore.token?.accessToken
      // Normalize URL to string for checking
      const url = typeof request === 'string' ? request : request.toString()
      // token refresh
      if (!url.includes('/auth/refresh-token'))
      {
        const response = await authStore.refreshAccessTokenIfNeeded()
        if (response) accessToken = response.data.accessToken
      }
      // Add authorization header if token is available
      if (accessToken) options.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  })

  // Expose to useNuxtApp().$authApiFetch
  return {
    provide: {authApiFetch}
  }
})
