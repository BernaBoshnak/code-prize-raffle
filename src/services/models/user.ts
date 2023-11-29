import { db } from '@services/api/firebase-config'
import { LoginResponse } from '@services/api/response/login'
import { RegisterResponse } from '@services/api/response/register'
import { GetUserDataResponse } from '@services/api/response/user'
import { doc, setDoc, getDoc } from '@services/firebase/firestore'

export const getUser = async (localId: LoginResponse['localId']) => {
  const ref = doc(db, 'users', localId)
  const userDoc = await getDoc(ref)

  const userData = userDoc.data()
  return userData
}

export const createUser = async (
  localId: RegisterResponse['localId'],
  props: GetUserDataResponse,
) => {
  const userCollection = doc(db, 'users', localId)
  const docRef = await setDoc(userCollection, props)

  return docRef
}
