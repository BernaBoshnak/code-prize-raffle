import { RegisterResponse } from '@services/api/response/register'

export interface LoginResponse extends RegisterResponse {
  displayName: string
  kind: string
  registered: boolean
}

export interface RefreshTokenResponse {
  expires_in: string
  token_type: string
  refresh_token: string
  id_token: string
  user_id: string
  project_id: string
}
