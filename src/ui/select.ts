import inquirer = require('inquirer')

export async function select<T = string>(title: string, items: T[], extractTitle = (item: T) => `${item}`) {
  const titles = items.map(extractTitle)
  const { items: selectedTitles } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'items',
      message: title,
      choices: titles,
      default: false,
    },
  ])
  return items.filter(it => {
    return selectedTitles.includes(extractTitle(it))
  })
}
