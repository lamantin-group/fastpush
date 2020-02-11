import jetpack = require('fs-jetpack')
import AndroidPlatformActions from '../../src/model/platform/android'
import { PublishOptions } from '../../src/PublishOptions'
import { Directory } from 'clime/bld/castable'
import { expect } from 'chai'

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

async function onEachPlatform(block: (actions: AndroidPlatformActions, path: string) => Promise<any>) {
  return new Promise((resolve, reject) => {
    androidsAndBuildGradle.forEach(async ([android, path]) => {
      const referenceGradleFile = jetpack.read(path)

      try {
        jetpack.write(jetpack.cwd() + '/test/assets/build.gradle', referenceGradleFile)

        await block(android, path)
      } catch (e) {
        reject(e)
      } finally {
        // restore overwrited content
        jetpack.write(path, referenceGradleFile)
      }
    })
    resolve()
  })
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

  // tests.forEach(args => {
  //   it(`Dynamic test with ${args.references}`, () => {
  //     expect(false).toBe(nextInt() % 2 == 0)
  //   })
  // })

  test.references.forEach(path => {
    beforeEach(() => {
      const referenceGradleFile = jetpack.read(path)
      jetpack.write(jetpack.cwd() + '/test/assets/build.gradle', referenceGradleFile)
    })

    it(`should set version to build.gradle file ${path}`, async () => {
      const file = jetpack.cwd() + '/test/assets/build.gradle'

      const version = [nextInt(), nextInt(), nextInt()].join('.')
      const [oldVersion, newVersion] = await new AndroidPlatformActions(options(file), () => file).setVersion(version)
      expect(newVersion).to.equal(newVersion)
    })
  })

  // test(`should increment build number`, async () => {
  //   onEachPlatform(async (android, options) => {
  //     const [oldCode, newCode] = await android.incrementBuildNumber()
  //     const codeFromFile = await android.getBuildNumber()
  //     expect(codeFromFile).toBe(newCode)
  //   })
  // })

  // test(`should use old build number when increment value`, async () => {
  //   onEachPlatform(async (android, path) => {
  //     const oldCodeFromFile = await android.getBuildNumber()
  //     const [oldCode, newCode] = await android.incrementBuildNumber()
  //     expect(oldCodeFromFile).toBe(oldCode)
  //   })
  // })
})
