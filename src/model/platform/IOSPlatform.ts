import { Version } from '../../cli/utils'
import { error } from '../../ui/error'
import jetpack = require('fs-jetpack')
import shell from 'shelljs'

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
    const result = shell.cd(this.iosDirectory).exec('xcrun agvtool what-version')
    if (result.code != 0) {
      throw result.stderr
    }
    const buildNumber = Number.parseInt(result.stdout.match(/\d+/g).join())
    return buildNumber
  }
}
