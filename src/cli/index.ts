#!/usr/bin/env node

import { fastpush } from './fastpush'
import { publish } from './publish'

const parsedOptions = fastpush(process.argv)
console.log(parsedOptions)
// publish(parsedOptions).catch(e => {
//   console.error('Unhandler error: ', e)
//   console.warn('Open issue: https://github.com/lamantin-group/fastpush/issues/new')
// })
