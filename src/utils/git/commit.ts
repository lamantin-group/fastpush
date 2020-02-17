import { exec } from 'shelljs'

export function commit(message: string) {
  exec('git commit -a -m "' + message + '"')
}
