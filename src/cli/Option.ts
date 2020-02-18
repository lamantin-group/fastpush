import { IncrementType, incrementTypes } from './PublishOptions'

export type Option<T = string> = {
  flag?: string
  name: string
  description: string
  placeholder: string
  default: T
  required?: boolean
}
