import inquirer = require('inquirer')

export async function read(title: string, fallback = '') {
  const result = await inquirer.prompt({
    type: 'input',
    name: 'answer',
    message: title,
    default: fallback,
  })
  return result.answer as string
}
