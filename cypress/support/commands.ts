import '@testing-library/cypress/add-commands'
import './commands/mountWithBrowserRouter'

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'localStorageSetItem',
  (...args: Parameters<typeof localStorage.setItem>) => {
    return cy.window().then((win) => win.localStorage.setItem(...args))
  },
)

Cypress.Commands.add(
  'localStorageGetItem',
  <T>(...args: Parameters<typeof localStorage.getItem>) => {
    return cy.window().then((win) => {
      const value = win.localStorage.getItem(...args)
      let parsedValue = null

      if (value != null) {
        try {
          parsedValue = JSON.parse(value) as T
        } catch (e) {
          parsedValue = value
        }
      }

      return cy.wrap(parsedValue)
    })
  },
)

declare global {
  namespace Cypress {
    interface Chainable {
      localStorageSetItem(
        ...args: Parameters<typeof localStorage.setItem>
      ): Chainable<Cypress.AUTWindow>
      localStorageGetItem<T>(
        ...args: Parameters<typeof localStorage.getItem>
      ): Cypress.Chainable<T | null>
    }
  }
}

export {}
