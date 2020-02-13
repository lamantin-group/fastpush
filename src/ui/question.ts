import inquirer = require('inquirer')

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
