import { Lane, Argument } from './Lane'

export function mapLanesToString(lanes: Lane[]) {
  const laneString = lanes.map(lane => {
    const args =
      lane.args?.map(arg => {
        return `${arg.name}: "${arg.value}"`
      }) || ''
    if (args) {
      return `${lane.name}(${args})`
    } else {
      return `${lane.name}`
    }
  })
  return `lanes:'[${laneString}]'`
}

export function mapObjectToArgs(object: Record<string, any>): Argument[] {
  if (!object) return []
  if (typeof object !== 'object') {
    throw "'object' param must be object"
  }

  return Object.keys(object).map(key => {
    if (typeof object[key] === 'object' || typeof object[key] === 'function') {
      throw `Value of ${key} should be plain, not object or function`
    }

    return {
      name: key,
      value: object[key],
    }
  })
}
