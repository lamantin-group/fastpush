import jetpack from 'fs-jetpack'

/**
 * Read version from file
 * @param file input
 */
export async function readVersionFrom(file: string) {
  const raw = await jetpack.readAsync(file)
  const fileJson = JSON.parse(raw)
  const version = fileJson['version'] as string
  return version.trim()
}
