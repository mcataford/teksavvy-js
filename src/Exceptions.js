export class RateLimitExceededError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RateLimitExceededError'
  }
}