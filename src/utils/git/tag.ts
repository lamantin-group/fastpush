import { exec } from 'shelljs'

export function tag(name: string, description = '') {
  if (description?.length > 0) {
    exec(`git tag -a ${name} -m '${description}'`)
  } else {
    exec(`git tag -a ${name}`)
  }
}
