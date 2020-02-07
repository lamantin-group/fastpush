import { PlatformActions } from '.'

export default class IOSPlatformActions implements PlatformActions {
  async setVersion(newVersion: string) {
    console.log('Set version ios', newVersion)
  }
}
