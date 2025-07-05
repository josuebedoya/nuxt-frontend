import {defineStore} from 'pinia'
import type {AuthUser, LoginResponse} from '#iuser/types/auth'

export const useIuserAuthStore = defineStore(
  'iuser-auth',
  () =>
  {
    const user = ref<AuthUser | null>(null)
    const token = ref<string | null>(null)
    const refreshToken = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)

    function setAuth (data: LoginResponse)
    {
      user.value = data.user
      token.value = data.token.accessToken
      refreshToken.value = data.token.refreshToken
    }

    function clearAuth ()
    {
      alert('You have been logged out.')
      user.value = null
      token.value = null
      refreshToken.value = null
    }

    async function login (email: string, password: string)
    {
      const response = await $fetch<{ data: LoginResponse }>('/api/iuser/v1/auth/login', {
        method: 'POST',
        body: {
          attributes: {email, password}
        }
      })

      setAuth(response.data)
    }

    async function logout ()
    {
      if (isAuthenticated.value) await $fetch('/api/iuser/v1/auth/logout', {method: 'POST'})
      clearAuth()
      navigateTo({name: 'iuser.auth-login'})
    }

    function hasPermission (key: string): boolean
    {
      return !!user.value?.permissions?.[key]
    }

    return {
      user,
      token,
      refreshToken,
      isAuthenticated,
      login,
      logout,
      hasPermission
    }
  },
  {
    persist: true
  })
