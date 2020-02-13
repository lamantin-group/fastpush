// import { gym } from '../src/fastlane/ios/gym'
// import { match } from '../src/fastlane/ios/match'
// import { pilot } from '../src/fastlane/ios/pilot'
// import AndroidPlatform from '../src/model/platform/AndroidPlatform'
// import { message } from '../src/ui'

// const project = '/Users/whalemare/Development/react-native/raduga'

// async function publishAndroid() {
//   console.log('Publish is starting')

//   const androidPlatform = new AndroidPlatform(project)
//   const buildNumber = await androidPlatform.getBuildNumber()
//   message(`Your build number [${buildNumber}]`)

//   // android([
//   //   // some fastlane actions
//   //   gradle('clean'),
//   //   gradle('bundle', { build_type: 'Release' }),
//   // ])

//   console.log('Published successfully')
// }

// function publishIOS() {
//   console.log('Publish ios is starting')

//   ios([match('appstore'), gym(), pilot()], project)

//   console.log('Published successfully')
// }

// publishAndroid()
