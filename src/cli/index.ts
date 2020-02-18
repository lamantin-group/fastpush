#!/usr/bin/env node

import { fastpush } from './fastpush'
import { publish } from './publish'
import { ui } from '../ui'
import { git } from '../utils'

// const parsedOptions = fastpush(process.argv)
// publish(parsedOptions).catch(e => {
//   ui.error('Unhandler error: ' + e)
//   ui.error('Open issue: https://github.com/lamantin-group/fastpush/issues/new')
// })

const tag = `test/1.3.21-41`
git.commit(`${tag}`)
git.tag(tag, tag)
git.push()
