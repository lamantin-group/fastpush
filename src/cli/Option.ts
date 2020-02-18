export type Option<T = string> = {
  flag?: string
  name: string
  description: string
  placeholder: string
  default: T
  required?: boolean
}
