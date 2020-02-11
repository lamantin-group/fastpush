import AndroidPlatformActions from './android'
import IOSPlatformActions from './ios'
import { Directory } from 'clime/bld/castable'
import { Version } from '../increment'
import { PublishOptions } from '../../PublishOptions'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const platformTypes = <const>['ios', 'android']
export type Platform = typeof platformTypes[number]

export interface PlatformActions {
  setVersion(newVersion: string): Promise<Version[]>
  incrementBuildNumber(): Promise<number[]>
  getBuildNumber(): Promise<number>
  build(): Promise<void>
  publish(): Promise<void>
}

/**
 * Map Platform to PlatformActions
 */
export function providePlatformActions(platforms: Platform[], options: PublishOptions): PlatformActions[] {
  const actions: PlatformActions[] = platforms.map(platform => {
    if (platform === 'ios') {
      return new IOSPlatformActions()
    } else if (platform == 'android') {
      // TODO: think about path, it can be incorrect
      return new AndroidPlatformActions(options)
    }
  })
  return actions
}
