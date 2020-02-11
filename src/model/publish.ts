import { Platform, providePlatformActions, PlatformActions } from './platform'
import { PublishOptions } from '../PublishOptions'
import { assertPlatforms } from './assert'
import { incrementVersion } from './increment'
import { success } from '../ui'
import jetpack = require('fs-jetpack')
import { parseFile } from './file/read'

export async function publish(platforms: Platform[], options: PublishOptions) {
  const selectedPlatforms = await assertPlatforms(platforms)

  const [oldVersion, newVersion] = await incrementVersion(options.increment)
  const packageContent = await parseFile(`${options.project.cwd}/package.json`)
  packageContent['version'] = newVersion
  await jetpack.writeAsync(`${options.project.cwd}/package.json`, packageContent)
  success(`Up package.json version from [${oldVersion}] -> [${newVersion}]`)

  const actions = providePlatformActions(selectedPlatforms, options)
  actions.forEach(async (action: PlatformActions) => {
    const [oldBuildNumber, currentBuildNumber] = await action.incrementBuildNumber()
    const [oldVersion, currentVersion] = await action.setVersion(newVersion)
    await action.build()
    await action.publish()
  })
}
