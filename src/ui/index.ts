import inquirer = require('inquirer')
import chalk from 'chalk'

export async function select<T = string>(title: string, items: T[]) {
  const result = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'items',
      message: title,
      choices: items,
      default: false,
    },
  ])
  return result.items
}

export function error(title: string) {
  console.error(chalk.red(title))
}

export function success(title: string) {
  console.log(chalk.green(title))
}
