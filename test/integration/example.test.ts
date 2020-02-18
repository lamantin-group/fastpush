import jetpack = require('fs-jetpack')
import shell from 'shelljs'
import { fastpush } from '../../src/cli/fastpush'
import { publish } from '../../src/cli/publish'
import chai from 'chai'

import path from 'path'
const exec = require('child_process').exec

describe(`integration test of fastpush`, function() {
  this.timeout(10000)

  // it(`should show help for program`, done => {
  //   const result = fastpush(['node', 'test', '-h'])
  //   console.log('default values: ', result)
  // })

  it(`should parse assemble build option`, () => {
    const build = 'assemble'
    const result = fastpush(['node', 'test', '--build', build])
    chai.assert.isString(result.build)
    chai.assert.equal(result.build, build)
  })

  it(`should parse bundle build option`, () => {
    const build = 'bundle'
    const result = fastpush(['node', 'test', '--build', build])
    chai.assert.isString(result.build)
    chai.assert.equal(result.build, build)
  })

  it(`should parse some string based flavor option`, () => {
    const flavor = 'someFlavorType'
    const result = fastpush(['node', 'test', '--flavor', flavor])
    chai.assert.isString(result.flavor)
    chai.assert.equal(result.flavor, flavor)
  })

  it(`should parse android option`, () => {
    const result = fastpush(['node', 'test', 'android'])
    chai.assert.isTrue(result.android)
  })

  it(`should parse ios option`, () => {
    const result = fastpush(['node', 'test', 'ios'])
    chai.assert.isTrue(result.ios)
  })

  it(`should parse android and ios option`, () => {
    const result = fastpush(['node', 'test', 'ios', 'android'])
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

// describe(`processing options with publish`, function() {
//   this.timeout(10000)

//   it(`should use flavor`, async done => {
//     const result = fastpush(['android', '-f Prod'])
//     try {
//       await publish(result)
//       done()
//     } catch (e) {
//       done(e)
//     }
//   })
// })
