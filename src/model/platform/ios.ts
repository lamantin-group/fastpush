import { PlatformActions } from '.'
import { Version } from '../increment'

export default class IOSPlatformActions implements PlatformActions {
  async setVersion(newVersion: string): Promise<Version[]> {
    console.log('Set version ios', newVersion)
    return Promise.reject()
  }

  async incrementBuildNumber(code: number): Promise<number[]> {
    throw new Error('Method not implemented.')
  }

  getBuildNumber(): Promise<number> {
    throw new Error('Method not implemented.')
  }
}
