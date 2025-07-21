// types/auth.ts
export interface AuthUser {
  id: number
  email: string
  emailVerifiedAt: string | null
  permissions: Record<string, boolean>
  lastLogin: string | null
  firstName: string
  lastName: string
  isGuest: boolean | 0 | 1
  createdAt: string
  updatedAt: string
}

export interface AuthToken {
  tokenType: string
  expiresIn: number
  expiresAt: number
  accessToken: string
  refreshToken: string
}

export interface LoginResponse {
  user: AuthUser
  token: AuthToken
}
