import { android, ios } from '../src/fastlane'
import { gradle } from '../src/fastlane/android/gradle'
import { gym } from '../src/fastlane/ios/gym'
import { match } from '../src/fastlane/ios/match'
import { pilot } from '../src/fastlane/ios/pilot'

function publishAndroid() {
  console.log('Publish is starting')

  android([
    // some fastlane actions
    gradle('clean'),
    gradle('bundle', { build_type: 'Release' }),
  ])

  console.log('Published successfully')
}

function publishIOS() {
  console.log('Publish ios is starting')

  ios([match('appstore'), gym(), pilot()], '/Users/whalemare/Development/react-native/raduga')

  console.log('Published successfully')
}

// publishIOS()
