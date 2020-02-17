import { exec } from 'shelljs'

/**
 * Push code and tags
 */
export function push() {
  exec('git push')
  exec('git push --tags')
}
