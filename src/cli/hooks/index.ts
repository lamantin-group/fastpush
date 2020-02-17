import { AndroidLane, gradle, GradleArgs, supply, IOSLane } from '../../fastlane'
import { PublishOptions } from '../PublishOptions'
import { PlatformActions } from '../../model/platform'
import { Version } from '../utils'

export type Hooks = {
  /**
   * Calend when script execution starts, before calling other actions
   */
  onStart?: (options: PublishOptions) => Promise<void>

  /**
   * Called on end of script execution.
   *
   * Usefull for execute telegram, slack or etc., message notifyer
   */
  onFinish?: () => Promise<void>

  /**
   * Callend before starting lanes process of publishing
   *
   * Usefull for increment builds or last checks.
   * @returns should return new versions of app
   */
  onPrePublish?: (
    platform: PlatformActions,
  ) => {
    versions: [Version, Version]
    buildNumbers: [number, number]
  }

  /**
   * Called on end of lane process publishing
   *
   * Usefull for git commit, push or etc
   */
  onPostPublish?: (
    platform: PlatformActions,
    versions: [Version, Version],
    buildNumbers: [number, number],
  ) => Promise<void>

  provideAndroidLanes?: (options: PublishOptions) => AndroidLane[]
  provideIOSLanes?: (options: PublishOptions) => IOSLane[]
}
