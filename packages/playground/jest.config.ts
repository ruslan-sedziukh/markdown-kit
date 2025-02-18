import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  preset: 'next/jest',
  transform: {
    [`*/dist/*`]: 'babel-jest',
  },
}

export default createJestConfig(config)
