import g2js from 'gradle-to-js/lib/parser'
import { PlatformActions } from '.'
import { Version } from '../increment'
import jetpack = require('fs-jetpack')
import shell from 'shelljs'
import { progress, error } from '../../ui'
import { PublishOptions } from '../../PublishOptions'
import CommonPlatformActions from './common'
import { PathProvider } from './PathProvider'

/**
 * @param android - android project directory path
 */
export default class AndroidPlatformActions extends CommonPlatformActions {
  buildGradlePath: string

  constructor(
    private options: PublishOptions,
    private buildGradlePathProvider: PathProvider = () => this.platformDirectory + '/app/build.gradle',
  ) {
    super(options.project.fullName + '/android')

    this.buildGradlePath = buildGradlePathProvider()
    const type = jetpack.exists(this.buildGradlePath)
    if (type === 'dir') {
      throw Error(`Expected path to build.gradle file, but ${this.buildGradlePath} is directory`)
    } else if (type === 'other') {
      throw Error(`Expected path to build.gradle file, but ${this.buildGradlePath} is not file`)
    } else if (type === null || type === undefined) {
      throw Error(`Expected path to build.gradle file, but ${this.buildGradlePath} is ${type}`)
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

  async setVersion(version: string): Promise<[Version, Version]> {
    const oldVersion = await this.getVersionName()
    this.changeField('versionName', `"${version}"`)
    const newVersion = await this.getVersionName()
    return [oldVersion, newVersion]
  }

  async build(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      // await this.gradle('assembleRelease')
      // todo: change to specify build type
      await this.lanes([
        {
          name: 'gradle',
          args: [
            { name: 'task', value: 'bundle' },
            { name: 'build_type', value: 'Release' },
          ],
        },
        {
          name: 'supply',
          args: [{ name: 'track', value: this.options.track }],
        },
      ])
      // await this.fastlane('run gradle task:assemble build_type:Debug')
      resolve()
    })
  }

  async publish(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.fastlane(`run supply track:${this.options.track}`)
    })
  }

  private async gradle(task: string): Promise<void> {
    return new Promise((resolve, reject) => {
      shell.cd(this.platformDirectory)
      const command = `./gradlew ` + task

      // TODO: validate user input for security policy
      shell.exec(command.trim())
    })
  }

  private changeField(field: string, value: string) {
    const file = jetpack.read(this.buildGradlePath)
    const regexp = new RegExp(`${field}.*`)
    const newContent = file.replace(regexp, `${field} ` + value)
    jetpack.write(this.buildGradlePath, newContent)
  }
}
