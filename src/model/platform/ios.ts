import { PlatformActions } from '.'
import { Version } from '../increment'
import { error } from '../../ui'
import CommonPlatformActions from './common'
import { PublishOptions } from '../../cli/PublishOptions'
import shell from 'shelljs'
export default class IOSPlatformActions extends CommonPlatformActions {
  constructor(options: PublishOptions) {
    super(options.project.fullName + '/ios')
  }

  async setVersion(newVersion: string): Promise<Version[]> {
    console.log('Set version ios', newVersion)
    return Promise.reject()
  }

  async incrementBuildNumber(): Promise<number[]> {
    error('incrementBuildNumber not implemented for ios')
    return Promise.resolve([-1, -1])
  }

  getBuildNumber(): Promise<number> {
    error('getBuildNumber not implemented for ios')
    return Promise.resolve(-1)
  }

  async build(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.fastlane('run build_ios_app')
      resolve()
    })
  }

  async publish(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      reject()
      // await this.fastlane(`supply track:${this.options.track}`)
    })
  }
}
