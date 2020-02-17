import { Version } from '../../cli/utils'
export * from './AndroidPlatform'
export * from './IOSPlatform'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const platformTypes = <const>['android', 'ios']
export type Platform = typeof platformTypes[number]

export interface PlatformActions {
  getVersionName(): Promise<string>
  setVersionName(newVersion: Version): Promise<[Version, Version]>
  incrementBuildNumber(): Promise<[number, number]>
  getBuildNumber(): Promise<number>
}
