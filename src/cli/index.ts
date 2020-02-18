#!/usr/bin/env node

import { fastpush } from './fastpush'
import { publish } from './publish'

const result = fastpush(process.argv)
console.log(result)
// publish('android', result)
