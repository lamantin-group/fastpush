import { Lane } from './Lane'

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
