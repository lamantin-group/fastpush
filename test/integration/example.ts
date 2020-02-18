import jetpack = require('fs-jetpack')
import shell from 'shelljs'
import { fastpush } from '../../src/cli/fastpush'
import chai from 'chai'

describe(`integration test of fastpush`, function() {
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

  it(`should parse android option`, done => {
    const result = fastpush(['android'])
    chai.assert.isTrue(result.android)
  })

  it(`should parse ios option`, done => {
    const result = fastpush(['ios'])
    chai.assert.isTrue(result.ios)
  })

  it(`should parse android and ios option`, done => {
    const result = fastpush(['ios', 'android'])
    chai.assert.isTrue(result.ios)
    chai.assert.isTrue(result.android)
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
