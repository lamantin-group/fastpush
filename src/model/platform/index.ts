import { Version } from '../../cli/utils'
export * from './AndroidPlatform'
export * from './IOSPlatform'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const platformTypes = <const>['android', 'ios']
export type Platform = typeof platformTypes[number]

export interface PlatformActions {
  setVersion(newVersion: string): Promise<Version[]>
  incrementBuildNumber(): Promise<number[]>
  getBuildNumber(): Promise<number>
}
