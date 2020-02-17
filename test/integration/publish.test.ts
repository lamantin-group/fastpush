import jetpack = require('fs-jetpack')
import shell from 'shelljs'

describe(`integration test of publish`, function() {
  this.timeout(10000)

  it(`should show help for program`, done => {
    shell.exec('./build/src/cli/index.js -h', code => {
      if (code != 0) {
        done(code)
      } else {
        done()
      }
    })
  })
})
