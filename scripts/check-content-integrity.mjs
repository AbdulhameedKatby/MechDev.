import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const targets = [
  'content/aircraft',
  'app/questions',
  'app/concepts',
  'components',
]
const forbidden = [
  /Laser Particle Image Velocimetry/i,
  /SHOCK-BOUNDARY LAYER INTERACTION \/\/ DESIGN RESPONSE/i,
  /SBLI SOLVED/i,
  /Aluminum melts at/i,
  /cannot survive the inlet temperatures/i,
  /3[×x] faster transatlantic/i,
]

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(filePath) : [filePath]
  })
}

const failures = []
for (const target of targets) {
  const directory = path.join(root, target)
  if (!fs.existsSync(directory)) continue
  for (const filePath of walk(directory)) {
    if (!/\.(ts|tsx)$/.test(filePath)) continue
    const relativePath = path.relative(root, filePath)
    const source = fs.readFileSync(filePath, 'utf8')
    for (const pattern of forbidden) {
      if (pattern.test(source) && !relativePath.endsWith('content/concorde.ts')) {
        failures.push(`${relativePath}: ${pattern}`)
      }
    }
  }
}

if (failures.length > 0) {
  console.error('Content integrity check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Content integrity check passed.')
