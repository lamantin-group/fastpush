import { Platform } from '../platform'
import { progress } from '../ui'
import { assertPlatforms, assertVersion } from './assert'
import { readVersionFrom } from './increment'
import { Incrementer } from './increment/Incrementer'
import { PublishOptions, IncrementType } from '../PublishOptions'

export async function publish(platforms: Platform[], options: PublishOptions) {
  const selectedPlatforms = await assertPlatforms(platforms)

  const newVersion = await incrementVersion(options.increment)
  console.log('newVersion = ', newVersion)
}

async function incrementVersion(type: IncrementType) {
  const loader = progress('Search version in package.json')
  const version = await readVersionFrom('package.json')
  loader.stop()
  const currentVersion = await assertVersion(version)
  return Incrementer.increment(currentVersion, type)
}
