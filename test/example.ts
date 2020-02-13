import { fastlane, android } from '../src/model/fastlane'
import { gradle } from '../src/model/fastlane/android/gradle'
import { supply } from '../src/model/fastlane/android/supply'

function publishAndroid() {
  console.log('Publish is starting')

  android(
    '/Users/whalemare/Development/react-native/myholiday',
    gradle('clean'),
    gradle('bundle', { build_type: 'Release' }),
    // supply({ track: 'beta' }),
  )

  console.log('Published successfully')
}

publishAndroid()
