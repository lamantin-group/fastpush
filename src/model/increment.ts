import { Platform } from '../platform'
import { IncrementType } from '../options'
import jetpack from 'fs-jetpack'
import { progress, delay } from '../ui'

async function getCurrentVersion(file: string) {
  const raw = await jetpack.readAsync(file)
  const fileJson = JSON.parse(raw)
  const version = fileJson['version'] as string
  return version.trim()
}

/**
 * Increment version or return null if can`t do it
 * @param from semver string like "0.0.0"
 * @param type patch, minor, major
 */
export function increment(from: string, type: IncrementType) {
  if (!from) return null
  let parts = from.split('.').map(int => parseInt(int))
  if (parts.length < 3) return null

  function reset(array: number[], from: number) {
    return array.map((value, index) => {
      if (index > from) {
        return 0
      } else {
        return value
      }
    })
  }

  let index = null
  if (type === 'patch') {
    index = 2
  } else if (type === 'minor') {
    index = 1
  } else if (type === 'major') {
    index = 0
  }

  if (index != null) {
    parts[index]++
    parts = reset(parts, index)
  }

  return parts.join('.')
}

export async function incrementVersion(type: IncrementType) {
  const loader = progress('Search version in package.json')
  const version = getCurrentVersion('package.json')
}
