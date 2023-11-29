import { Brand } from 'src/utils/types'

export type LocalId = Brand<string, 'LocalId'>

export interface RegisterResponse {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: LocalId
}
