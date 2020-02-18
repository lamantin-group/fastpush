/* eslint-disable @typescript-eslint/consistent-type-assertions */
export const incrementTypes = <const>['none', 'patch', 'minor', 'major']
export type IncrementType = typeof incrementTypes[number]

export const trackTypes = <const>['alpha', 'beta', 'production']
export type TrackType = typeof trackTypes[number]

export class PublishOptions {
  increment: IncrementType

  track: TrackType

  silent: boolean

  project: string

  rollout: number

  envFile: string

  flavor: string

  androidBuild: 'assemble' | 'bundle'
}
