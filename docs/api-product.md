---
id: api-product
title: API products onboarding
sidebar_label: API as a Service
---

This section describes how to onboard and start selling an API-based
product with metered billing based on the actual usage, that are HTTP calls
executed.

An example API product is available on our [demo marketplace](https://demo.cloudesire.com/281/api/api-demo)

The onboarding process starts after creating a new "Product" in the Marketplace
Catalog, as described [here](onboarding.md#applications-catalog-marketing-sales-onboarding).

For extended integration purposes, it's possible to define a syndication
endpoint like in [syndicated products](syndication.md) to receive events about
the creation and termination of the related subscriptions for a specific
product.

## Authentication

Secure access to the upstream API is managed by the platform, generating a
**unique token** during the provisioning process for each consumer, that expires
when the subscription is terminated.

For this reason, the API URL is never directly exposed to the consumer. Instead,
an intermediate endpoint is automatically managed by the platform to let the
consumer reach the API backend is a secure and controlled way.

When a consumer sends a request to the API, an additional set of HTTP headers is
added to the request arriving at the API backend:

* `X-Consumer-ID`: an auto-generated ID of the Consumer
* `X-Consumer-Username`: the unique subscription id of the platform

### Authentication header

To secure your upstream API, and avoid clients circumventing our rate-limited
endpoint, you are encouraged to setup an **authentication header** while
configuring an API product, and check that every request proxied by the platform
contains such header with the correct secret.

## Pricing models

In addition to the [standard pricing
options](onboarding.md#available-pricing-models) available on every plan, it's
possible to define a prepaid or pay-per-use pricing model based on the consumer
access count to an HTTP endpoint.

### API endpoints definition

For every HTTP endpoint that needs to be billed, create a resource with:

* `name`: a short name that describe the HTTP endpoint
* `description`: an extended description of what the HTTP endpoint will do
* `identifier`: an unique, unchangeable identifier for this specific HTTP
  endpoint
* `method`: the HTTP method of the endpoint (for example POST)
* `path`: the HTTP path of the endpoint (for example /invoice)

### Prepaid HTTP endpoints pricing (Rate limiter)

For every prepaid endpoint, a rate limiter is automatically configured
accordingly to the defined pricing.

When rate limiter is enabled, some additional headers are automatically sent
back to the client telling how many requests are available and what are the
limits allowed, for example:

```http
X-RateLimit-Limit-month: 1000
X-RateLimit-Remaining-month: 992
```

If any of the limits configured is being reached, an `HTTP/1.1 429` status code
will be returned to the client with the following JSON body:

```json
{"message":"API rate limit exceeded"}
```

### Pay-per-use HTTP endpoints pricing

For every pay-per-use endpoint, request counters are automatically defined and
tracked by the platform.

At the end of the billing period, the customer will receive an invoice for the
requests made by the customer during the current period.
