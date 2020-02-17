import { CLI, Shim } from 'clime'
import * as Path from 'path'
// todo: need determinate JS or TS file uses
// CLI.commandModuleExtension = '.ts'

const cli = new CLI('fastpush', Path.join(__dirname, 'commands'))
const shim = new Shim(cli)
const args = process.argv

export function fastpush() {
  shim.execute(args)
}
