import { android, gradle } from '../src'
import TelegramBot from 'node-telegram-bot-api'
import { CLI } from 'clime'
import { fastpush } from '../build/cli/fastpush'
const project = '/Users/whalemare/Development/react-native/myholiday'

async function run() {
  fastpush()
}

run()
