import jetpack = require('fs-jetpack')
import {Lane} from "../Lane"
import { mapLanesToString } from '../mappers'
import {fastlane} from "../index"
export * from './gradle'
export * from './supply'

export type AndroidLane = {
  type: 'android'
} & Lane

export async function android(lanes: AndroidLane[]): Promise<void>
export async function android(lanes: AndroidLane[], projectDirectory: string): Promise<void>

export async function android(lanes: AndroidLane[], projectDirectory: string = jetpack.cwd()) {
  const command = mapLanesToString(lanes)
  return fastlane(projectDirectory + '/android', `context ${command}`)
}