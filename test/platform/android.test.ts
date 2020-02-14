import jetpack = require('fs-jetpack')
import { expect } from 'chai'
import { AndroidPlatform } from '../../src/model/platform'

function nextInt(): number {
  return Math.round(Math.random() * 10)
}

function createAndroidPlatform(buildGradlePath: string) {
  return new AndroidPlatform(null, null, buildGradlePath)
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
      const actions = createAndroidPlatform(buildGradle)
      const prevVersion = await actions.getVersionName()

      const [oldVersion, newVersion] = await actions.setVersionName(version)
      expect(newVersion, 'Incorrect pass newVersion').to.equal(newVersion)
      expect(oldVersion, 'Incorrect pass oldVersion').to.equal(prevVersion)
    })

    it(`should increment build number for ${path}`, async () => {
      const actions = createAndroidPlatform(buildGradle)
      const prevBuildNumber = await actions.getBuildNumber()
      const [oldBuildNumber, newBuildNumber] = await actions.incrementBuildNumber()

      expect(prevBuildNumber, 'Incorrect previous buildNumber').to.equal(oldBuildNumber)
      expect(newBuildNumber, 'Incorrect new buildNumber').to.equal(prevBuildNumber + 1)
    })

    it(`provided build number should be number > 0`, async () => {
      const actions = createAndroidPlatform(buildGradle)
      const buildNumber = await actions.getBuildNumber()
      expect(buildNumber).to.be.above(0, `Provided build number ${buildNumber} not higher 0`)
    })
  })
})
