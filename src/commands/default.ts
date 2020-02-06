/* eslint-disable prettier/prettier */
import { Command, command, param, option } from 'clime';
import { appDescription } from '..';
import { PublishOptions } from '../options';
import { publish } from '../model/publish';
import { Platform } from '../platform';

@command({
  description: appDescription,
  brief: 'brief',
})
export default class extends Command {
  execute(
  @param({type: Boolean, required: false, default: false, description: "publish ios to AppStore"}) ios: boolean,
    @param({type: Boolean, required: false, default: false, description: "publish android to Google Play"}) android: boolean,
    options: PublishOptions
  ) {
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
