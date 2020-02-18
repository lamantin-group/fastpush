import commander from 'commander'
import packageJson from '../../package.json'
import { Option } from './Option'
import { incrementTypes, IncrementType } from './IncrementType'
import { trackTypes, TrackType } from './TrackType'

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
    default: '.',
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
    default: 'dev', // todo: make null
  },
  build: {
    flag: 'b',
    name: 'build',
    description: 'build android task: assemble (.apk) or bundle (.aab)',
    placeholder: 'assemble|bundle',
    default: 'assemble',
  },
}

program.version(packageJson.version).description(packageJson.description)

export function fastpush(args: string[] = process.argv) {
  Object.keys(options).forEach(key => {
    const option = options[key] as Option<any>
    if (option.flag) {
      program.option(
        `-${option.flag}, --${option.name}`,
        `${option.description} [${option.placeholder}]`,
        option.default,
      )
    } else {
      program.option(`${option.name}`, `${option.description} <${option.placeholder}>`, option.default)
    }
  })

  program.parse(args)
  console.log(program.opts())

  if (!args.slice(2).length) {
    console.warn('Pass arguments') // todo: add usage examples
    program.help()
    return
  }

  console.log('project = ', program.project)
  console.log('flavor = ', program.flavor)
  console.log('track = ', program.track)
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
