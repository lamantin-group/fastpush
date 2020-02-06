/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Options, option, ValidatorFunction } from 'clime'

const incrementTypes = <const>['none', 'patch', 'minor', 'major']
type IncrementType = typeof incrementTypes[number]

const trackTypes = <const>['alpha', 'beta', 'production']
type TrackType = typeof trackTypes[number]

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
}
