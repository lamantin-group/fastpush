import { android, gradle } from '../src'

const project = '/Users/whalemare/Development/react-native/raduga'

async function publishAndroid() {
  android([gradle('clean')])
}
