import { AndroidLane } from ".."
import { mapObjectToArgs } from "../../mappers"
import { TrackType } from "../../../../PublishOptions"

/**
 * The gradle task you want to execute, e.g. assemble, bundle or test. 
 * For tasks such as assembleMyFlavorRelease you should use gradle(task: 'assemble', flavor: 'Myflavor', build_type: 'Release')
 */
export type GradleArgTask = "bundle" | "assemble" | "test" | "clean"

export type GradleArgs = {

  /**
   * The flavor that you want the task for, e.g. MyFlavor. 
   * If you are running the assemble task in a multi-flavor project, and you rely on Actions.lane_context[SharedValues::GRADLE_APK_OUTPUT_PATH] then you must specify a flavor here or else this value will be undefined
   */
  flavor?: string 

  /**
   * The build type that you want the task for, e.g. Release. Useful for some tasks such as assemble	
   */
  build_type?: "Debug" | "Release"
}

export function gradle(task: GradleArgTask, args?: GradleArgs): AndroidLane {
  return {
    type: 'android',
    name: 'gradle',
    args: [
      { name: 'task', value: task },
      ...mapObjectToArgs(args)
    ],
  }
}

export type SupplyArgs = {
  track?: "production" | "beta" | "alpha" | "internal"

  /**
   * The percentage of the user fraction when uploading to the rollout track	
   */
  rollout?: number
}

export function supply(args?: SupplyArgs): AndroidLane {
  return {
    type: "android",
    name: "supply",
    args: mapObjectToArgs(args)
  }
}