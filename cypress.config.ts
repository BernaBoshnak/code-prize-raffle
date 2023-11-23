import { defineConfig } from 'cypress'
import Dotenv from 'dotenv-webpack'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  video: false,
  component: {
    specPattern: './tests/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        mode: 'test',
        devtool: false,
        module: {
          rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
            },
            {
              test: /\.(ts|tsx)$/,
              use: [
                {
                  loader: 'babel-loader', // Transpile ES6+ to ES5
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                      [
                        '@babel/plugin-transform-modules-commonjs',
                        { loose: true },
                      ],
                    ],
                  },
                },
                {
                  loader: 'ts-loader', // Compile TypeScript to JavaScript
                  options: {
                    transpileOnly: true, // Enable transpilation only mode
                  },
                },
              ],
            },
          ],
        },
        plugins: [
          new Dotenv({
            path: '.env.test',
            prefix: 'import.meta.env.',
          }),
        ],
        resolve: {
          alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@styles': path.resolve(__dirname, 'src/assets/scss'),
          },
          extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.scss'],
        },
      },
    },
  },
})
