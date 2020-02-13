/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Command, command, param, ParamOptions } from 'clime'
import { appDescription } from '..'
import { publish } from '../../model/publish'
import { Platform } from '../../model/platform'
import { PublishOptions } from '../PublishOptions'

const iosParam: ParamOptions<boolean> = { type: Boolean, required: false, description: 'publish ios to AppStore' }
const androidParam: ParamOptions<boolean> = {
  type: Boolean,
  required: false,
  description: 'publish android to Google Play',
}

@command({
  description: appDescription,
  brief: 'brief',
})
export default class extends Command {
  execute(@param(androidParam) android: boolean, @param(iosParam) ios: boolean, options: PublishOptions) {
    console.log('ios = ', ios, 'android = ', android, 'options =', options)
    const platforms: Platform[] = []
    if (ios) {
      platforms.push('ios')
    }
    if (android) {
      platforms.push('android')
    }
    publish(platforms, options)
  }
}
