import { Option } from './Option'

export type Platform = 'ios' | 'android' | 'all'

export class PlatformOption implements Option {
  name: string[] = ['--platform', '-p']
  description = 'Select platform for publishing:'
  default?: Platform = 'all'

  run(platform: Platform) {
    
  }
}
