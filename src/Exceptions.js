export class RateLimitExceededError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RateLimitExceededError'
  }
}

export class MissingAPIKeyError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MissingAPIKeyError'
  }
}

export class UnsupportedOperatorError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UnsupportedOperatorError'
  }
}