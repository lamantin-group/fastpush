export const incrementTypes = ['none', 'patch', 'minor', 'major'] as const
export type IncrementType = typeof incrementTypes[number]
