import { Platform } from '../platform'
import { PublishOptions } from '../options'
import { assertPlatforms } from './assert'

export async function publish(platforms: Platform[], options: PublishOptions) {
  const selectedPlatforms = await assertPlatforms(platforms)
  console.log('selectedPlatforms = ', selectedPlatforms)
}
