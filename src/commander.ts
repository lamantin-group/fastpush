#!/usr/bin/env node
import commander from 'commander'
import config from '../package.json'
import options from './options'

const app = new commander.Command(config.name)
  .version(config.version)
  .description(config.description)
  .parse(process.argv)

options.forEach(option => {
  app.option(option.name.join(', '), option.description, option.default)
})

app.help()
