import { select } from './select'
import { progress } from './progress'
import { delay } from './delay'
import { question } from './question'
import { read } from './read'
import { error } from './error'
import { success } from './success'
import { message } from './message'
import { warn } from './warn'

export const ui = {
  select: select,
  delay: delay,
  warn: warn,
  progress: progress,
  question: question,
  read: read,
  error: error,
  success: success,
  message: message,
}
