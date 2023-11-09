import { LoginResponse } from '../../services/api/response/login'

export const calculateExpiresAt = (expiresIn: LoginResponse['expiresIn']) =>
  new Date(new Date().getTime() + Number(expiresIn) * 1000).getTime()
