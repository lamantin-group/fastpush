import { publish } from '../../src'
import { FastpushResult } from '../../src/cli/fastpush'
import jetpack = require('fs-jetpack')

const defaultOptions: FastpushResult = {
  android: false,
  ios: false,
  build: null,
  env: null,
  flavor: null,
  increment: 'none',
  rollout: 0,
  silent: false,
  track: 'alpha',
  project: '.',
}

describe(`IOS integration`, function() {
  this.timeout(300000)

  it('should ios start', async () => {
    await publish({
      ...defaultOptions,
      ios: true,
    })
  })
})
