---
id: external-configuration-parameter-values
title: External configuration parameter values
---

An external HTTP endpoint of yours can provide the possible values of a
configuration parameter.

Add on the product configuration page, on the configuration parameters tab,
the full URL of the endpoint that implements the spec described here.

## Request

Your endpoint will receive a POST request with a JSON body content like this:

```json
{
  "productId": 123,
  "productIdentifier": "your-product",
  "productVersionId": 456,
  "productVersionIdentifier": "your-product-plan",
  "configurationParameter": "CUSTOM_DOMAIN",
  "configurationParameters": {
    "OTHER_PARAM": "value1",
    "ANOTHER_ONE": "value2"
  },
  "language": "en",
  "buyerId": 789
}
```

* `configurationParameter` is the identifier of the configuration parameter
  for which to return the values
* `configurationParameters` are the identifier-value pairs for the other
  configuration parameters being chosen by the user
* `buyerId` is the ID of the user requesting the configuration parameter
  values

## Response

Send an HTTP response of `200` with a content-type `application/json` with a
`values` field containing a list of the configuration parameters `value` and
`description`:

```json
{
  "values":
  [
    {
      "value": "first",
      "description": "Value first description"
    },
    {
      "value": "second",
      "description": "Value two description"
    }
  ]
}
```

Ordering will be kept for display to the customer.

An _empty response_ means **no values** are allowed for the input parameters:

```json
{
  "values": []
}
```

A _null response_ means **every value** is allowed:

```json
{
  "values": null
}
```

### Localization

Use the `language` field in the request to localize the values' description.
