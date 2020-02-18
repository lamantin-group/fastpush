import { Version, assertVersion } from '.'
import { ui } from '../../ui'
import { readVersionFrom } from '../../utils/increment/readVersion'
import { Incrementer } from '../../utils/increment/Incrementer'
import { IncrementType } from '../IncrementType'

/**
 * Increment version in packageJson and return array with [oldVersion, newVersion]
 */
export async function incrementPackageJson(packageJsonPath: string, type: IncrementType): Promise<[Version, Version]> {
  const version = await readVersionFrom(packageJsonPath)
  const currentVersion = await assertVersion(version)
  const newVersion = Incrementer.increment(currentVersion, type)
  
  return [version, newVersion]
}
