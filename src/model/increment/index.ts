import { IncrementType } from '../../cli/PublishOptions'
import { Incrementer } from './Incrementer'
import { readVersionFrom } from './readVersion'
import { progress } from '../../ui/progress'
import { question } from '../../ui/question'
import { error } from '../../ui'
import { read } from '../../ui/read'

export type Version = string

/**
 * Increment version and return array with [oldVersion, newVersion]
 */
export async function incrementVersion(file: string, type: IncrementType): Promise<Version[]> {
  const loader = progress('Search version in package.json')
  const version = await readVersionFrom(file)
  loader.stop()
  const currentVersion = await assertVersion(version)
  const newVersion = Incrementer.increment(currentVersion, type)
  return [version, newVersion]
}

async function assertVersion(version: string): Promise<Version> {
  if (version) {
    const parts = version.split('.')
    if (parts.length === 3) {
      return Promise.resolve(version)
    }
  }

  const migration = Incrementer.tryMigrateVersion(version)

  if (migration) {
    const shouldApplyMigration = await question(
      `Your version is [${version}], but expected semver 3 digits value, like [1.0.0]. Should we change it to [${migration}]?`,
    )
    if (shouldApplyMigration) {
      return Promise.resolve(migration)
    }
  }

  error(`Your version is ${version}, but supported only 3 digits value like 1.0.0`)
  const newVersion = await read(`Enter version manualy and change from (${version}) ->`)
  return await assertVersion(newVersion)
}
