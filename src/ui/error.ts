import chalk from 'chalk'

export function error(title: string) {
  console.error(chalk.red(title))
}
