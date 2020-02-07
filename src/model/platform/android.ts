import { PlatformActions } from '.'

export default class AndroidPlatformActions implements PlatformActions {
  async setVersion(newVersion: string) {
    console.log('Set version android', newVersion)
  }
}
