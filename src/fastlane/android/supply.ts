import { mapObjectToArgs } from "../mappers";
import { AndroidLane } from ".";
export type SupplyArgs = {
  track?: "production" | "beta" | "alpha" | "internal"
  /**
   * The percentage of the user fraction when uploading to the rollout track
   */
  rollout?: number
};
export function supply(args?: SupplyArgs): AndroidLane {
  return {
    type: "android",
    name: "supply",
    args: mapObjectToArgs(args)
  };
}
