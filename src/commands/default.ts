/* eslint-disable prettier/prettier */
import { Command, command, param } from 'clime';
import { appDescription } from '..';

@command({
  description: appDescription,
  brief: 'brief',
})
export default class extends Command {
  execute(
  @param({type: Boolean, required: false, default: false, description: "publish ios to AppStore"}) ios: boolean,
    @param({type: Boolean, required: false, default: false, description: "publish android to Google Play"}) android: boolean,
  ) {
    return `ios?=${ios}\nandroid?=${android}`
  }
}
