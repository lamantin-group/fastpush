import shell from 'shelljs'
import { FastpushResult } from './cli/fastpush'
import { Hooks } from './cli/hooks'
import { assertPlatforms, Version } from './cli/utils'
import { ios } from './fastlane'
import { android, gradle, GradleArgs, supply } from './fastlane/android'
import { gym } from './fastlane/ios/gym'
import { match } from './fastlane/ios/match'
import { pilot } from './fastlane/ios/pilot'
import { incrementPackageJson } from './model/incrementPackageJson'
import { IOSPlatform, Platform, PlatformActions, platformTypes } from './model/platform'
import { AndroidPlatform } from './model/platform/AndroidPlatform'
import { ui } from './ui'
import { env, git } from './utils'

export const defaultHooks: Hooks = {
  onFinish: null,
  onStart: async (options: FastpushResult) => {
    if (options.env) {
      if (!options.silent) {
        ui.message('Add environment file:' + options.env)
      }
      env.add(options.env)
    }

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
      supply({
        track: options.track,
        skip_upload_changelogs: options.skip,
        skip_upload_images: options.skip,
        skip_upload_metadata: options.skip,
        skip_upload_screenshots: options.skip,
      }),
    ]
  },

  provideIOSLanes: (options: FastpushResult) => {
    return [
      match('appstore'),
      gym({ clean: true, scheme: options.scheme }),
      pilot({ skip_waiting_for_build_processing: true, skip_submission: true }),
    ]
  },

  onPostPublish: async (platform: PlatformActions, versions: [Version, Version], buildNumbers: [number, number]) => {
    const [oldVersion, version] = versions
    const [oldBuild, build] = buildNumbers

    const tag = `${platform.type}/${version}-${build}`
    const whoami = process.env.USER || ''
    git.commit(`Up version ${tag}`)
    git.tag(tag, `Up version by ${whoami}`)
    git.push()
  },
}

export async function publish(options: FastpushResult, passedHooks?: Hooks) {
  ui.success('==fastpush==')
  ui.success('Setup for project: ' + options.project)
  shell.cd(options.project)
  // child_process.execSync('cd ' + options.project)

  const hooks = {
    ...defaultHooks,
    ...passedHooks,
  }

  await hooks.onStart?.(options)

  let platforms: Platform[] = []
  if (options.android) {
    platforms.push('android')
  }
  if (options.ios) {
    platforms.push('ios')
  }

  ui.success(`Publishing for: [${platforms.join(', ')}]`)

  try {
    if (options.silent) {
      // don't apply changes to platforms
      if (!platforms || platforms.length <= 0) {
        throw 'You should specify at least 1 platform for processing: ' + platformTypes
      }
    } else {
      platforms = await assertPlatforms(platforms)
    }

    const [oldVersion, newVersion] = await incrementPackageJson(options.increment, `${options.project}/package.json`)
    ui.success(`Up package.json version from [${oldVersion}] -> [${newVersion}]`)

    if (platforms.includes('android')) {
      const androidPlatform = new AndroidPlatform(options.project)
      await distribute(options, androidPlatform, newVersion, hooks)
    }

    if (platforms.includes('ios')) {
      await distribute(options, new IOSPlatform(options.project), newVersion, hooks)
    }

    await hooks.onFinish?.()
  } catch (e) {
    await hooks.onError?.(e)
  }
}

async function distribute(options: FastpushResult, platform: PlatformActions, version: Version, hooks: Hooks) {
  const [oldBuildNumber, newBuildNumber] = await platform.incrementBuildNumber()
  ui.success(`Update ${platform.type} versionCode [${oldBuildNumber}] -> [${newBuildNumber}]`)

  const [oldVersion, newVersion] = await platform.setVersionName(version)
  ui.success(`Update ${platform.type} versionName [${oldVersion}] -> [${newVersion}]`)

  if (platform.type === 'ios') {
    ios(hooks.provideIOSLanes(options), options.project)
  } else if (platform.type === 'android') {
    android(hooks.provideAndroidLanes(options), options.project)
  } else {
    throw `Unexpected platform type ${platform.type}`
  }

  await hooks.onPostPublish?.(platform, [oldVersion, newVersion], [oldBuildNumber, newBuildNumber])
}
