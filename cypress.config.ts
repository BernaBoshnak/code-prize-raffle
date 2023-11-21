import { defineConfig } from 'cypress'
import { mergeConfig } from 'vite'
import { CypressEsm } from '@cypress/vite-plugin-cypress-esm'
import viteConfig from './vite.config'

export default defineConfig({
  video: false,
  component: {
    specPattern: './tests/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: mergeConfig(viteConfig, {
        plugins: [CypressEsm()],
        mode: 'test',
        server: {
          host: 'localhost',
          port: 4000,
        },
      }),
    },
  },
})
