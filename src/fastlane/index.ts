import child_process from 'child_process'
import shell from 'shelljs'
import jetpack = require('fs-jetpack')
import { ui } from '../ui'
import * as path from 'path'

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
  const importLine = `import '${contextFilePath}'`

  const hadFolder = jetpack.exists(path.dirname(fastfilePath))
  if (!fastfileOriginal) {
    jetpack.file(fastfilePath)
  }

  if (fastfileOriginal?.includes('Context.rb')) {
    ui.message(`Fastfile ${contextFilePath} already contains Context.rb`)
  } else {
    const fastfileModifyed = `${importLine}\n${fastfileOriginal || ''}`
    jetpack.write(fastfilePath, fastfileModifyed)
  }

  function revertChanges() {
    if (fastfileOriginal) {
      jetpack.write(fastfilePath, fastfileOriginal)
    } else {
      const removePath = hadFolder ? fastfilePath : path.dirname(fastfilePath)
      jetpack.remove(removePath)
    }
  }

  process.on('exit', revertChanges)
  process.on('disconnect', revertChanges)
  process.on('uncaughtException', revertChanges)
  process.on('unhandledRejection', revertChanges)

  try {
    // shell.exec(`bundle install`)

    // TODO: validate user input for security policy

    // shelljs not supported interactive input/output so we should use child_process
    // child_process.execSync('cd ' + jetpack.cwd())
    const cwd = shell.pwd().stdout
    try {
      console.log('Execute fastlane in directory:', cwd)
      child_process.execSync(`cd ${platformDirectory} && bundle exec fastlane ${task}`.trim(), { stdio: 'inherit' })
    } catch (e) {
      throw e
    } finally {
      child_process.execSync(`cd ${cwd}`)
    }
  } catch (e) {
    throw e
  } finally {
    revertChanges()
  }
}
