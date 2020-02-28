import { IOSLane } from ".";
import { mapObjectToArgs } from "../mappers"

export type PilotArgs = {

  /**
   * You can skip the submission of the binary, 
   * which means, the ipa file will only be uploaded and not distributed to testers.
   * Pass _true_ to only upload build without distribution
   */
  skip_submission?: boolean

  username?: string

  app_identifier?: string

  /**
   * pass a specific value to the iTMSTransporter -itc_provider option
   */
  itc_provider?: string

  beta_app_feedback_email?: string

  beta_app_description?: string

  demo_account_required?: boolean

  notify_external_testers?: boolean

  /**
   * Provide the 'What to Test' text when uploading a new build. 
   * skip_waiting_for_build_processing: false is required to set the changelog
   */
  changelog?: string

  /**
   * If set to true, the distribute_external option won't work and no build will be distributed to testers. 
   * (You might want to use this option if you are using this action on CI and have to pay for 'minutes used' on your CI plan). 
   * If set to true and a changelog is provided, it will partially wait for the build to appear on AppStore Connect so the changelog can be set, and skip the remaining processing steps
   */
  skip_waiting_for_build_processing?: boolean

  /**
   * Should the build be distributed to external testers?	
   */
  distribute_external?: boolean

  /**
   * Path to a CSV file of testers	
   */
  testers_file_path?: string

  /**
   * Interval in seconds to wait for App Store Connect processing
   * @default 30
   */
  wait_processing_interval?: number
}

/**
 * The best way to manage your TestFlight testers and builds from your terminal
 * Pilot makes it easier to manage your app on Apple’s TestFlight.
 * 
 * Pilot uses spaceship.airforce to interact with App Store Connect 🚀
 * @param args 
 */
export function pilot(args?: PilotArgs): IOSLane {
  return {
    type: "ios",
    name: "pilot",
    args: mapObjectToArgs(args)
  }
}