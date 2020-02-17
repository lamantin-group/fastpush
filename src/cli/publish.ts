import { ios } from '../fastlane'
import { android, gradle, GradleArgs, supply } from '../fastlane/android'
import { gym } from '../fastlane/ios/gym'
import { match } from '../fastlane/ios/match'
import { pilot } from '../fastlane/ios/pilot'
import { IOSPlatform, Platform, PlatformActions } from '../model/platform'
import { AndroidPlatform } from '../model/platform/AndroidPlatform'
import { ui } from '../ui'
import { env, git } from '../utils'
import { Hooks } from './hooks'
import { PublishOptions } from './PublishOptions'
import { incrementPackageJson, Version } from './utils'

const defaultHooks: Hooks = {
  onFinish: null,
  onStart: async (options: PublishOptions) => {
    env.add(options.envFile.fullName)

    await git.assertClean()
    await env.assert()
  },

  provideAndroidLanes: (options: PublishOptions) => {
    const buildPayload: GradleArgs = {
      build_type: 'Release',
    }
    if (options.flavor) {
      const flavorCapitalized = options.flavor.charAt(0).toUpperCase() + options.flavor.substring(1)
      buildPayload.flavor = flavorCapitalized
    }

    return [
      gradle('clean'),
      // todo: validate GradleArgTask
      gradle(options.androidBuild, buildPayload),
      supply({ track: options.track }),
    ]
  },

  provideIOSLanes: (options: PublishOptions) => {
    return [match('appstore'), gym(), pilot()]
  },

  onPostPublish: async (platform: PlatformActions, versions: [Version, Version], buildNumbers: [number, number]) => {
    const [oldVersion, newVersion] = versions
    const [oldBuild, newBuild] = buildNumbers

    git.commit(`Up version ${platform.type} [${oldVersion}] => [${newVersion}]`)
    git.tag(`${platform}/${newVersion}-${newBuild}`)
    git.push()
  },
}

export async function publish(platforms: Platform[], options: PublishOptions, hooks: Hooks = defaultHooks) {
  await hooks?.onStart(options)

  const [oldVersion, newVersion] = await incrementPackageJson(
    `${options.project.fullName}/package.json`,
    options.increment,
  )
  ui.success(`Up package.json version from [${oldVersion}] -> [${newVersion}]`)

  if (platforms.find(it => it === 'android')) {
    const androidPlatform = new AndroidPlatform(options.project.fullName)
    await process(options, androidPlatform, newVersion, hooks)
  }

  if (platforms.find(it => it === 'ios')) {
    await process(options, new IOSPlatform(options.project.fullName), newVersion, hooks)
  }

  await hooks?.onFinish()
}

async function process(options: PublishOptions, platform: PlatformActions, version: Version, hooks: Hooks) {
  const [oldBuildNumber, newBuildNumber] = await platform.incrementBuildNumber()
  ui.success(`Update ${platform.type} versionCode [${oldBuildNumber}] -> [${newBuildNumber}]`)

  const [oldVersion, newVersion] = await platform.setVersionName(version)
  ui.success(`Update ${platform.type} versionName [${oldVersion}] -> [${newVersion}]`)

  if (platform.type === 'ios') {
    ios(hooks.provideIOSLanes(options))
  } else if (platform.type === 'android') {
    android(hooks.provideAndroidLanes(options))
  } else {
    throw `Unexpected platform type ${platform.type}`
  }

  await hooks?.onPostPublish(platform, [oldVersion, newVersion], [oldBuildNumber, newBuildNumber])
}
