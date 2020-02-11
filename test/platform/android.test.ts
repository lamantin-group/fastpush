import jetpack = require('fs-jetpack')
import AndroidPlatformActions from '../../src/model/platform/android'
import { PublishOptions } from '../../src/PublishOptions'
import { Directory } from 'clime/bld/castable'
import { expect } from 'chai'

function nextInt(): number {
  return Math.round(Math.random() * 10)
}

const options = (path: string) => {
  const temp = new PublishOptions()
  temp.project = {
    fullName: path,
  } as Directory
  return temp
}

describe(`android platform actions`, () => {
  const test = {
    references: [
      jetpack.cwd() + '/test/assets/build-reference.gradle',
      jetpack.cwd() + '/test/assets/build-reference-second.gradle',
    ],
  }

  test.references.forEach(path => {
    const buildGradle = jetpack.cwd() + '/test/assets/build.gradle'
    const referenceGradleFile = jetpack.read(path)

    beforeEach(() => {
      jetpack.write(jetpack.cwd() + '/test/assets/build.gradle', referenceGradleFile)
    })

    it(`should setVersion to build.gradle file ${path}`, async () => {
      const version = [nextInt(), nextInt(), nextInt()].join('.')
      const actions = new AndroidPlatformActions(options(buildGradle), () => buildGradle)
      const prevVersion = await actions.getVersionName()

      const [oldVersion, newVersion] = await actions.setVersion(version)
      expect(newVersion, 'Incorrect pass newVersion').to.equal(newVersion)
      expect(oldVersion, 'Incorrect pass oldVersion').to.equal(prevVersion)
    })

    it(`should increment build number for ${path}`, async () => {
      const actions = new AndroidPlatformActions(options(buildGradle), () => buildGradle)
      const prevBuildNumber = await actions.getBuildNumber()
      const [oldBuildNumber, newBuildNumber] = await actions.incrementBuildNumber()

      expect(prevBuildNumber, 'Incorrect previous buildNumber').to.equal(oldBuildNumber)
      expect(newBuildNumber, 'Incorrect new buildNumber').to.equal(prevBuildNumber + 1)
    })

    it(`provided build number should be number > 0`, async () => {
      const actions = new AndroidPlatformActions(options(buildGradle), () => buildGradle)
      const buildNumber = await actions.getBuildNumber()
      expect(buildNumber).to.be.above(0, `Provided build number ${buildNumber} not higher 0`)
    })
  })
})
