import inquirer = require('inquirer')

export async function ask(question: string, fallback = false) {
  const result = await inquirer.prompt({
    type: 'confirm',
    name: 'answer',
    message: question,
    default: fallback,
  })

  return result.answer as string
}

export async function read(title: string, fallback = '') {
  const result = await inquirer.prompt({
    type: 'input',
    name: 'answer',
    message: title,
    default: fallback,
  })

  inquirer.prompt({})

  return result.answer as string
}
