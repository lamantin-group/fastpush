#!/usr/bin/env node

import { fastpush } from './fastpush'

const result = fastpush(process.argv)
console.log(result)
// publish('android', result)
