/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Options, option } from 'clime'
import { File, Directory } from 'clime/bld/castable'

export const incrementTypes = <const>['none', 'patch', 'minor', 'major']
export type IncrementType = typeof incrementTypes[number]

export const trackTypes = <const>['alpha', 'beta', 'production']
export type TrackType = typeof trackTypes[number]

export class PublishOptions extends Options {
  @option({
    flag: 'i',
    description: 'increment app version',
    placeholder: incrementTypes.join('|'),
    required: false,
    default: incrementTypes[0],
  })
  increment: IncrementType

  @option({
    flag: 't',
    description: 'select publish track',
    placeholder: trackTypes.join('|'),
    required: true,
    default: trackTypes[0],
  })
  track: TrackType

  @option({
    flag: 's',
    description: 'distribute without asking',
    placeholder: 'true|false',
    required: false,
    default: false,
  })
  silent: boolean

  @option({
    flag: 'p',
    description: 'path to root of project',
    placeholder: 'project',
    required: false,
    default: '.',
  })
  project: Directory

  @option({
    flag: 'r',
    description: 'percent rollout',
    placeholder: '0..100',
    required: false,
    default: 100,
  })
  rollout: number
}
