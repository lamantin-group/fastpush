#!/usr/bin/env node

import { CLI, Shim } from 'clime'
import * as Path from 'path'
// todo: need determinate JS or TS file uses
// CLI.commandModuleExtension = '.ts'

const cli = new CLI('fastpush', Path.join(__dirname, 'commands'))
const shim = new Shim(cli)
shim.execute(process.argv)
