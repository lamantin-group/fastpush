import dotenv = require('dotenv')
import { ui } from '../../ui'

export function addFile(file: string) {
  if (!file || file.length <= 0) {
    ui.error(`Can't read env file: ${file}`)
    return null
  }
  return dotenv.config({ path: file })
}
