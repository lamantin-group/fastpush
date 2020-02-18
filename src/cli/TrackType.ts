// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const trackTypes = <const>['alpha', 'beta', 'production']
export type TrackType = typeof trackTypes[number]
