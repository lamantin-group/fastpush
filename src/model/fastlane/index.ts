import shell from 'shelljs'
import { AndroidLane, IOSLane } from './Lane'
import { mapLanesToString } from './mappers'
import jetpack = require('fs-jetpack')
import child_process from 'child_process'

export function android(lanes: AndroidLane[]): void
export function android(lanes: AndroidLane[], projectDirectory: string): void

export function android(lanes: AndroidLane[], projectDirectory: string = jetpack.cwd()) {
  const command = mapLanesToString(lanes)
  fastlane(projectDirectory + '/android', `context ${command}`)
}

export function ios(lanes: IOSLane[]): void
export function ios(lanes: IOSLane[], projectDirectory: string): void

export function ios(lanes: IOSLane[], projectDirectory: string = jetpack.cwd()) {
  const command = mapLanesToString(lanes)
  fastlane(projectDirectory + '/ios', `context ${command}`)
}

function fastlane(platformDirectory: string, task: string) {
  const originalCwd = jetpack.cwd()
  const fastfilePath = platformDirectory + '/fastlane/Fastfile'
  const contextFilePath = jetpack.path('assets/Context.rb')
  // const ruby = jetpack.read(rubyPath)
  const fastfileOriginal = jetpack.read(fastfilePath)
  const fastfileModifyed = `import '${contextFilePath}'\n${fastfileOriginal}`
  jetpack.write(fastfilePath, fastfileModifyed)

  try {
    shell.cd(platformDirectory)
    console.log('Execute fastlane in directory:', jetpack.cwd())
    const command = `bundle exec fastlane ` + task

    // shell.exec(`bundle install`)

    // TODO: validate user input for security policy

    // shelljs not supported interactive input/output so we should use child_process
    child_process.execSync('cd ' + platformDirectory)
    child_process.execSync(command.trim(), { stdio: 'inherit' })
  } catch (e) {
    throw e
  } finally {
    jetpack.write(fastfilePath, fastfileOriginal)
    child_process.execSync(originalCwd)
  }
}
