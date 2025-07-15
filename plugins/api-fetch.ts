export default defineNuxtPlugin(() =>
{
  const apiFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
  })

  // Expose to useNuxtApp().$apiFetch
  return {
    provide: {apiFetch}
  }
})
