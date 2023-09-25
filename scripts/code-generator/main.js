import { generateRandomCodes } from './code-generator.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const [codeCountStr, codeLengthStr] = process.argv.slice(2)

const codes = generateRandomCodes(codeCountStr, codeLengthStr)

const jsonCodes = {}
codes.forEach((code, index) => {
  jsonCodes[index] = code
})

const jsonData = JSON.stringify(jsonCodes, null, 2)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputDir = __dirname + '/codes.json'
fs.writeFile(outputDir, jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err)
  } else {
    console.log('JSON file created successfully.')
  }
})
