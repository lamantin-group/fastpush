import { ui } from '../../ui'
import { Incrementer } from '../../utils/increment/Incrementer'
import { Version } from './Version'

/**
 * Check that version argument has formatting like 'number.number.number' and trying migrate to this format if it's not.
 * @param version
 */
export async function assertVersion(version: Version): Promise<Version> {
  if (version) {
    const parts = version.split('.')
    if (parts.length === 3) {
      return Promise.resolve(version)
    }
  }
  const migration = Incrementer.tryMigrateVersion(version)
  if (migration) {
    const shouldApplyMigration = await ui.question(
      `Your version is [${version}], but expected semver 3 digits value, like [1.0.0]. Should we change it to [${migration}]?`,
    )
    if (shouldApplyMigration) {
      return Promise.resolve(migration)
    }
  }
  ui.error(`Your version is ${version}, but supported only 3 digits value like 1.0.0`)
  const newVersion = await ui.read(`Enter version manualy and change from (${version}) ->`)
  return await assertVersion(newVersion)
}
