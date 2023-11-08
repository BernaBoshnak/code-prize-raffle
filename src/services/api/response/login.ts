export type LoginResponse = {
  displayName: string
  email: string
  expiresIn: string
  idToken: string
  kind: string
  localId: string
  refreshToken: string
  registered: boolean
}

export type RefreshTokenResponse = {
  expires_in: string
  token_type: string
  refresh_token: string
  id_token: string
  user_id: string
  project_id: string
}
