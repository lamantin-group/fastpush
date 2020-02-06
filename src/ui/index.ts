import inquirer = require('inquirer')
import ora from 'ora'
import chalk from 'chalk'

export async function question(title: string) {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'answer',
      message: title,
      default: false,
    },
  ])
}

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

export function progress(title: string) {
  return ora().start(title)
}

export async function delay(millis: number) {
  return new Promise(resolve => setTimeout(resolve, millis))
}

export function error(title: string) {
  return chalk(title).fontcolor('red')
}
