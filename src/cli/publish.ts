import { ios } from '../fastlane'
import { android, gradle, supply, GradleArgTask } from '../fastlane/android'
import { gym } from '../fastlane/ios/gym'
import { match } from '../fastlane/ios/match'
import { pilot } from '../fastlane/ios/pilot'
import { IOSPlatform, Platform, PlatformActions } from '../model/platform'
import { AndroidPlatform } from '../model/platform/AndroidPlatform'
import { ui } from '../ui'
import { git } from '../utils'
import { env } from '../utils'
import { PublishOptions } from './PublishOptions'
import { assertPlatforms, incrementPackageJson, Version } from './utils'

export async function publish(platforms: Platform[], options: PublishOptions) {
  const selectedPlatforms = await assertPlatforms(platforms)
  env.add(options.envFile.fullName)

  await git.assertClean()
  await env.assert()

  const [oldVersion, newVersion] = await incrementPackageJson(
    `${options.project.fullName}/package.json`,
    options.increment,
  )
  ui.success(`Up package.json version from [${oldVersion}] -> [${newVersion}]`)

  if (selectedPlatforms.find(it => it === 'android')) {
    const androidPlatform = new AndroidPlatform(options.project.fullName)
    try {
      await process(options, androidPlatform, newVersion)
    } catch (e) {
      throw e
    } finally {
      // androidPlatform.setVersionName(oldVersion)
      // ui.success(`Set package.json version [${newVersion}] -> [${oldVersion}] back`)
    }
  }

  if (selectedPlatforms.find(it => it === 'ios')) {
    await process(options, new IOSPlatform(options.project.fullName), newVersion)
  }
}

async function process(options: PublishOptions, platform: PlatformActions, version: Version) {
  const [oldBuildNumber, newBuildNumber] = await platform.incrementBuildNumber()
  ui.success(`Update ${platform.type} versionCode [${oldBuildNumber}] -> [${newBuildNumber}]`)

  const [oldVersion, newVersion] = await platform.setVersionName(version)
  ui.success(`Update ${platform.type} versionName [${oldVersion}] -> [${newVersion}]`)

  // TODO: should be refactored
  if (platform.type === 'ios') {
    ios([match('appstore'), gym(), pilot()])
  } else if (platform.type === 'android') {
    android([
      gradle('clean'),
      // todo: validate GradleArgTask
      gradle(options.androidBuild as GradleArgTask, {
        flavor: options.flavor,
        build_type: 'Release',
      }),
      supply({ track: options.track }),
    ])
  }

  git.commit(`Up version ${platform.type} [${oldVersion}] => [${newVersion}]`)
  git.tag(`${platform}/${newVersion}-${newBuildNumber}`)
  git.push()
}
