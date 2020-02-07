import { PlatformActions } from '.'
import { Version } from '../increment'

export default class IOSPlatformActions implements PlatformActions {
  async setVersion(newVersion: string): Promise<Version[]> {
    console.log('Set version ios', newVersion)
    return Promise.reject()
  }
}
