import { android, gradle, supply } from '../fastlane/android'
import { Platform, IOSPlatform } from '../model/platform'
import { AndroidPlatform } from '../model/platform/AndroidPlatform'
import { ui } from '../ui'
import { PublishOptions } from './PublishOptions'
import { assertPlatforms, incrementPackageJson, Version } from './utils'
import { ios } from '../fastlane'
import { gym } from '../fastlane/ios/gym'
import { pilot } from '../fastlane/ios/pilot'
import { match } from '../fastlane/ios/match'

export async function publish(platforms: Platform[], options: PublishOptions) {
  const selectedPlatforms = await assertPlatforms(platforms)

  const [oldVersion, newVersion] = await incrementPackageJson(
    `${options.project.fullName}/package.json`,
    options.increment,
  )
  ui.success(`Up package.json version from [${oldVersion}] -> [${newVersion}]`)

  if (selectedPlatforms.find(it => it === 'android')) {
    await processAndroid(options, new AndroidPlatform(options.project.fullName), newVersion)
  }

  if (selectedPlatforms.find(it => it === 'ios')) {
    await processIOS(options, new IOSPlatform(options.project.fullName), newVersion)
  }
}

async function processIOS(options: PublishOptions, iosPlaftorm: IOSPlatform, newVersion: Version) {
  const [oldBuildNumber, newBuildNumber] = await iosPlaftorm.incrementBuildNumber()
  ui.success(`Update ios versionCode [${oldBuildNumber}] -> [${newBuildNumber}]`)

  const [oldVersion, iosNewVersion] = await iosPlaftorm.setVersionName(newVersion)
  ui.success(`Update ios versionName [${oldVersion}] -> [${iosNewVersion}]`)

  ios([
    // some actions
    match('appstore'),
    gym(),
    pilot(),
  ])
}

async function processAndroid(options: PublishOptions, androidPlaftorm: AndroidPlatform, newVersion: Version) {
  const [oldBuildNumber, newBuildNumber] = await androidPlaftorm.incrementBuildNumber()
  ui.success(`Update android versionCode [${oldBuildNumber}] -> [${newBuildNumber}]`)

  const [oldVersion, androidNewVersion] = await androidPlaftorm.setVersionName(newVersion)
  ui.success(`Update android versionName [${oldVersion}] -> [${androidNewVersion}]`)

  android([
    // some actions
    gradle('clean'),
    gradle('bundle', {
      build_type: 'Release',
    }),
    supply({ track: 'beta', rollout: 50 }),
  ])
}
