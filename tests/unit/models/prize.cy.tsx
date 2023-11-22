import * as firestore from 'firebase/firestore'
import { db } from '@services/api/firebase-config'
import { getPrizes } from '@services/models/prize'

describe('prizes model', () => {
  describe('get prizes', () => {
    it('should return prizes collection', async () => {
      const doc = { key: 'value' }
      const key = 'fakeKey'
      const resolvedValue = { [key]: doc }
      const collectionResult = { key: 'value' }

      cy.stub(firestore, 'collection')
        .as('collection')
        .returns(collectionResult)
      cy.stub(firestore, 'getDocs')
        .as('getDocs')
        .resolves({ docs: [{ id: key, data: cy.stub().returns(doc) }] })

      const collection = await getPrizes()

      cy.get('@collection').should('be.calledOnceWith', db, 'prizes')
      cy.get('@getDocs').should('be.calledOnceWith', collectionResult)

      expect(collection).to.deep.equal(resolvedValue)
    })
  })
})
