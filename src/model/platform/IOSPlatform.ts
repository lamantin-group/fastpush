import { Version } from '../../cli/utils'
import { error } from '../../ui/error'

export default class IOSPlatformActions {
  async setVersion(newVersion: string): Promise<Version[]> {
    console.log('Set version ios', newVersion)
    return Promise.reject()
  }

  async incrementBuildNumber(): Promise<number[]> {
    error('incrementBuildNumber not implemented for ios')
    return Promise.resolve([-1, -1])
  }

  async getBuildNumber(): Promise<number> {
    error('getBuildNumber not implemented for ios')
    return Promise.resolve(-1)
  }
}
