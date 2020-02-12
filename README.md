# publish

[![codecov](https://codecov.io/gh/lamantin-group/publish/branch/master/graph/badge.svg)](https://codecov.io/gh/lamantin-group/publish)

Painless publish React Native apps

### Example

```ts
import fastlane, { build, publish } from 'publish'

function publish() {
  // do something cool

  fastlane.run(
    build(),
    publish()
  )

  // notify all about that
}
```