export class FastlaneError extends Error {
  constructor(message: string, public code: number) {
    super(message)
  }
}
