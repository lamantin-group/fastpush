import { Lane, AndroidLane } from './lane'
import jetpack = require('fs-jetpack')
import shell from 'shelljs'
import { mapLanesToString } from './mappers'

export function android(projectDirectory: string, ...lanes: AndroidLane[]) {
  const command = mapLanesToString(lanes)
  return fastlane(projectDirectory + '/android', `context ${command}`)
}

export async function fastlane(platformDirectory: string, task: string) {
  const originalCwd = jetpack.cwd()
  const fastfilePath = platformDirectory + '/fastlane/Fastfile'
  const rubyPath = jetpack.path('assets/Context.rb')
  // const ruby = jetpack.read(rubyPath)
  const fastfileOriginal = jetpack.read(fastfilePath)
  const fastfileModifyed = `import '${rubyPath}'\n${fastfileOriginal}`
  jetpack.write(fastfilePath, fastfileModifyed)

  try {
    shell.cd(platformDirectory)
    console.log(jetpack.cwd())
    const command = `bundle exec fastlane ` + task

    // TODO: validate user input for security policy
    shell.exec(command.trim())
  } catch (e) {
    throw e
  } finally {
    jetpack.write(fastfilePath, fastfileOriginal)
    shell.cd(originalCwd)
  }
}
