import { Platform, platformTypes } from '../platform'
import { select } from '../ui'

export async function assertPlatforms(platforms: Platform[]): Promise<Platform[]> {
  if (!platforms || platforms.length <= 0) {
    console.warn('platforms is empty')
    const selectedPlatforms: Platform[] = await select<Platform>('You should specify platform for publishing', [
      ...platformTypes,
    ])
    return assertPlatforms(selectedPlatforms)
  }

  return Promise.resolve(platforms)
}
