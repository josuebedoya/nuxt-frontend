// types/auth.ts
export interface AuthUser {
  id: number
  email: string
  email_verified_at: string | null
  permissions: string[] // or a more specific type if you define it
  last_login: string | null
  first_name: string
  last_name: string
  is_guest: boolean | 0 | 1
  created_at: string
  updated_at: string
}

export interface AuthToken {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export interface LoginResponse {
  user: AuthUser
  token: AuthToken
}
