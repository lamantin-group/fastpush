import { android, gradle, supply } from '../fastlane/android'
import { Platform } from '../model/platform'
import { AndroidPlatform } from '../model/platform/AndroidPlatform'
import { ui } from '../ui'
import { PublishOptions } from './PublishOptions'
import { assertPlatforms, incrementPackageJson, Version } from './utils'

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
    ui.error('ios not supported yet')
    // const iosPlatform = new IOSPlatformActions(options.project.fullName)
  }
}

async function processAndroid(options: PublishOptions, androidPlaftorm: AndroidPlatform, newVersion: Version) {
  const [oldBuildNumber, newBuildNumber] = await androidPlaftorm.incrementBuildNumber()
  ui.success(`Update android versionCode [${oldBuildNumber}] -> [${newBuildNumber}]`)

  const [oldVersion, androidNewVersion] = await androidPlaftorm.setVersionName(newVersion)
  ui.success(`Update android versionName [${oldVersion}] -> [${androidNewVersion}]`)

  android([
    gradle('clean'),
    gradle('assemble', {
      build_type: 'Release',
    }),
    supply({ track: options.track, rollout: options.rollout }),
  ])
}
