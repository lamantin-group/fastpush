import { IOSPlatform, ios } from '../../src'
import jetpack = require('fs-jetpack')
import chai from 'chai'

const iosProjectPath = jetpack
  .cwd(__dirname)
  .cwd('../assets/ios')
  .path()
const iosPlatform = new IOSPlatform(null, iosProjectPath)

function assertVersionName(version: string) {
  version.split('.').forEach(part => {
    chai.assert.isNumber(Number.parseInt(part), 'ios version number should include only numbers')
  })
}

describe('ios platform actions', () => {
  it('should return build number of ios project', async () => {
    const result = await iosPlatform.getBuildNumber()
    chai.assert.isAbove(result, 0)
  })

  it('should return versionName', async () => {
    const result = await iosPlatform.getVersionName()
    assertVersionName(result)
  })

  it('should setVersion', async () => {
    const versionForUpdate = '3.4.5'
    const [oldVersion, newVersion] = await iosPlatform.setVersionName(versionForUpdate)
    chai.assert.equal(versionForUpdate, newVersion)
    assertVersionName(oldVersion)
  })

  it('should increment build number', async () => {
    const [oldBuildNumber, newBuildNumber] = await iosPlatform.incrementBuildNumber()
    chai.assert.isNumber(oldBuildNumber)
    chai.assert.isNumber(newBuildNumber)
    chai.assert.equal(newBuildNumber, oldBuildNumber + 1)
  })
})
