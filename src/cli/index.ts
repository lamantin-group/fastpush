#!/usr/bin/env node

import { fastpush } from './fastpush'
import { publish } from './publish'

const parsedOptions = fastpush(process.argv)
publish(parsedOptions)
