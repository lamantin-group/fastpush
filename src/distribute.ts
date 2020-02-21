// import { PlatformActions, Platform } from '.'
// import { incrementPackageJson } from './model/incrementPackageJson'
// import { FastpushResult } from './cli/fastpush'

// export async function distribute(platform: PlatformActions, options: FastpushResult) {
//   const [_, versionNamePackageJson] = await incrementPackageJson(options.increment)
//   const [prevVersionName, versionName] = await platform.setVersionName(versionNamePackageJson)
//   const [prevBuildNumber, buildNumber] = await platform.incrementBuildNumber()

//   platform.fastlane(clean(), build(), push())

//   sendMessage()
// }
