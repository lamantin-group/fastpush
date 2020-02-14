import { IOSPlatform, ios } from '../../src'
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

  it('should return versionName', async () => {
    const result = await iosPlatform.getVersionName()
    const parts = result.split('.')
    chai.assert.include(result, '.', 'versionName should include dots')

    parts.map(part => {
      chai.assert.isNumber(Number.parseInt(part), 'ios version number should include only numbers')
    })
  })
})
