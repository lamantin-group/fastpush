import { IOSPlatform } from '../../src'
import jetpack = require('fs-jetpack')
import chai from 'chai'

const iosProjectPath = jetpack
  .cwd(__dirname)
  .cwd('../assets/ios')
  .path()
const iosPlatform = new IOSPlatform(null, iosProjectPath)

describe('ios platform actions', () => {
  it('should return build number of ios project', async () => {
    const result = await iosPlatform.getBuildNumber()
    chai.assert.isAbove(result, 0)
  })
})
