import { db } from '@services/api/firebase-config'
import { Prize, PrizeId } from '@services/api/response/prize'
import { LocalId } from '@services/api/response/register'
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDocs,
  serverTimestamp,
} from '@services/firebase/firestore'

type UserPrize = {
  user_id: LocalId
  prize_id: PrizeId
}

export const setUserPrizes = async (data: UserPrize) => {
  const prizeDocRef = doc(db, 'prizes', data.prize_id)
  const userDocRef = doc(db, 'users', data.user_id)
  const userSubcollectionRef = collection(prizeDocRef, 'user_prizes')

  return await addDoc(userSubcollectionRef, {
    user_id: userDocRef,
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
