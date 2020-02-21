import chalk = require('chalk')

export function warn(text: string) {
  console.warn(chalk.yellow(text))
}
