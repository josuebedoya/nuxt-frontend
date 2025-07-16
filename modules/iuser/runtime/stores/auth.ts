import {defineStore} from 'pinia'
import type {AuthToken, AuthUser} from '#iuser/types/auth'
import {iuserAuthRepository} from "#iuser/utils/repository";

export const useIuserAuthStore = defineStore(
  'iuser-auth',
  () =>
  {
    const user = ref<AuthUser | null>(null)
    const token = ref<AuthToken | null>(null)
    const refreshingPromise = ref<Promise<{ data: AuthToken }> | null>(null)
    // Computed property to check if the user is authenticated
    const isAuthenticated = computed(() => !!token.value)

    function setUserdata (data: AuthUser)
    {
      user.value = data
    }

    function setToken (data: AuthToken)
    {
      const now = Date.now(); // in milliseconds
      data.expiresAt = now + data.expiresIn * 1000; // future time in ms
      token.value = data
    }

    function clearAuth ()
    {
      alert('You have been logged out.')
      user.value = null
      token.value = null
    }

    async function fetchUser ()
    {
      const {data} = await iuserAuthRepository.me()
      setUserdata(data)
    }

    async function login (email: string, password: string)
    {
      const {data} = await iuserAuthRepository.login(email, password)
      setUserdata(data.user)
      setToken(data.token)
    }

    async function logout ()
    {
      if (isAuthenticated.value) await iuserAuthRepository.logout()
      clearAuth()
      navigateTo({name: 'iuser.auth-login'})
    }

    function hasPermission (key: string): boolean
    {
      return !!user.value?.permissions?.[key]
    }

    async function refreshAccessTokenIfNeeded (): Promise<{ data: AuthToken } | undefined>
    {
      const now = Date.now()
      const buffer = 60000 // refresh if < 1 min to expiry

      if (!token.value || !token.value?.refreshToken || !token.value.expiresAt) return
      if (token.value.expiresAt - now > buffer) return // still valid
      if (refreshingPromise.value) return refreshingPromise.value // If refresh already in progress, await it

      // Start new refresh
      refreshingPromise.value = iuserAuthRepository.refreshToken(token.value.refreshToken);
      const response = await refreshingPromise.value
      setToken(response.data)
      refreshingPromise.value = null
      return response
    }

    return {
      user,
      token,
      isAuthenticated,
      login,
      logout,
      hasPermission,
      fetchUser,
      refreshAccessTokenIfNeeded
    }
  },
  {
    persist: [
      {pick: ['token']}
    ]
  })
