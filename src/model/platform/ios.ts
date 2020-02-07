import { PlatformActions } from '.'
import { Version } from '../increment'
import { error } from '../../ui'

export default class IOSPlatformActions implements PlatformActions {
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
}
