#!/usr/bin/env node
import * as Path from 'path'
import { CLI, Shim } from 'clime'
import config from '../package.json'
CLI.commandModuleExtension = '.ts'

const cli = new CLI(config.name, Path.join(__dirname, 'commands'))
const shim = new Shim(cli)
shim.execute(process.argv)
