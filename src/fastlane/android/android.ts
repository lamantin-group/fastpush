import jetpack = require('fs-jetpack')
import {Lane} from "../Lane"
import { mapLanesToString } from '../mappers'
import {fastlane} from "../index"
export * from './gradle'
export * from './supply'

export type AndroidLane = {
  type: 'android'
} & Lane

export function android(lanes: AndroidLane[]): void
export function android(lanes: AndroidLane[], projectDirectory: string): void

export function android(lanes: AndroidLane[], projectDirectory: string = jetpack.cwd()) {
  const command = mapLanesToString(lanes)
  fastlane(projectDirectory + '/android', `context ${command}`)
}