import { Platform, providePlatformActions } from './platform'
import { PublishOptions } from '../PublishOptions'
import { assertPlatforms } from './assert'
import { incrementVersion } from './increment'
import { success } from '../ui'

export async function publish(platforms: Platform[], options: PublishOptions) {
  const selectedPlatforms = await assertPlatforms(platforms)

  const [oldVersion, newVersion] = await incrementVersion(options.increment)
  success(`Up package.json version from [${oldVersion}] -> [${newVersion}]`)

  const actions = providePlatformActions(selectedPlatforms)
  actions.forEach(async action => {
    await action.setVersion(newVersion)
  })
}
