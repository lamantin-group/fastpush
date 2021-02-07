export type Lane = {
  name: string
  args?: Argument[]
}

export type Argument = {
  name: string
  value: string | Record<string, string>
}
