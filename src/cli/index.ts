#!/usr/bin/env node

import { ui } from '../ui'
import { fastpush } from './fastpush'
import { publish } from './publish'

const parsedOptions = fastpush(process.argv)
publish(parsedOptions).catch(e => {
  ui.error('Unhandler error: ' + e)
  ui.error('Open issue: https://github.com/lamantin-group/fastpush/issues/new')
})
