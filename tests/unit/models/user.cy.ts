import { db } from '@services/api/firebase-config'
import { LocalId } from '@services/api/response/register'
import { GetUserDataResponse } from '@services/api/response/user'
import * as firestore from '@services/firebase/firestore'
import { createUser, getUser } from '@services/models/user'

describe('user model', () => {
  it('should create a new user document successfully', async () => {
    const localId = 'abc' as LocalId
    const userData = {} as GetUserDataResponse
    const userCollection = { key: 'value' }
    const setDocResult = { fakeResult: true }

    cy.stub(firestore, 'doc')
      .withArgs(db, 'users', localId)
      .returns(userCollection)
    cy.stub(firestore, 'setDoc')
      .withArgs(userCollection, userData)
      .as('setDoc')
      .resolves(setDocResult)

    const docRef = await createUser(localId, userData)
    expect(docRef).to.equal(setDocResult)
  })

  it('should retrieve user data successfully', async () => {
    const localId = 'abc' as LocalId
    const userData = {} as GetUserDataResponse
    const userCollection = { key: 'value' }
    const userDoc = { data: cy.stub().returns(userData) }

    cy.stub(firestore, 'doc')
      .withArgs(db, 'users', localId)
      .returns(userCollection)
    cy.stub(firestore, 'getDoc')
      .withArgs(userCollection)
      .as('getDoc')
      .resolves(userDoc)

    const data = await getUser(localId)
    expect(data).to.equal(userData)
  })
})
