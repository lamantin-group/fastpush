import jetpack = require('fs-jetpack')
import AndroidPlatformActions from '../../src/model/platform/android'
import { PublishOptions } from '../../src/PublishOptions'
import { Directory } from 'clime/bld/castable'

function nextInt(): number {
  return Math.round(Math.random() * 10)
}

const references = [
  jetpack.cwd() + '/test/assets/build-reference.gradle',
  jetpack.cwd() + '/test/assets/build-reference-second.gradle',
]

const androidsAndBuildGradle: [AndroidPlatformActions, string][] = references.map(path => {
  const options = new PublishOptions()
  options.project = {
    fullName: path,
  } as Directory
  return [new AndroidPlatformActions(options, () => path), path]
})

function onEachPlatform(block: (actions: AndroidPlatformActions, path: string) => Promise<any>) {
  androidsAndBuildGradle.forEach(async ([android, path]) => {
    const referenceGradleFile = jetpack.read(path)
    jetpack.write(jetpack.cwd() + '/test/assets/build.gradle', referenceGradleFile)

    await block(android, path)
  })
}

describe(`android platform actions`, () => {
  test(`should set version to build.gradle file`, async () => {
    const version = [nextInt(), nextInt(), nextInt()].join('.')
    onEachPlatform(async (android, platform) => {
      const [oldVersion, newVersion] = await android.setVersion(version)
      expect(newVersion).toBe(version)
    })
  })

  test(`should increment build number`, async () => {
    onEachPlatform(async (android, options) => {
      const [oldCode, newCode] = await android.incrementBuildNumber()
      const codeFromFile = await android.getBuildNumber()
      expect(codeFromFile).toBe(newCode)
    })
  })

  test(`should use old build number when increment value`, async () => {
    onEachPlatform(async (android, path) => {
      const oldCodeFromFile = await android.getBuildNumber()
      const [oldCode, newCode] = await android.incrementBuildNumber()
      expect(oldCodeFromFile).toBe(oldCode)
    })
  })
})
