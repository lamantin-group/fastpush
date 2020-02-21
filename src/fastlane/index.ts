import child_process from 'child_process'
import shell from 'shelljs'
import jetpack = require('fs-jetpack')

export * from './android'
export * from './ios'

export function fastlane(platformDirectory: string, task: string) {
  const fastfilePath = platformDirectory + '/fastlane/Fastfile'

  const contextFilePath = jetpack
    .cwd(__dirname)
    .cwd('../../assets')
    .path('Context.rb')
  // const ruby = jetpack.read(rubyPath)
  const fastfileOriginal = jetpack.read(fastfilePath)
  const fastfileModifyed = `import '${contextFilePath}'\n${fastfileOriginal}`
  jetpack.write(fastfilePath, fastfileModifyed)

  try {
    // shell.exec(`bundle install`)

    // TODO: validate user input for security policy

    // shelljs not supported interactive input/output so we should use child_process
    // child_process.execSync('cd ' + jetpack.cwd())
    console.log('Execute fastlane in directory:', platformDirectory)
    child_process.execSync(`bundle exec fastlane ${task}`.trim(), { stdio: 'inherit' })
  } catch (e) {
    throw e
  } finally {
    jetpack.write(fastfilePath, fastfileOriginal)
  }
}
