// /* eslint-disable @typescript-eslint/consistent-type-assertions */
// import { Platform } from '../../model/platform'
// import { publish } from '../publish'
// import { PublishOptions } from '../PublishOptions'
// import { assertPlatforms } from '../utils'
// import boxen = require('boxen')

// const appDescription = boxen('fastpush - helper for publishing react-native projects via fastlane', {
//   padding: 1,
//   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//   // @ts-ignore
//   borderStyle: 'round',
// })

// const iosParam: ParamOptions<boolean> = { type: Boolean, required: false, description: 'publish ios to AppStore' }
// const androidParam: ParamOptions<boolean> = {
//   type: Boolean,
//   required: false,
//   description: 'publish android to Google Play',
// }

// @command({
//   description: appDescription,
//   brief: 'brief',
// })
// export default class extends Command {
//   async execute(@param(androidParam) android: boolean, @param(iosParam) ios: boolean, options: PublishOptions) {
//     const platforms: Platform[] = []
//     if (ios) {
//       platforms.push('ios')
//     }
//     if (android) {
//       platforms.push('android')
//     }

//     const selectedPlatforms = await assertPlatforms(platforms)

//     publish(selectedPlatforms, options)
//   }
// }
