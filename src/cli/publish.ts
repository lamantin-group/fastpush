import { ios } from '../fastlane'
import { android, gradle, GradleArgs, supply } from '../fastlane/android'
import { gym } from '../fastlane/ios/gym'
import { match } from '../fastlane/ios/match'
import { pilot } from '../fastlane/ios/pilot'
import { IOSPlatform, Platform, PlatformActions, platformTypes } from '../model/platform'
import { AndroidPlatform } from '../model/platform/AndroidPlatform'
import { ui } from '../ui'
import { env, git } from '../utils'
import { FastpushResult } from './fastpush'
import { Hooks } from './hooks'
import { assertPlatforms, incrementPackageJson, Version } from './utils'
import shell from 'shelljs'

export const defaultHooks: Hooks = {
  onFinish: null,
  onStart: async (options: FastpushResult) => {
    env.add(options.env)

    if (options.silent) {
      // don't assert clean
      // don't assert environment
    } else {
      await git.assertClean()
      await env.assert()
    }
  },

  provideAndroidLanes: (options: FastpushResult) => {
    const buildPayload: GradleArgs = {
      build_type: 'Release',
    }
    if (options.flavor) {
      // const flavorCapitalized = options.flavor.charAt(0).toUpperCase() + options.flavor.substring(1)
      buildPayload.flavor = options.flavor
    }

    return [
      gradle('clean'),
      // todo: validate GradleArgTask
      gradle(options.build, buildPayload),
      supply({ track: options.track }),
    ]
  },

  provideIOSLanes: (options: FastpushResult) => {
    return [match('appstore'), gym(), pilot()]
  },

  onPostPublish: async (platform: PlatformActions, versions: [Version, Version], buildNumbers: [number, number]) => {
    const [oldVersion, version] = versions
    const [oldBuild, build] = buildNumbers

    const tag = `${platform}/${version}-${build}`
    const whoami = process.env.USER || ''
    git.commit(`Up version ${tag}`)
    git.tag(tag, `Up version by ${whoami}`)
    git.push()
  },
}

export async function publish(options: FastpushResult, passedHooks?: Hooks) {
  const hooks = {
    ...defaultHooks,
    ...passedHooks,
  }
  let platforms: Platform[] = []
  if (options.android) {
    platforms.push('android')
  }
  if (options.ios) {
    platforms.push('ios')
  }

  if (options.silent) {
    // don't apply changes to platforms
    if (!platforms || platforms.length <= 0) {
      throw 'You should specify at least 1 platform for processing: ' + platformTypes
    }
  } else {
    platforms = await assertPlatforms(platforms)
  }
  await hooks?.onStart(options)

  const [oldVersion, newVersion] = await incrementPackageJson(`${options.project}/package.json`, options.increment)
  ui.success(`Up package.json version from [${oldVersion}] -> [${newVersion}]`)

  if (platforms.find(it => it === 'android')) {
    const androidPlatform = new AndroidPlatform(options.project)
    await distribute(options, androidPlatform, newVersion, hooks)
  }

  if (platforms.find(it => it === 'ios')) {
    await distribute(options, new IOSPlatform(options.project), newVersion, hooks)
  }

  await hooks?.onFinish()
}

async function distribute(options: FastpushResult, platform: PlatformActions, version: Version, hooks: Hooks) {
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
