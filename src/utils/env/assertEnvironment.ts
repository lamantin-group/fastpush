import { ask } from '../../ui/read'

export async function assertEnvironment() {
  console.log('===ENVIRONMENT===')
  console.log(process.env)
  const isOk = await ask('Environment is ok?')
  if (isOk) {
    return true
  } else {
    throw 'Environment is not ok, abort'
  }
}
