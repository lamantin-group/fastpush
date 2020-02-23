import commander from 'commander'
import packageJson from '../../package.json'
import { Option } from './Option'
import { incrementTypes, IncrementType } from './IncrementType'
import { trackTypes, TrackType } from './TrackType'
import { ui } from '../ui/index'
import jetpack from 'fs-jetpack'

const program = new commander.Command()

export type FastpushResult = ReturnType<typeof fastpush>

const options: { [key in keyof FastpushResult]: Option<FastpushResult[key]> } = {
  android: {
    name: 'android',
    description: 'select android platform',
    placeholder: 'false|true',
    default: false,
  },
  ios: {
    name: 'ios',
    description: 'select ios platform',
    placeholder: 'false|true',
    default: false,
  },
  increment: {
    flag: 'i',
    name: 'increment',
    description: `increment app version`,
    placeholder: incrementTypes.join('|'),
    default: 'patch',
  },
  track: {
    flag: 't',
    name: 'track',
    description: 'select publish track',
    placeholder: trackTypes.join('|'),
    default: trackTypes[0],
  },
  silent: {
    flag: 's',
    name: 'silent',
    description: 'distribute without asking',
    placeholder: 'true|false',
    default: false,
  },
  project: {
    flag: 'p',
    name: 'project',
    description: 'path to root of project',
    placeholder: 'path',
    default: jetpack.cwd(),
  },
  rollout: {
    flag: 'r',
    name: 'rollout',
    description: 'percent rollout',
    placeholder: '0..100',
    default: 100,
  },
  env: {
    flag: 'e',
    name: 'env',
    placeholder: 'path',
    description: 'path to environment file',
    default: '.env',
  },
  flavor: {
    flag: 'f',
    name: 'flavor',
    placeholder: 'flavor',
    description: 'flavor for android',
    default: null,
  },
  build: {
    flag: 'b',
    name: 'build',
    description: 'build android task: assemble (.apk) or bundle (.aab)',
    placeholder: 'assemble|bundle',
    default: 'assemble',
  },
  scheme: {
    flag: 'sc',
    name: 'scheme',
    placeholder: 'app-scheme',
    description: 'Scheme/target for ios project',
    default: null,
  },
}

program
  .name('faspush')
  .version(packageJson.version)
  .description(packageJson.description)
  .usage('<android ios> [options]')

/**
 * CLI parser that map your args input to JS object with options
 * @param args
 */
export function fastpush(args: string[] = process.argv) {
  Object.keys(options).forEach(key => {
    const option = options[key] as Option<any>
    if (option.flag) {
      program.option(
        `-${option.flag}, --${option.name} <${option.placeholder}>`,
        `${option.description}`,
        option.default,
      )
    } else {
      program.option(`${option.name}`, `${option.description} <${option.placeholder}>`, option.default)
    }
  })

  program.on('--help', function() {
    console.log('')
    console.log('Examples:')

    console.log('  Publish android apk with patch increment version:')
    ui.warn('  yarn fastpush android --increment patch --build assemble')
    console.log('')

    console.log('  Publish android bundle and ios with minor increment version, to beta track:')
    ui.warn('  yarn fastpush android ios --increment minor --track beta --build bundle')
    console.log('')

    console.log('  Publish ios without increment version and with custom environment:')
    ui.warn('  yarn fastpush ios --increment none --env path/to/.env')
    console.log('')
  })

  program.parse(args)

  if (!args.slice(2).length) {
    console.warn('Pass arguments') // todo: add usage examples
    program.help()
    return
  }

  const parsed = {
    increment: program.increment as IncrementType,
    track: program.track as TrackType,
    silent: program.silent as boolean,
    project: program.project as string,
    rollout: program.rollout as number,
    env: program.env as string,
    flavor: program.flavor as string,
    build: program.build as 'assemble' | 'bundle',
    android: program.android as boolean,
    ios: program.ios as boolean,
    scheme: program.schema as string,
    // platforms: program.platforms as Platform[],
  }

  Object.keys(parsed).map(key => {
    const defaultValue = (options[key] as Option<any>).default
    if (parsed[key] === undefined) {
      parsed[key] = defaultValue
    }
  })

  return parsed
}
