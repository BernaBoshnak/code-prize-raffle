import { mount, MountOptions, MountReturn } from 'cypress/react18'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'

declare global {
  namespace Cypress {
    interface Chainable {
      mountWithMemoryRouter(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps },
      ): Cypress.Chainable<MountReturn>
    }
  }
}

Cypress.Commands.add(
  'mountWithMemoryRouter',
  (
    component: React.ReactNode,
    options: { routerProps?: MemoryRouterProps } = {},
  ) => {
    const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options

    const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>

    return mount(wrapped, mountOptions)
  },
)
