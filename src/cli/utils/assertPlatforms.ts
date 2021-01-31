import { ui } from '../../ui'
import { Platform, platformTypes } from '../../utils/platform'

export type PlatformAtLeastOne =
  | [typeof platformTypes[0]]
  | [typeof platformTypes[1]]
  | [typeof platformTypes[0], typeof platformTypes[1]]

/**
 * Assert input platforms and return array that contains at least 1 platform
 * @param platforms
 */
export async function assertPlatforms(platforms: Platform[]): Promise<PlatformAtLeastOne> {
  if (!platforms || platforms.length <= 0) {
    console.warn('platforms is empty')
    const selectedPlatforms: PlatformAtLeastOne = await ui.select<Platform>(
      'You should specify platform for publishing',
      [...platformTypes],
    )
    return assertPlatforms(selectedPlatforms)
  }

  return Promise.resolve(platforms as PlatformAtLeastOne)
}
