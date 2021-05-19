import { match } from 'ts-pattern'
import { ui } from '../ui'
import { Lane, Argument } from './Lane'

export function mapLanesToString(lanes: Lane[]) {
  const laneString = lanes.map(lane => {
    const args =
      lane.args?.map(arg => {
        if (typeof arg.value === 'object') {
          const value = `{${Object.keys(arg.value).map(keyParam => {
            const valueParam = arg.value[keyParam]
            return `"${keyParam}" => "${valueParam}"`
          })}}`

          return `${arg.name}: ${value}`
        }
        if (arg.value.startsWith('ENV[')) {
          return `${arg.name}: ${arg.value}`
        } else {
          return `${arg.name}: "${arg.value}"`
        }
      }) || ''
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
          return object[key]
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
