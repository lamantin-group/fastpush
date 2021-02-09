import inquirer = require('inquirer')

export async function question(title: string, defaultAnswer = false) {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'answer',
      message: title,
      default: defaultAnswer,
    },
  ])
  return answer.answer
}
