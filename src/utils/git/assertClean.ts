import { exec } from 'shelljs'
import { ask } from '../../ui/read'

/**
 * Throw error if git directory is not clean on return *true* otherwise
 */
export async function assertClean(): Promise<boolean> {
  console.log('🔍 Trying find uncommitted changes...')
  const result = exec('git status -s').trim()

  if (result.length === 0) {
    console.log('Git directory is clean')
    return true
  } else {
    const isContinue = await ask('You has uncommitted changes. Continue?', false)
    if (isContinue) {
      console.log('You are crazy...')
      return true
    } else {
      throw 'Git directory is not clean'
    }
  }
}
