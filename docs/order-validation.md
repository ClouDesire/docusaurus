---
id: order-validation
title: Order validation
sidebar_label: Order validation
---

An order can be validated by calling an external service of yours.

### Configuration

Add the full URL of your validation service on the product configuration.

### Request

Your service will receive a POST request with a JSON body content like this:

```json
{
  "productId": 3196,
  "productIdentifier": "dbsite",
  "productVersionId": 3197,
  "productVersionIdentifier": "identifier4",
  "billingItems":
  {
    "DENTISTS": 10
  },
  "configurationParameters":
  {
    "CUSTOM_DOMAIN": "http://custom.doma.in"
  },
  "language": "en"
}
```

### Response

An HTTP response of 204 means validation has been successful.

To return a validation error, send an HTTP response of 200 with a content type
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
