import { ask } from '../../ui/read'
import { ui } from '../../ui'

export async function assertEnvironment() {
  ui.warn('\n===ENVIRONMENT===')
  ui.message(`${JSON.stringify(process.env, null, '  ')}`)
  const isOk = await ask('Environment is ok?', true)
  if (isOk) {
    return true
  } else {
    throw 'Environment is not ok, abort'
  }
}
