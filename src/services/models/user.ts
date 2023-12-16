import { TokenData } from '@components/store/AuthContext'
import { postJson } from '@services/api/fetch'
import { db } from '@services/api/firebase-config'
import { LoginResponse } from '@services/api/response/login'
import { LocalId, RegisterResponse } from '@services/api/response/register'
import { GetUserDataResponse } from '@services/api/response/user'
import { doc, setDoc, getDoc, deleteDoc } from '@services/firebase/firestore'

export const getUser = async (localId: LoginResponse['localId']) => {
  const ref = doc(db, 'users', localId)
  const userDoc = await getDoc(ref)

  const userData = userDoc.data()
  return userData
}

export const createUser = async (
  localId: RegisterResponse['localId'],
  data: GetUserDataResponse,
) => {
  const userCollection = doc(db, 'users', localId)
  const docRef = await setDoc(userCollection, data)

  return docRef
}

export const deleteUser = async (
  localId: LocalId,
  idToken: TokenData['idToken'],
  controller?: AbortController,
) => {
  const api = import.meta.env.VITE_REACT_APP_FIREBASE_API_ENDPOINT
  const key = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
  const url = `${api}:delete?key=${key}`

  await postJson<LoginResponse>(url, {
    body: {
      idToken,
    },
    signal: controller?.signal,
  })
  await deleteDoc(doc(db, 'users', localId))
}
