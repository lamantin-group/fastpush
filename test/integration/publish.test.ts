import jetpack = require('fs-jetpack')
import shell from 'shelljs'

describe(`integration test of publish`, function() {
  this.timeout(10000)

  it(`should show help for program`, done => {
    shell.exec('yarn start:help', code => {
      if (code != 0) {
        done(code)
      } else {
        done()
      }
    })
  })

  // it(`should apply env file`, done => {
  //   const envFile = __dirname + '/../assets/.test.env'
  //   shell.exec(`./build/cli/index.js android --track beta -e ${envFile}`, code => {
  //     if (code != 0) {
  //       done(code)
  //     } else {
  //       done()
  //     }
  //   })
  // })
})
