import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, test } from 'vitest'

const webComponentsDir = resolve(__dirname, '../../../src/components/web')
const wrappers = readdirSync(webComponentsDir).filter(file => file.endsWith('.tsx'))

// Metro's web resolver redirects React Native Web's root exports to these wrappers. A namespace, default, or require
// import of react-native loads that root index while it is still initializing, so wrappers import members by name,
// which babel-plugin-react-native-web rewrites to each component's own module.
describe('Web wrappers import React Native members by name', () => {
    test.each(wrappers)('%s', file => {
        const source = readFileSync(join(webComponentsDir, file), 'utf8')

        expect(source).not.toMatch(/import\s+(\w+\s*,\s*)?\*\s+as\s+\w+\s+from\s+['"]react-native['"]/)
        expect(source).not.toMatch(/import\s+\w+\s*(,\s*(\{[^}]*\}|\*\s+as\s+\w+))?\s+from\s+['"]react-native['"]/)
        expect(source).not.toMatch(/require\(\s*['"]react-native['"]\s*\)/)
    })
})
