import jetpack = require('fs-jetpack')
import AndroidPlatformActions from '../../src/model/platform/android'

function nextInt(): number {
  return Math.round(Math.random() * 10)
}

const path = jetpack.cwd() + '/test/assets/build.gradle'
const pathReference = jetpack.cwd() + '/test/assets/build-reference.gradle'

beforeEach(() => {
  // replace build.gradle with build-reference.gradle
  const referenceContent = jetpack.read(pathReference)
  jetpack.write(path, referenceContent)
})

describe(`android platform actions`, () => {
  test(`should set from to build.gradle file`, async () => {
    const version = [nextInt(), nextInt(), nextInt()].join('.')
    const path = jetpack.cwd() + '/test/assets/build.gradle'
    jetpack.file(path)
    const android = new AndroidPlatformActions(jetpack.cwd() + '/test/assets/build.gradle')
    const [oldVersion, newVersion] = await android.setVersion(version)
    expect(newVersion).toBe(version)
  })
})
