import { CLI, Shim } from 'clime'
import * as Path from 'path'
// todo: need determinate JS or TS file uses
// CLI.commandModuleExtension = '.ts'

const cli = new CLI('fastpush', Path.join(__dirname, 'commands'))
const shim = new Shim(cli)
const consoleArgs = process.argv as string[]

export function fastpush(args: string[] = consoleArgs) {
  shim.execute(args)
}
