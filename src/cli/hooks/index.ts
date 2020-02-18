import { AndroidLane, IOSLane } from '../../fastlane'
import { PlatformActions } from '../../model/platform'
import { FastpushResult } from '../fastpush'
import { Version } from '../utils'

export type Hooks = {
  /**
   * Calend when script execution starts, before calling other actions
   */
  onStart?: (options: FastpushResult) => Promise<void>

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

  provideAndroidLanes?: (options: FastpushResult) => AndroidLane[]
  provideIOSLanes?: (options: FastpushResult) => IOSLane[]
}
