import { fastlane, android, ios } from '../src/model/fastlane'
import { gradle } from '../src/model/fastlane/android/gradle'
import { supply } from '../src/model/fastlane/android/supply'
import { gym } from '../src/model/fastlane/ios/gym'
import { pilot } from '../src/model/fastlane/ios/pilot'
import { match } from '../src/model/fastlane/ios/match'

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

  ios(
    '/Users/whalemare/Development/react-native/raduga',
    match('appstore'),
    gym(),
    pilot(),
    // some other actions need to be executed
  )

  console.log('Published successfully')
}

// publishIOS()
