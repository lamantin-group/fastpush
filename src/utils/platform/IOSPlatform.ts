import shell, { ShellString } from 'shelljs'
import { Platform, PlatformActions } from '.'
import { Version } from '../../cli/utils'
import jetpack = require('fs-jetpack')
import { ui } from '../../ui'

export class IOSPlatform implements PlatformActions {
  private projectDirectory: string
  private iosDirectory: string

  type: Platform = 'ios'

  constructor(
    projectDirectory: string = jetpack.cwd(),
    iosDirectory: string = jetpack
      .cwd(projectDirectory)
      .cwd('ios')
      .cwd(),
  ) {
    this.projectDirectory = projectDirectory
    this.iosDirectory = iosDirectory
    ui.message(`Setup ios project at: ${iosDirectory}`)

    // move back
    jetpack.cwd(projectDirectory)
  }

  /**
   * Execute `xcrun agvtool new-marketing-version ${newVersion}`
   * @param newVersion your version in format `number.number.number` (ex: 1.2.3)
   */
  async setVersionName(newVersion: string): Promise<[Version, Version]> {
    const oldVersion = await this.getVersionName()
    this.exec(`xcrun agvtool new-marketing-version ${newVersion}`)
    const updatedVersion = await this.getVersionName()
    return [oldVersion, updatedVersion]
  }

  /**
   * Execute `xcrun agvtool next-version -all` for increment build number
   * @returns [oldBuildNumber, newBuildNumber]
   */
  async incrementBuildNumber(): Promise<[number, number]> {
    const oldBuildNumber = await this.getBuildNumber()
    this.exec('xcrun agvtool next-version -all')
    const newBuildNumber = await this.getBuildNumber()
    return [oldBuildNumber, newBuildNumber]
  }

  /**
   * Execute `xcrun agvtool next-version -all` for increment build number
   * @returns [oldBuildNumber, newBuildNumber]
   */
  async setBuildNumber(buildNumber: number): Promise<[number, number]> {
    const oldBuildNumber = await this.getBuildNumber()
    this.exec(`xcrun agvtool new-version -all ${buildNumber}`)

    return [oldBuildNumber, buildNumber]
  }

  /**
   * Execute `xcrun agvtool what-version` inside ios directory and get parsed result.
   * Be sure, that you enable `agvtool` for your project https://dzone.com/articles/agvtool-automating-ios-build-and-version-numbers
   */
  async getBuildNumber(): Promise<number> {
    const result = this.exec('xcrun agvtool what-version')
    const buildNumber = Number.parseInt(result.stdout.match(/\d+/g).join())
    return buildNumber
  }

  /**
   * Execute `xcrun agvtool what-marketing-version` and parse returned value
   * @returns version name like "1.2.3"
   */
  async getVersionName(): Promise<Version> {
    const result = this.exec('xcrun agvtool what-marketing-version')
    const phrase = 'Found CFBundleShortVersionString of "'
    const startIndex = result.indexOf(phrase)
    const endIndex = result.indexOf('"', startIndex + phrase.length + 1)
    const version = result.substring(startIndex + phrase.length, endIndex)
    return version
  }

  private exec(command: string): ShellString {
    const result = shell.cd(this.iosDirectory).exec(command, { silent: true, fatal: true })
    if (result.code != 0) {
      throw result.stdout
    }
    return result
  }
}
