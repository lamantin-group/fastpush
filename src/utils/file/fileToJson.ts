import jetpack = require('fs-jetpack')

/**
 * Parse file to json
 */
export async function parseFile<T = any>(file: string): Promise<T> {
  const raw = await jetpack.readAsync(file)
  return JSON.parse(raw)
}
