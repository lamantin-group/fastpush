import { env } from '../../src'
import chai from 'chai'

describe('environment utils', () => {
  it('should put env file into process.env', () => {
    const oldenv = `${process.env}`
    chai.assert.isFalse(oldenv.includes('TEST_ENV_VARIABLE'))
    env.add(`${__dirname}/../assets/.test.env`)

    const newenv = `${process.env}`
    chai.assert.isFalse(newenv.includes('TEST_ENV_VARIABLE'))
  })
})
