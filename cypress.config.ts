import { defineConfig } from 'cypress'
import { defineConfig as viteDefineConfig } from 'vite'
import { moduleAliases } from './vite.config'

export default defineConfig({
  video: false,
  component: {
    specPattern: './tests/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: viteDefineConfig({
        mode: 'test',
        ...moduleAliases,
      }),
    },
  },
})
