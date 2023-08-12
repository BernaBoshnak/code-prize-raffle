import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    specPattern: './tests/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
