import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkgPath = path.resolve(__dirname, '../package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

pkg.name = 'react-baseline-status'
pkg.type = 'module'
pkg.main = './dist/index.cjs'
pkg.module = './dist/index.js'
pkg.types = './dist/index.d.ts'
pkg.files = ['dist', 'README.md']
pkg.scripts = pkg.scripts || {}
pkg.scripts['generate-ids'] = 'tsx scripts/generate-ids.ts'
pkg.scripts['prebuild'] = 'pnpm run generate-ids'
pkg.scripts['build'] = 'vite build'

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
console.log('Updated package.json')
