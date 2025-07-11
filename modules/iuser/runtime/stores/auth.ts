import {defineStore} from 'pinia'
import type {AuthToken, AuthUser, LoginResponse} from '#iuser/types/auth'

export const useIuserAuthStore = defineStore(
  'iuser-auth',
  () =>
  {
    const user = ref<AuthUser | null>(null)
    const token = ref<AuthToken | null>(null)

    // Computed property to check if the user is authenticated
    const isAuthenticated = computed(() => !!token.value)

    function setUserdata (data: AuthUser)
    {
      user.value = data
    }

    function setToken (data: AuthToken)
    {
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
      const response = await $fetch<{ data: AuthUser }>('/api/iuser/v1/auth/me', {
        method: 'GET'
      })
      setUserdata(response.data)
    }

    async function login (email: string, password: string)
    {
      const response = await $fetch<{ data: LoginResponse }>('/api/iuser/v1/auth/login', {
        method: 'POST',
        body: {attributes: {email, password}}
      })
      setUserdata(response.data.user)
      setToken(response.data.token)
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
      isAuthenticated,
      login,
      logout,
      hasPermission,
      fetchUser
    }
  },
  {
    persist: [
      {pick: ['token']}
    ]
  })
