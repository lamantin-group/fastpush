import g2js from 'gradle-to-js/lib/parser'
import { Version } from '../../cli/utils'
import { ui } from '../../ui'
import jetpack = require('fs-jetpack')
import { PlatformActions, Platform } from '.'

/**
 * @param android - android project directory path
 */
export class AndroidPlatform implements PlatformActions {
  private projectDirectory: string
  private androidDirectory: string
  private buildGradlePath: string

  type: Platform = 'android'

  /**
   * Android platform specific actions, that can help you with build process
   * @param projectDirectory - path to react-native root project directory ["current-working-directory"]
   * @param androidDirectory - path to android platform directory ["current-working-directory/android"]
   * @param buildGradlePath - path to app/build.gradle file ["current-working-directory/android/app/build.gradle"]
   */
  constructor(
    projectDirectory: string = jetpack.cwd(),
    androidDirectory: string = projectDirectory + '/android',
    buildGradlePath: string = androidDirectory + '/app/build.gradle',
  ) {
    this.projectDirectory = projectDirectory
    this.androidDirectory = androidDirectory
    this.buildGradlePath = buildGradlePath

    const type = jetpack.exists(this.buildGradlePath)
    if (type === 'dir') {
      throw Error(`Expected path to build.gradle file, but ${this.buildGradlePath} is directory`)
    } else if (type === 'other') {
      throw Error(`Expected path to build.gradle file, but ${this.buildGradlePath} is not file`)
    } else if (type === null || type === undefined) {
      throw Error(`Expected path to build.gradle file, but ${this.buildGradlePath} is ${type}`)
    } else if (type === 'file') {
      // TODO: handle case when passed only buildGradlePath, but not projectDirectory and androidDirectory
      ui.message('Found buildGradlePath: ' + buildGradlePath)
    } else {
      throw Error(`Unexpected behavior. Found type = ${type} for buildGradlePath = ${buildGradlePath}`)
    }
  }

  async getBuildNumber(): Promise<number> {
    const json = await g2js.parseFile(this.buildGradlePath)
    const versionCode = parseInt(json.android.defaultConfig.versionCode)
    return versionCode
  }

  async getVersionName(): Promise<string> {
    const json = await g2js.parseFile(this.buildGradlePath)
    const versionName = json.android.defaultConfig.versionName
    return versionName
  }

  async incrementBuildNumber(): Promise<[number, number]> {
    const buildNumber = await this.getBuildNumber()
    this.changeField('versionCode', `${buildNumber + 1}`)
    const newBuildNumber = await this.getBuildNumber()
    return [buildNumber, newBuildNumber]
  }

  async setVersionName(version: string): Promise<[Version, Version]> {
    const oldVersion = await this.getVersionName()
    this.changeField('versionName', `"${version}"`)
    const newVersion = await this.getVersionName()
    return [oldVersion, newVersion]
  }

  async setBuildNumber(buildNumber: number): Promise<[number, number]> {
    const oldBuildNumber = await this.getBuildNumber()
    this.changeField('versionCode', `${buildNumber}`)
    const newBuildNumber = await this.getBuildNumber()

    return [oldBuildNumber, newBuildNumber]
  }

  private changeField(field: string, value: string) {
    const file = jetpack.read(this.buildGradlePath)
    const regexp = new RegExp(`${field}.*`)
    const newContent = file.replace(regexp, `${field} ` + value)
    jetpack.write(this.buildGradlePath, newContent)
  }
}
