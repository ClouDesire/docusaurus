---
id: api-product
title: API products onboarding
sidebar_label: API products
---

In this section it is presented how to onboard and start selling an API-based
product with metered billing based on the actual usage, i.e. HTTP calls
executed.

The onboarding process starts after creating a new "Product" in the Marketplace
Catalog, as described [here](onboarding.md#applications-catalogue).

For extended integration purposes, it's possible to define a syndication
endpoint like in [syndicated products](syndication.md) to receive events about
the creation and termination of the related subscriptions for a specific
product.

## Authentication

Secure access to the API is managed by the platform, generating an **unique
token** during the provisioning process for each consumer, that expires when the
subscription is terminated.

For this reason, the API URL is never directly exposed to the consumer. Instead,
an intermediate endpoint is automatically managed by the platform to let the
consumer reach the API backend is a secure and controlled way.

When a consumer sends a request to the API, an additional set of HTTP headers is
added to the request arriving at the API backend:

* `X-Consumer-ID`: an auto-generated ID of the Consumer
* `X-Consumer-Custom-ID`: the id of the user which bought the subscription
* `X-Consumer-Username`: the username of the user that bought the subscription

## Pricing models

In addition to the [standard pricing
options](onboarding.md#available-pricing-models) available on every plan, it's
possible to define a prepaid pricing model based on the consumer access count
to an HTTP endpoint.

### Prepaid HTTP endpoints pricing

For every HTTP endpoint that needs to be billed, create a resource with:

* `name`: a short name that describe the http endpoint
* `description`: an extended description of what the HTTP endpoint will do
* `identifier`: an unique, not-updatable identifier for this specific HTTP
  endpoint
* `method`: the HTTP method of the endpoint (e.g. POST)
* `path`: the HTTP path of the endpoint (e.g. /invoice)

#### Rate limiter

For every prepaid endpoint, a rate limiter is automatically configured
accordingly to the pricing defined.

When rate limiter is enabled, some additional headers are automatically sent
back to the client telling how many requests are available and what are the
limits allowed, for example:

```http
X-RateLimit-Limit-Month: 1000
X-RateLimit-Remaining-Minute: 992
```

If any of the limits configured is being reached, an `HTTP/1.1 429` status code
will be returned to the client with the following JSON body:

```json
{"message":"API rate limit exceeded"}
```
