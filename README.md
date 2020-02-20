# fastpush [![codecov](https://codecov.io/gh/lamantin-group/publish/branch/master/graph/badge.svg)](https://codecov.io/gh/lamantin-group/publish) [![tests](https://github.com/lamantin-group/publish/workflows/tests/badge.svg)](https://github.com/lamantin-group/publish/actions?query=workflow%3Atests) ![api](https://img.shields.io/badge/api-experimental-orange.svg)

Typed fastlane frontend for pushing builds to store

## What is it
`fastpush` - it is frontend for [fastlane.tools](https://fastlane.tools/), that can offer to you next solved fastlane problems:

* Use JavaScript and TypeScript for build process
* Types and autocomplete for your actions and lanes
* Use single file for both platform without switching between them

## Usage

Write your own file that hold logic of build process

```ts
// distribute.ts
import { android, gradle, AndroidPlatform, ui, supply, Incrementer } from "@lamantin/fastpush"

async function distribute() {
  const androidPlatform = new AndroidPlatform()

  const [oldVersionCode, newVersionCode] = await androidPlatform.incrementVersionCode()
  ui.success(`Success update build [${oldVersionCode}] -> [${newVersionCode}]`)

  android([
    gradle("clean"),
    gradle("assemble", {
      build_type: "Release",
    }),
    supply({ track: "beta" }),
  ])
}

distribute()
```

Run it via `ts-node distribute.ts`

Need more? Check [Example](https://github.com/lamantin-group/fastpush#example) part for more complicated cases

## Setup

1. Prepare environment needed for fastlane [iOS](https://docs.fastlane.tools/getting-started/ios/setup/) and/or [Android](https://docs.fastlane.tools/getting-started/ios/setup/) platforms
2. Install this `publish` library with preferred package manager\
`yarn add @lamantin/fastpush --dev`\
or\
`npm install @lamantin/fastpush --save-dev`
3. Go to [Usage](https://github.com/lamantin-group/publish#usage) and write your own build process

## Example
### CLI
Library distributed with `fastpush` CLI tool, which helpful for distribute your app with 0 line of additional code.

You can invoke it with you package manager like: \
`yarn fastpush --help `

```
  fastpush - helper for publishing react-native projects via fastlane

  USAGE

    fastpush [android] [ios] --track <alpha|beta|production> [...options]

  PARAMETERS

    android - publish android to Google Play
    ios     - publish ios to AppStore       

  OPTIONS

    -i, --increment <none|patch|minor|major> - increment app version [none]     
    -t, --track <alpha|beta|production>      - select publish track [alpha]     
    -s, --silent <true|false>                - distribute without asking [false]
    -p, --project <project>                  - path to root of project [.]      
    -r, --rollout <0..100>                   - percent rollout [100]            
```

This tool contains all best-practice for publishing app 
For more complicated examples, you can check implementation of CLI tool at [`src/cli/publish.ts`](https://github.com/lamantin-group/publish/blob/master/src/cli/publish.ts) that distributed with this library


### Hooks for build process

Since most of the app distribution logic changes very rarely (but aptly), we have added hook functionality that allows you to change the distribution behavior at any stage of execution.

```ts
import { publish } from '@lamantin/fastpush/build/src/cli/publish'
import { fastpush, FastpushResult } from '@lamantin/fastpush/build/src/cli/fastpush'
import { git } from '@lamantin/fastpush/build/src/utils'

// fastpush - function that map CLI arguments to `options` object with parameters
const options: FastpushResult = fastpush(process.argv)

// publish - function that can process object and distibute app with no effort.
publish(options, {
  // onPostPublish - hook that invoked each time, when app successfuly distibuted
  onPostPublish: async (platform, [prevVersion, version], [prevBuild, build]) => {
    const store = platform.type === 'ios' ? 'App Store 🍏' : 'Google Play 🤖'
    const message = `App "My App Name" 🌈 sended to ${store}, track ${options.track.toUpperCase()}.\n Version: ${tag}`
    sendMessage(message)    
  }
})
```
Exist some types of hooks:

  * [onStart](https://github.com/lamantin-group/publish/blob/019d6765a6d4fc500a9218927b79ce5c21ab7b69/src/cli/publish.ts#L17) - hook that invoked first, before others hooks and before starting operations. Invoked 1 time.
  * [onPostPublish](https://github.com/lamantin-group/publish/blob/019d6765a6d4fc500a9218927b79ce5c21ab7b69/src/cli/publish.ts#L50) - hook you can do something usefull, when app is distibuted. Add git tag or send message to team and etc. Can be invoked multiple times (if you distribute to Android and iOS together) or 0 if build not published.
  * [onFinish](https://github.com/lamantin-group/publish/blob/019d6765a6d4fc500a9218927b79ce5c21ab7b69/src/cli/publish.ts#L16) - hook that invoked at end of all build process. Useful for aggregate information about build process and make analytics. Invoked 1 time.

## Write your own build script
As described at [Usage](https://github.com/lamantin-group/fastpush#usage) part, you can write your own implementation of build process from scratch. For inspiration you can check our implementation [here](https://github.com/lamantin-group/publish/blob/019d6765a6d4fc500a9218927b79ce5c21ab7b69/src/cli/publish.ts#L100-L101). 

If you do not want to use the build process written by us, but you want to quickly get a list of arguments as JS object, you can use our CLI parser named `fastpush` directly from code
```ts
import { fastpush, FastpushOptions } from '@lamantin/fastpush/build/src/cli/fastpush'

const options: FastpushOptions = fastpush(process.argv)
console.log("Parsed options:", options)

// options that you can get
// {
//     increment: "none" | "patch" | "minor" | "major";
//     track: "production" | "beta" | "alpha";
//     silent: boolean;
//     project: string;
//     rollout: number;
//     env: string;
//     flavor: string;
//     build: "bundle" | "assemble";
//     android: boolean;
//     ios: boolean;
// };
```

### Roadmap
- [x] Typing for build and publish lanes
- [ ] Typings to other actions and lanes
- [ ] Use [semver](https://semver.org/) notation. \
For now, library api in experimental status and it can be changed without semver version updates.
- [x] `IOSPlatform` helper for increment build number, set version name and getting this values
- [x] `AndroidPlatform` helper for increment build number, set version name and getting this values
- [x] CLI tool `fastpush` for possibility publish build without writing any line of code
- [x] Hooks for build process support
- [ ] Use DI for providing implementation of some build process, like up versioning, tagging and etc.