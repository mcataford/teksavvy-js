export class RateLimitExceededError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'RateLimitExceededError'
  }
}

export class MissingAPIKeyError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'MissingAPIKeyError'
  }
}

export class UnsupportedOperatorError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'UnsupportedOperatorError'
  }
}

export class UnsupportedComparatorError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'UnsupportedComparatorError'
  }
}

export class InvalidKeyError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'InvalidKeyError'
  }
}

export class MalformedFilterParameters extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'MalformedFilterParameters'
  }
}