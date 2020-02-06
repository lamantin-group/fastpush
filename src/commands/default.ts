/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Command, command, param } from 'clime'
import { appDescription } from '..'
import { publish } from '../model/publish'
import { Platform } from '../platform'
import { PublishOptions } from '../PublishOptions'

const iosParam = { type: Boolean, required: false, default: false, description: 'publish ios to AppStore' }
const androidParam = { type: Boolean, required: false, default: false, description: 'publish android to Google Play' }

@command({
  description: appDescription,
  brief: 'brief',
})
export default class extends Command {
  execute(@param(iosParam) ios: boolean, @param(androidParam) android: boolean, options: PublishOptions) {
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
