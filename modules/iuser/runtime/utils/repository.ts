import type {AuthUser, LoginResponse, AuthToken} from "#iuser/types/auth";

const baseUrl = '/iuser/v1'

export const iuserAuthRepository = {
  async login (email: string, password: string): Promise<{ data: LoginResponse }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: LoginResponse }>(`${baseUrl}/auth/login`, {
      method: 'POST',
      body: {attributes: {email, password}}
    })
  },
  async logout (): Promise<void>
  {
    const {$authApiFetch} = useNuxtApp()
    return $authApiFetch(`${baseUrl}/auth/logout`, {method: 'POST'})
  },
  async me (): Promise<{ data: AuthUser }>
  {
    const {$authApiFetch} = useNuxtApp()
    return $authApiFetch<{ data: AuthUser }>(`${baseUrl}/auth/me`, {method: 'GET'})
  },
  async refreshToken (token: string): Promise<{ data: AuthToken }>
  {
    const {$authApiFetch} = useNuxtApp()

    return $authApiFetch<{ data: AuthToken }>(
      `${baseUrl}/auth/refresh-token`, {
        method: 'POST',
        body: {attributes: {token}}
      })
  }
}
