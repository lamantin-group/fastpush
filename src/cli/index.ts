#!/usr/bin/env node

import { fastpush } from './fastpush'
import { publish } from './publish'
import { ui } from '../ui'

const parsedOptions = fastpush(process.argv)
publish(parsedOptions).catch(e => {
  ui.error('Unhandler error: ' + e)
  ui.error('Open issue: https://github.com/lamantin-group/fastpush/issues/new')
})
