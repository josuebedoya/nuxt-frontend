// runtime/plugins/api-fetch.ts
import type {FetchOptions} from 'ofetch'
import type {NitroFetchRequest} from 'nitropack'
import type {AsyncDataRequestStatus} from 'nuxt/app'
//import {useIuserAuthStore} from '../stores/auth'
export default defineNuxtPlugin(() =>
{
  // Save original fetch
  const originalFetch = $fetch

  // Patch global $fetch
  $fetch = async function <T> (
    request: NitroFetchRequest,
    options: FetchOptions<T> = {}
  ): Promise<T>
  {
    const authStore = useIuserAuthStore()

    try
    {
      await authStore.refreshAccessTokenIfNeeded()
      // Merge Authorization header
      options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${authStore.token?.accessToken ?? 'no-bearer'}`
      }
    } catch (err)
    {
      console.error('[auth] Token refresh failed', err)
    }
console.warn(">>>>", options.headers)
    return originalFetch<T>(request, options)
  }

  // Also patch $fetch on NuxtApp (for typed composition)
  return {
    provide: {
      fetch: $fetch
    }
  }
})
