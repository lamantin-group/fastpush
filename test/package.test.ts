import chai from 'chai'
import { readVersionFrom, saveVersionTo } from '../src'

const file = __dirname + '/assets/package.json'

function nextInt(): number {
  return Math.round(Math.random() * 10)
}

describe('file read and write utils', () => {
  it('should read version from package json', async () => {
    const version = await readVersionFrom(file)
    chai.assert.isString(version)
  })

  it('should write version to package.json', async () => {
    const currentVersion = await readVersionFrom(file)
    const generatedVersion = [nextInt(), nextInt(), nextInt()].join('.')
    const [oldVersion, newVersion] = await saveVersionTo(file, generatedVersion)
    chai.assert.equal(currentVersion, oldVersion, 'Old versions should be identical')
    chai.assert.equal(generatedVersion, newVersion, 'Writed versions should be identical')
  })
})
