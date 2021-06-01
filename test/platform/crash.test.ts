import jetpack from 'fs-jetpack'
import { ios } from '../../src/fastlane'

const iosProjectPath = jetpack.cwd('test/assets').path()

describe('ios', () => {
  test('when lane crash it should throw native js error', () => {
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
