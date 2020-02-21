import { ask } from '../../ui/read'
import { ui } from '../../ui'

export async function assertEnvironment() {
  ui.warn('\n===ENVIRONMENT===')
  ui.message(`${process.env}`)
  const isOk = await ask('Environment is ok?', true)
  if (isOk) {
    return true
  } else {
    throw 'Environment is not ok, abort'
  }
}
