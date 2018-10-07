# teksavvy-js
A JS wrapper for the Teksavvy API

## Getting started

To use this wrapper, you will need to generate an API key for your Teksavvy account. This can be done through the customer portal.

## Wrapper setup

### `constructor(apiKey [, options = {}])`

The `apiKey` needs to be supplied, omitting it will raise a `MissingAPIKeyError` and prevent any requests from being sent.

The `options` are described below:

|Option|Type|Default|Description|
|---|---|---|---|
|`rateLimit`|Integer|`30`|The number of requests per minute allowed by the wrapper. Set to `0` to disable rate limiting|

## Usage

The API methods will return Promises that can be handled however you want using the `then` and `catch` functions.

## API methods

### `usageRecords()`

#### Output format

```
{
  date: ...,
  download: {
    onPeak: ...,
    offPeak: ...,
  },
  upload: {
    onPeak: ...,
    offPeak: ...,
  },
}
```

|Key|Type|Description|
|---|---|---|
|`date`|datetime|Date corresponding to the usage reading|
|`download`|-|Download usage information|
|`onPeak`|decimal|Bandwidth used in peak hours (in GB)|
|`offPeak`|decimal|Bandwidth used off peak hours (in GB)|
|`upload`|-|Upload usage information|
|`onPeak`|decimal|See prev.|
|`offPeak`|decimal|See prev.|

### `usageSummaries()`

```
{
  start: ...,
  end: ...,
  isCurrent: ...,
  download: {
    onPeak: ...,
    offPeak: ...,
  },
  upload: {
    onPeak: ...,
    offPeak: ...,
  },
}
```

|Key|Type|Description|
|---|---|---|
|`start`|datetime|Start of the usage reading period|
|`end`|datetime|End of the usage reading period|
|`isCurrent`|boolean|Flags the current usage period|
|`download`|-|Download usage information|
|`onPeak`|decimal|Bandwidth used in peak hours (in GB)|
|`offPeak`|decimal|Bandwidth used off peak hours (in GB)|
|`upload`|-|Upload usage information|
|`onPeak`|decimal|See prev.|
|`offPeak`|decimal|See prev.|

## Rate limiting

The API wrapper includes a rate limiting feature which can be set using the `rateLimit` option. The rate limit is based on the number of requests per minute allowed to go through.

Any request that would exceed the preset per-minute request limit will throw a `RateLimitExceededError` and will not be sent nor queued.

By default, the rate limit is set to `30`, as it is the limit set by the Teksavvy API documentation.