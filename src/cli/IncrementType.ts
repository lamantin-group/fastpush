/* eslint-disable @typescript-eslint/consistent-type-assertions */
export const incrementTypes = <const>['none', 'patch', 'minor', 'major']
export type IncrementType = typeof incrementTypes[number]
