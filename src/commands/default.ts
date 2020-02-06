/* eslint-disable prettier/prettier */
import { Command, command, param, ParamOptions } from 'clime'
import { Platform } from '../platform/Platform'
import logo from 'asciiart-logo'
import boxen, { BorderStyle } from 'boxen';

const appDescription = boxen("publish - helper for publishing react-native projects via fastlane", {
  padding: 1, 
  borderStyle: BorderStyle.Round,
})

const PlatformParam: ParamOptions<Platform[]> = {
  description: 'Select platform for publishing',
  default: ['android', 'ios'],
}

@command({
  description: appDescription,
  brief: 'brief',
})
export default class extends Command {
  execute(@param(PlatformParam) platform: Platform[]) {
    return `Hello, ${platform}!`
  }
}
