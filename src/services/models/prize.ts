import { collection, getDocs } from 'firebase/firestore'
import { db } from '@services/api/firebase-config'
import { Prize, PrizeId } from '@services/api/response/prize'

export const getPrizes = async () => {
  const prizesCollection = collection(db, 'prizes')
  const prizesDocs = await getDocs(prizesCollection)

  return prizesDocs.docs.reduce<Record<PrizeId, Prize>>((acc, currentDoc) => {
    acc[currentDoc.id as PrizeId] = currentDoc.data() as Prize
    return acc
  }, {})
}
