#!/usr/bin/env node
import * as Path from 'path'
import { CLI, Shim } from 'clime'
import config from '../package.json'
import boxen, { BorderStyle } from 'boxen'
CLI.commandModuleExtension = '.ts'

export const appDescription = boxen('publish - helper for publishing react-native projects via fastlane', {
  padding: 1,
  borderStyle: BorderStyle.Round,
})

const cli = new CLI(config.name, Path.join(__dirname, 'commands'))
const shim = new Shim(cli)
shim.execute(process.argv)
