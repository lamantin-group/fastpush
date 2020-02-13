import jetpack from 'fs-jetpack'
import shell from 'shelljs'
import { mapLanesToString } from '../fastlane/mappers'
import { Lane } from '../fastlane/Lane'

export default abstract class CommonPlatformActions implements CommonPlatformActions {
  protected platformDirectory: string

  constructor(platformDirectory: string) {
    this.platformDirectory = platformDirectory
  }

  async fastlane(task: string) {
    const originalCwd = jetpack.cwd()
    const fastfilePath = this.platformDirectory + '/fastlane/Fastfile'
    const rubyPath = jetpack.path('assets/Context.rb')
    // const ruby = jetpack.read(rubyPath)
    const fastfileOriginal = jetpack.read(fastfilePath)
    const fastfileModifyed = `import '${rubyPath}'\n${fastfileOriginal}`
    jetpack.write(fastfilePath, fastfileModifyed)

    try {
      shell.cd(this.platformDirectory)
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

  async lanes(lanes: Lane[]) {
    const command = mapLanesToString(lanes)
    return this.fastlane(`context ${command}`)
  }
}
