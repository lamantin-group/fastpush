import { match } from 'ts-pattern'
import { Lane, Argument } from './Lane'

function mapObject(arg: Argument) {
  return `{${Object.keys(arg.value).map(keyParam => {
    const valueParam = arg.value[keyParam]
    if (Array.isArray(valueParam)) {
      return `"${keyParam}" => ${valueParam.map(arg => {
        return arg
      })}`
    } else if (typeof valueParam === 'object') {
      return `"${keyParam}" => ${mapObject(valueParam)}`
    }

    return `"${keyParam}" => "${valueParam}"`
  })}}`
}

function mapArgumentToString(arg: Argument) {
  if (typeof arg.value === 'object') {
    if (Array.isArray(arg.value)) {
      return `"${arg.name}": {${arg.value.map(mapArgumentToString)}}`
    } else {
      return `"${arg.name}": ${mapObject(arg)}`
    }
  } else if (
    (typeof arg.value === 'string' && arg.value.startsWith('ENV[')) ||
    typeof arg.value === 'boolean' ||
    arg.value === 'nil'
  ) {
    return `"${arg.name}": ${arg.value}`
  } else {
    return `"${arg.name}": "${arg.value}"`
  }
}

export function mapLanesToString(lanes: Lane[]) {
  const laneString = lanes.map(lane => {
    const args = lane.args?.map(mapArgumentToString) || ''
    if (args) {
      return `${lane.name}(${args})`
    } else {
      return `${lane.name}`
    }
  })
  return `lanes:'[${laneString}]'`
}

// [gradle(task: "clean",system_properties: {"applicationIdInject" => "flavor.android.id"})]
export function mapObjectToArgs(object: Record<string, any>): Argument[] {
  if (!object) return []
  if (typeof object !== 'object') {
    throw "'object' param must be object"
  }

  return Object.keys(object)
    .filter(key => {
      const value = object[key]
      return !!value
    })
    .map(key => {
      const value: Argument['value'] = match(typeof object[key])
        .with('string', () => {
          return object[key]
        })
        .with('number', () => {
          return object[key]
        })
        .with('object', () => {
          return mapObjectToArgs(object[key])
        })
        .with('boolean', () => {
          return object[key]
        })
        .otherwise(() => {
          throw `Value ${object[key]} of ${key} should not to be a ${typeof object[key]}`
        })

      return {
        name: key,
        value: value,
      }
    })
}
