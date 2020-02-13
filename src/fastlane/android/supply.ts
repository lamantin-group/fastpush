import { AndroidLane } from "../Lane";
import { mapObjectToArgs } from "../mappers";
export type SupplyArgs = {
  track?: "production" | "beta" | "alpha" | "internal";
  /**
   * The percentage of the user fraction when uploading to the rollout track
   */
  rollout?: number;
};
export function supply(args?: SupplyArgs): AndroidLane {
  return {
    type: "android",
    name: "supply",
    args: mapObjectToArgs(args)
  };
}
