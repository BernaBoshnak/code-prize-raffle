import { TokenData } from '@components/store/AuthContext'
import { db } from '@services/api/firebase-config'
import { Prize, PrizeId } from '@services/api/response/prize'
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDocs,
  serverTimestamp,
} from '@services/firebase/firestore'

type UserPrize = {
  user_id: TokenData['localId']
  prize_id: string
}

export const setUserPrizes = async (data: UserPrize) => {
  const prizeDocRef = doc(db, 'prizes', data.prize_id)
  const userSubcollectionRef = collection(prizeDocRef, 'user_prizes')

  return await addDoc(userSubcollectionRef, {
    user_id: data.user_id,
    created_at: serverTimestamp(),
  })
}

export const getPrizes = async () => {
  const prizesCollection = collection(db, 'prizes')
  const prizesDocs = await getDocs(prizesCollection)

  return prizesDocs.docs.reduce<Record<PrizeId, Prize>>((acc, currentDoc) => {
    acc[currentDoc.id as PrizeId] = currentDoc.data() as Prize
    return acc
  }, {})
}

export const getPrizesWithUsersCount = async () => {
  const prizes = await getPrizes()
  const userPrizesRef = collectionGroup(db, 'user_prizes')
  const userPrizes = await getDocs(userPrizesRef)

  for (const prizeId in prizes) {
    prizes[prizeId as PrizeId].assigned_users_count = 0
  }

  userPrizes.docs.forEach((doc) => {
    const prizeId = doc.ref.parent.parent?.id as PrizeId | undefined
    if (prizeId && prizeId in prizes) {
      prizes[prizeId].assigned_users_count++
    }
  })

  return prizes
}
