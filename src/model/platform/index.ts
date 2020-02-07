import AndroidPlatformActions from './android'
import IOSPlatformActions from './ios'
import { Directory } from 'clime/bld/castable'
import { Version } from '../increment'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const platformTypes = <const>['ios', 'android']
export type Platform = typeof platformTypes[number]

export interface PlatformActions {
  setVersion(newVersion: string): Promise<Version[]>
}

/**
 * Map Platform to PlatformActions
 */
export function providePlatformActions(platforms: Platform[], root: Directory): PlatformActions[] {
  const actions: PlatformActions[] = platforms.map(platform => {
    if (platform === 'ios') {
      return new IOSPlatformActions()
    } else if (platform == 'android') {
      return new AndroidPlatformActions(root.source + '/android')
    }
  })
  return actions
}
