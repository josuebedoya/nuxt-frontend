import {defineStore} from 'pinia'
import type {AuthUser, LoginResponse} from '#iuser/types/auth'

export const useAuthStore = defineStore('auth', () =>
  {
    const user = ref<AuthUser | null>(null)
    const token = ref<string | null>(null)
    const refreshToken = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)

    function setAuth (data: LoginResponse)
    {
      user.value = data.user
      token.value = data.token.access_token
      refreshToken.value = data.token.refresh_token
    }

    function clearAuth ()
    {
      user.value = null
      token.value = null
      refreshToken.value = null
    }

    async function login (email: string, password: string)
    {
      const {data, error} = await useFetch<{ data: LoginResponse }>('/api/iuser/v1/auth/login', {
        method: 'POST',
        body: {attributes: {email, password}}
      })

      if (error.value) throw createError(error.value)
      if (data.value) setAuth(data.value.data)
    }

    async function logout ()
    {
      await useFetch('/api/iuser/v1/auth/logout', {method: 'POST'})
      clearAuth()
    }

    return {
      user,
      token,
      refreshToken,
      isAuthenticated,
      login,
      logout
    }
  },
  {
    persist: true
  })
