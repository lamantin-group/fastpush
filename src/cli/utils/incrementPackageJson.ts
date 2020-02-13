import { IncrementType } from '../PublishOptions'
import { Version, assertVersion } from '.'
import { progress } from '../../ui'
import { readVersionFrom } from '../../utils/increment/readVersion'
import { Incrementer } from '../../utils/increment/Incrementer'

/**
 * Increment version in packageJson and return array with [oldVersion, newVersion]
 */
export async function incrementPackageJson(packageJsonPath: string, type: IncrementType): Promise<[Version, Version]> {
  const loader = progress('Search version in ' + packageJsonPath)
  const version = await readVersionFrom(packageJsonPath)
  const currentVersion = await assertVersion(version)
  const newVersion = Incrementer.increment(currentVersion, type)
  loader.stop()
  return [version, newVersion]
}
