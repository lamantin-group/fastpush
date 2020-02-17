import { ask } from '../../ui/read'

export async function assertEnvironment() {
  console.log('\n===ENVIRONMENT===')
  console.log(process.env)
  const isOk = await ask('Environment is ok?', true)
  if (isOk) {
    return true
  } else {
    throw 'Environment is not ok, abort'
  }
}
