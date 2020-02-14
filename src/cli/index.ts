#!/usr/bin/env node

import boxen, { BorderStyle } from 'boxen'
import { CLI, Shim } from 'clime'
import * as Path from 'path'
import config from '../../package.json'
// todo: need determinate JS or TS file uses
// CLI.commandModuleExtension = '.ts'

const cli = new CLI(config.name, Path.join(__dirname, 'commands'))
const shim = new Shim(cli)
shim.execute(process.argv)
