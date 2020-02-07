import g2js from 'gradle-to-js/lib/parser'
import { PlatformActions } from '.'
import { Version } from '../increment'
import jetpack = require('fs-jetpack')

/**
 * @param android - android project directory path
 */
export default class AndroidPlatformActions implements PlatformActions {
  constructor(private buildGradlePath: string) {
    const type = jetpack.exists(buildGradlePath)
    if (type === 'dir') {
      throw Error(`Expected path to build.gradle file, but ${buildGradlePath} is directory`)
    } else if (type === 'other') {
      throw Error(`Expected path to build.gradle file, but ${buildGradlePath} is not file`)
    } else if (type === null || type === undefined) {
      throw Error(`Expected path to build.gradle file, but ${buildGradlePath} is ${type}`)
    }
  }

  async incrementBuildNumber(): Promise<number> {
    const json = await g2js.parseFile(this.buildGradlePath)
    const versionCode = parseInt(json.android.defaultConfig.versionCode)
    const newVersionCode = versionCode + 1

    // TODO: write new version code to file

    return Promise.reject([versionCode, newVersionCode])
  }

  async setVersion(version: string): Promise<Version[]> {
    const result = await g2js.parseFile(this.buildGradlePath)
    const oldVersion = result.android.defaultConfig.versionName

    this.changeField('versionName', `"${version}"`)
    const newResult = await g2js.parseFile(this.buildGradlePath)
    const newVersion = newResult.android.defaultConfig.versionName
    return [oldVersion, newVersion]
  }

  changeField(field: string, value: string) {
    const file = jetpack.read(this.buildGradlePath)
    const regexp = new RegExp(`${field}.*`)
    const newContent = file.replace(regexp, 'versionName ' + value)
    jetpack.write(this.buildGradlePath, newContent)
  }
}
