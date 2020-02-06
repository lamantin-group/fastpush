// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const platformTypes = <const>['ios', 'android']
export type Platform = typeof platformTypes[number]
