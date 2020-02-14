import { Version } from '../../cli/utils'
import { error } from '../../ui/error'
import jetpack = require('fs-jetpack')
import shell, { ShellString } from 'shelljs'

export class IOSPlatform {
  projectDirectory: string
  iosDirectory: string

  constructor(projectDirectory: string = jetpack.cwd(), iosDirectory: string = projectDirectory + '/ios') {
    this.projectDirectory = projectDirectory
    this.iosDirectory = iosDirectory
  }

  async setVersion(newVersion: string): Promise<Version[]> {
    console.log('Set version ios', newVersion)
    return Promise.reject()
  }

  async incrementBuildNumber(): Promise<number[]> {
    error('incrementBuildNumber not implemented for ios')
    return Promise.resolve([-1, -1])
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

  async getVersionName(): Promise<string> {
    const result = this.exec('xcrun agvtool what-marketing-version')
    const phrase = 'Found CFBundleShortVersionString of "'
    const startIndex = result.indexOf(phrase)
    const endIndex = result.indexOf('"', startIndex + phrase.length + 1)
    const version = result.substring(startIndex + phrase.length, endIndex)
    return version
  }

  private exec(command: string): ShellString {
    const result = shell.cd(this.iosDirectory).exec(command)
    if (result.code != 0) {
      throw result.stderr
    }
    return result
  }
}
