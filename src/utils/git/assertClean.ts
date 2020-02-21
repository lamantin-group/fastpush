import { exec } from 'shelljs'
import { ask } from '../../ui/read'
import { ui } from '../../ui'

/**
 * Throw error if git directory is not clean on return *true* otherwise
 */
export async function assertClean(): Promise<boolean> {
  ui.message('🔍 Trying find uncommitted changes...')
  const result = exec('git status -s').trim()

  if (result.length === 0) {
    ui.message('🌝 Git directory is clean')
    return true
  } else {
    const isContinue = await ask('You has uncommitted changes. Continue?', true)
    if (isContinue) {
      ui.message('🌚 You are crazy...')
      return true
    } else {
      throw '🌚 Git directory is not clean'
    }
  }
}
