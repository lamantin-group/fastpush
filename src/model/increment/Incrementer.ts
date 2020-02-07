import { IncrementType } from '../../PublishOptions'

export class Incrementer {
  /**
   * Increment version or return null if can`t do it
   * @param from semver string like "0.0.0"
   * @param type patch, minor, major
   */
  static increment(from: string, type: IncrementType) {
    if (!from) return null
    if (type === 'none') return from

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

  static tryMigrateVersion(from: string) {
    if (!from) return null

    let parts = from.split('.')

    // check that contains only numbers
    for (let index = 0; index < parts.length; index++) {
      const element = parts[index]
      const parsed = parseInt(element)
      if (!Number.isInteger(parsed)) {
        return null
      }
    }

    if (parts.length >= 3) {
      parts = parts.slice(0, 3)
    } else if (parts.length >= 2) {
      parts = parts.slice(0, 2)
      parts.push('0')
    } else if (parts.length >= 1) {
      parts = parts.slice(0, 1)
      parts.push('0')
      parts.push('0')
    }

    return parts.join('.')
  }
}
