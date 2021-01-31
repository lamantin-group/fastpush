import { Lane } from "../Lane"
import jetpack = require("fs-jetpack")
import { mapLanesToString } from "../mappers"
import { fastlane } from ".."

export type IOSLane = Lane & {
  type: 'ios'
}

export function ios(lanes: IOSLane[]): void
export function ios(lanes: IOSLane[], projectDirectory: string): void

export function ios(lanes: IOSLane[], projectDirectory: string = jetpack.cwd()) {
  const command = mapLanesToString(lanes)
  fastlane(projectDirectory + '/ios', `context ${command}`)
}
