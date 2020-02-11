import shell from 'shelljs'

export default abstract class CommonPlatformActions implements CommonPlatformActions {
  protected platformDirectory: string

  constructor(platformDirectory: string) {
    this.platformDirectory = platformDirectory
  }

  async fastlane(task: string) {
    shell.cd(this.platformDirectory)
    const command = `fastlane ` + task

    // TODO: validate user input for security policy
    shell.exec(command.trim())
  }
}
