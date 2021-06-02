import { Lane } from "../Lane"
import jetpack = require("fs-jetpack")
import { mapLanesToString } from "../mappers"
import { fastlane } from ".."

export type IOSLane = Lane & {
  type: 'ios'
}

export async function ios(lanes: IOSLane[]): Promise<void>
export async function ios(lanes: IOSLane[], projectDirectory: string): Promise<void>

export function ios(lanes: IOSLane[], projectDirectory: string = jetpack.cwd()) {
  const command = mapLanesToString(lanes)
  return fastlane(projectDirectory + '/ios', `context ${command}`)
}
