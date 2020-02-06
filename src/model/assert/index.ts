import { Platform, platformTypes } from '../../platform'
import { select, question, error, read } from '../../ui'
import { Incrementer } from '../increment/Incrementer'

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

export async function assertVersion(version: string) {
  if (version) {
    const parts = version.split('.')
    if (parts.length === 3) {
      return version
    }
  }

  const migration = Incrementer.tryMigrateVersion(version)

  if (migration) {
    const shouldApplyMigration = await question(
      `Your version is [${version}], but expected semver 3 digits value, like [1.0.0]. Should we change it to [${migration}]?`,
    )
    if (shouldApplyMigration) {
      return migration
    }
  }

  error(`Your version is ${version}, but supported only 3 digits value like 1.0.0`)
  const newVersion = await read(`Enter version manualy and change from (${version}) ->`)
  return await assertVersion(newVersion)
}
