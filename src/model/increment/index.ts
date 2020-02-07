import { IncrementType } from '../../PublishOptions'
import { progress, question, error, read } from '../../ui'
import { readVersionFrom } from './readVersionFrom'
import { Incrementer } from './Incrementer'

export async function incrementVersion(type: IncrementType) {
  const loader = progress('Search version in package.json')
  const version = await readVersionFrom('package.json')
  loader.stop()
  const currentVersion = await assertVersion(version)
  return Incrementer.increment(currentVersion, type)
}

async function assertVersion(version: string) {
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
