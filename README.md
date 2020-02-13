# fastpush [![codecov](https://codecov.io/gh/lamantin-group/publish/branch/master/graph/badge.svg)](https://codecov.io/gh/lamantin-group/publish) ![api](https://img.shields.io/badge/api-experimental-orange.svg)

Painless publish React Native apps

### What is it
`fastpush` - it is frontend for [fastlane.tools](https://fastlane.tools/), that can offer to you next solved fastlane problems:

* Use plain JavaScript and TypeScript for build process
* Types and autocomplete for your actions and lanes
* Use single file for both platform without switching between them

### Usage

Write your own file that hold logic of build process

```ts
// my-own-publish-script.ts

function publish() {
  android([
    gradle('clean'),
    gradle('bundle', { build_type: 'Release' }),
    supply({ track: 'beta' }),
  ])
  console.log('android is published')

  ios([
    match('appstore'),
    gym(),
    pilot(),
  ])
  console.log("iOS is published")
}
```

Run it via `ts-node my-own-publish-script.ts` :)

### Setup

1. Prepare environment needed for fastlane [iOS](https://docs.fastlane.tools/getting-started/ios/setup/) and/or [Android](https://docs.fastlane.tools/getting-started/ios/setup/) platforms
2. Install this `publish` library with preferred package manager\
`yarn add @lamantin/fastpush --dev`\
or\
`npm install @lamantin/fastpush --save-dev`
3. Go to [Usage](https://github.com/lamantin-group/publish#usage) and write your own build process

### Roadmap
- [ ] Typings to mostly used actions and lanes
- [ ] Use [semver](https://semver.org/) notation. \
For now, library api have experimental status and can be changed without semver version updates.