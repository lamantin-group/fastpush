import child_process from 'child_process'
import shell from 'shelljs'
import jetpack = require('fs-jetpack')
import { FastlaneError } from './FastlaneError'
import { promisify } from 'util'

export async function fastlane(platformDirectory: string, task: string) {
  const fastfilePath = platformDirectory + '/fastlane/Fastfile'

  const contextFilePath = jetpack
    .cwd(__dirname)
    .cwd('../../assets')
    .path('Context.rb')
  // const ruby = jetpack.read(rubyPath)
  const fastfileOriginal = jetpack
    .read(fastfilePath)
    .split('\n')
    .filter(it => !it.includes('Context.rb'))
    .join('\n')

  const importLine = `import '${contextFilePath}'`
  const fastfileModifyed = `${importLine}\n${fastfileOriginal}`
  jetpack.write(fastfilePath, fastfileModifyed)

  function revertChanges() {
    try {
      jetpack.write(fastfilePath, fastfileOriginal)
    } catch (e) {
      console.warn('Unable revert changes', e)
    }
  }
  // shell.exec(`bundle install`)

  // TODO: validate user input for security policy

  // shelljs not supported interactive input/output so we should use child_process
  // child_process.execSync('cd ' + jetpack.cwd())
  const cwd = shell.pwd().stdout
  try {
    const command = `bundle exec fastlane ${task}`.trim()
    console.log('Execute fastlane in directory:', cwd, `with command:\n${command}\n`)

    const exec = promisify(child_process.exec)
    const promise = exec(`cd ${cwd} && ${command}`.trim(), { maxBuffer: Number.POSITIVE_INFINITY })
    promise.child.stdout.pipe(process.stdout)
    promise.child.stderr.pipe(process.stderr)
    promise.child.stdin.pipe(process.stdin)
    promise.child.on('exit', revertChanges)
    promise.child.on('disconnect', revertChanges)
    promise.child.on('uncaughtException', revertChanges)
    promise.child.on('unhandledRejection', revertChanges)
    await promise
  } catch (e) {
    revertChanges()
    throw new FastlaneError(e.message, e.status || e.code)
  }
}
