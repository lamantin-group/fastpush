import ora from 'ora'

export function progress(title: string) {
  return ora().start(title)
}
