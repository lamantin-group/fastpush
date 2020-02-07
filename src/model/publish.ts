import { Platform } from '../platform'
import { PublishOptions } from '../PublishOptions'
import { assertPlatforms } from './assert'
import { incrementVersion } from './increment'

export async function publish(platforms: Platform[], options: PublishOptions) {
  const selectedPlatforms = await assertPlatforms(platforms)

  const newVersion = await incrementVersion(options.increment)
  console.log('newVersion = ', newVersion)
}
