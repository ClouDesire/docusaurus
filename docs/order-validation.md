---
id: order-validation
title: Order validation
sidebar_label: Order validation
---

An order can be validated by calling an external HTTP endpoint of yours before
the customer can place it.

The service will be called by the platform:

1) when requesting a budget estimate;
2) when placing an order;
3) when terminating a subscription.

It's possible to configure multiple endpoints, in which case **every**
configured endpoint must pass validation for the order to be successfully
placed.

## First Configuration

Add on the product configuration page the full URLs of your endpoints that
implement the spec described here.

## Request

Your endpoint will receive a POST request with a JSON body content like this:

### Budget estimate and order placement

```json
{
  "productId": 123,
  "productIdentifier": "your-product",
  "productVersionId": 456,
  "productVersionIdentifier": "your-product-plan",
  "billingItems":
  {
    "USERS": 10
  },
  "configurationParameters":
  {
    "CUSTOM_DOMAIN": "http://custom.doma.in"
  },
  "orderType": "NORMAL",
  "language": "en"
}
```

### Termination

```json
{
  "productId": 123,
  "productIdentifier": "your-product",
  "productVersionId": 456,
  "productVersionIdentifier": "your-product-plan",
  "billingItems":
  {
    "USERS": 10
  },
  "configurationParameters":
  {
    "CUSTOM_DOMAIN": "http://custom.doma.in"
  },
  "subscriptionId": 999,
  "orderType": "TERMINATION",
  "language": "en"
}
```

## Response

An HTTP response of `204` means validation has been successful.

To return a validation error, send an HTTP response of `200` with a content-type
`application/json` with an `errors` field containing 1..n objects, each with a
`message` field:

```json
{
  "errors":
  [
    {
      "message": "<Validation error one>"
    },
    {
      "message": "<Validation error two>"
    }
  ]
}
```

Any other response code is invalid and validation will fail with a generic
server error, inviting the customer to retry later.

### Localization

Use the `language` field in the request to localize the error messages.
