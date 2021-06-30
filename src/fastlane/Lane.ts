export type Lane = {
  name: string
  args?: Argument[]
}

export type Argument = {
  name: string
  /**
   * Support: string, number, boolean, nested Argument[], nil and ENV
   *
   * Use "nil" when you need set value to empty
   *
   * Use `ENV["some-fastlane-env-variable"]` for access environment variable in runtime
   */
  value: string | number | boolean | Argument[] | 'nil'
}
