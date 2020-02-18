import jetpack = require('fs-jetpack')
import { Version } from '../../cli/utils'

/**
 * Read version from file
 * @param file input
 */
export async function readVersionFrom(file: string): Promise<Version> {
  const raw = await jetpack.readAsync(file)
  const fileJson = JSON.parse(raw)
  const version = fileJson['version'] as string
  return version.trim()
}

/**
 * Save version to file
 * @param file input
 * @param version
 */
export async function saveVersionTo(file: string, version: string): Promise<[Version, Version]> {
  const oldVersion = await readVersionFrom(file)
  const raw = await jetpack.readAsync(file)
  const fileJson = JSON.parse(raw)
  fileJson.version = version
  await jetpack.writeAsync(file, fileJson)
  const savedVersion = await readVersionFrom(file)
  return [oldVersion, savedVersion]
}
