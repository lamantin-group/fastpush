import { mapObjectToArgs } from "../mappers";
import { AndroidLane } from ".";
export type SupplyArgs = {
  track?: "production" | "beta" | "alpha" | "internal"
  /**
   * The percentage of the user fraction when uploading to the rollout track
   */
  rollout?: number

  /**
   * The package name of the application to use
   */
  package_name?: string

  /**
   * Path to the directory containing the metadata files
   */
  metadata_path?: string

  /**
   * The path to a file containing service account JSON, used to authenticate with Google
   */
  json_key?: string

  /**
   * The raw service account JSON data used to authenticate with Google
   */
  json_key_data?: string

  /**
   * Path to the AAB file to upload
   */
  aab?: string

  /**
   * Whether to skip uploading metadata, changelogs not included
   */
  skip_upload_metadata?: boolean

  /**
   * Whether to skip uploading changelogs
   */
  skip_upload_changelogs?: boolean

  /**
   * Whether to skip uploading images, screenshots not included
   */
  skip_upload_images?: boolean

  /**
   * Whether to skip uploading images, screenshots not included
   */
  skip_upload_screenshots?: boolean

  /**
   * Only validate changes with Google Play rather than actually publish
   */
  validate_only?: boolean

  /**
   * Timeout for read, open, and send (in seconds)
   * @default 300
   */
  timeout?: number
};

export function supply(args?: SupplyArgs): AndroidLane {
  return {
    type: "android",
    name: "supply",
    args: mapObjectToArgs(args)
  };
}
