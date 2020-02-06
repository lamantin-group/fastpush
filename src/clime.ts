#!/usr/bin/env node

// publish ios

import * as Path from 'path'
import { CLI, Shim } from 'clime'
import config from '../package.json'

const cli = new CLI(config.name, Path.join(__dirname, 'command'))
const shim = new Shim(cli)
// shim.execute('publish ios'.split(' '))
shim.execute(process.argv)

// import ora from 'ora'
// import inquirer from 'inquirer'

// console.log('Hello world 2')

// function question() {
//   inquirer
//     .prompt([
//       {
//         type: 'confirm',
//         name: 'name',
//         message: 'Hello?',
//         default: true,
//       },
//     ])
//     .then(answers => {
//       console.log(answers)
//     })
// }

// function loader() {
//   const loader = ora().start('Starting loading')
//   setTimeout(() => {
//     loader.text = 'Loading in progress'
//     setTimeout(() => {
//       loader.stopAndPersist({
//         text: 'Loading is finished',
//       })
//     }, 2000)
//   }, 2000)
// }
