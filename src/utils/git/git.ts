import { commit } from './commit'
import { tag } from './tag'
import { assertClean } from './assertClean'
import { push } from './push'

export const git = {
  commit: commit,
  tag: tag,
  assertClean: assertClean,
  push: push,
}
