import jetpack from 'fs-jetpack'
import {
  android,
  gradle,
  GradleArgs,
  gym,
  ios,
  match as appleMatch,
  pilot,
  supply,
  SupplyArgs,
} from '../../src/fastlane'

const iosProjectPath = jetpack.cwd('test/assets').path()

describe('ios', () => {
  test('when lane crash it should crash caller', () => {
    let crashed = false
    try {
      ios(
        [
          {
            name: 'crasher',
            type: 'ios',
            args: [],
          },
        ],
        iosProjectPath,
      )
    } catch (e) {
      crashed = true
      expect(e.message.includes('Test exception')).toBeTruthy()
    }

    expect(crashed).toBeTruthy()
  })
})
