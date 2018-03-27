---
id: api
title: Cloudesire REST API Guide
sidebar_label: REST API Guide
---

The Cloudesire platform expose a REST API and uses **JSON** as data exchange
format.

## API Clients

When developing your custom integration, you may want to start building using one
of the following resources, depending on your programming language.

### Java

We are maintaining a an official [Java client](https://github.com/ClouDesire/java-api-client)
based on [Retrofit](http://square.github.io/retrofit/) to consume our API.

### PHP

Please go ahead to the [PHP client](api-php.md) page.

### CLI

We suggest to use [HTTPie](https://github.com/jakubroztocil/httpie) via
command-line to debug and experiment with our API.

## URI format

To interact with API resources, you need to use an URL with the format:

    https://{domain}/api/{resource}/{resourceId}

## Domains

Every marketplace has a different API `domain`, depending on its environment:

* **marketplace.cloudesire.com**: _backend.cloudesire.com_
* **frontend-staging-vendors.cloudesire.com**: _staging-vendors.cloudesire.com_
* **marketplace.italiastartup.it**: _prod-its.cloudesire.com_

As example, the full URL endpoint of *marketplace.cloudesire.com* would be:

```https://backend.cloudesire.com/api/```

## Versioning

Client should set the request parameter `apiVersion` globally on every request
to avoid failures while the API evolves.
This value is a string representation in `yyyymmdd` format of the date when a
breaking changes is introduced to support new features.

Latest version is `20180312`.

```http
GET /api/productVersion?apiVersion=20180312 HTTP/1.1
```

> Make sure to always set apiVersion query parameter to avoid future breakage of
your integration

## Authentication

The API support two different authentication methods:

* Via username/email and password supplied as standard [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication);
* Via an authentication token, short-lived or permanent, that can also be requested via API.

### Permanent authentication token

You can request a permanent login token in the *profile* section once logged into
the marketplace control panel, and this should be the preferred authentication
method when developing an integration with the Cloudesire API.

> **Security**: you can have only one permanent login token at time, requesting
a new one will invalidate the previous one.

Once obtained the token, set on every HTTP request two additional headers:

* `CMW-Auth-Token`: the token you got from your profile
* `CMW-Auth-User`: your current username, as displayed in your profile

A good test would be to retrieve your user profile:

```http
GET /api/user/me HTTP/1.1
CMW-Auth-Token: my_token
CMW-Auth-User: my_username


HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 13 Jan 2015 15:05:52 GMT

{
    "acceptedTerms": true,
    "activated": true,
    "activationDate": "2014-01-01T00:00:00Z",
    "address": {
    "address": "Via Pisana",
    "city": "Pisa",
    "country": "ITALY",
    "countryCode": "IT",
    "id": 4,
    "zipCode": "12345"
    },
    "company": {
        "url": "company/1"
        },
    "creationDate": "2014-07-02T08:20:01Z",
    "email": "dev@cloudesire.com",
    "enabled": true,
    "environment": "cloudesire",
    "id": 3,
    "name": "Demo Vendor",
    "newbie": false,
    "phoneNumber": "0123456789",
    "self": "user/3",
    "userName": "vendor",
    "userRole": "ROLE_VENDOR"
}
```

A 200 response with a json body representing your user profile means that you
successfully authenticated and you can start developing the integration.

## Response codes

|Code|Status|Description|
|----|------|-----------|
|200 |OK|The request was successful|
|201|Created|The request was successful and a resource was created|
|204|No Content|The request was successful but there is no representation to return (the response is empty)|
|400|Bad Request|The request could not be understood or was missing required parameters|
|401|Unauthorized|Authentication failed or authentication token is expired|
|403|Forbidden|Access denied, you can't do that.|
|404|Not Found|Resource was not found, or was deleted recently|
|405|Method Not Allowed|Requested method is not supported for the specified resource|
|500|Internal Server Error|You have just found a bug and we have been already alerted|
|503|Service Unavailable|The service is temporary unavailable (e.g. server maintenance). Try again later|

## Error response

Every time a non-successful response in generated, a JSON payload returns with a
list of error messages in `errorHolders` field, with a human-readable message in
the `error` field plus an error message in `key` field with
`%placeholder%` that can be substitued in `extraFields` field:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errorHolders": [{
    "key": "unsupported-file-type-%detected%-%supported%",
    "error": "Unsupported file type: image/jpeg",
    "extraFields": {
        "detected": "image/jpeg",
        "supported": "image/png"
    }
  }]
}
```

## Common Characteristics

There a few common traits that needs to be know:

* there is always a `self` field that represent its unique URL (e.g.: `user/3`), use GET on it to fetch the resource;
* referenced resources (e.g.: user.company), are referenced by an object containing an `url` field with the resource endpoint (e.g.: `company/123`)
* Date field are in _ISO 8601_ format containing both time and timezone information (UTC as default).

## HTTP Methods

Usually each resource support the basic CRUD operations mapped on five HTTP verbs:

* `GET` for retrieving
* `POST` for creation
* `PUT` for modification
* `DELETE` for deletion
* `PATCH` for partial updates

Sometimes the method `PATCH` is used either for partial modification or for custom actions.

## API Reference

Here you can find the automatically generated API documentation, grouped in macro-areas:

* [Catalog API](http://api.cloudesire.com/catalog.html)
* [Marketplace API](http://api.cloudesire.com/marketplace.html)
* [Subscription API](http://api.cloudesire.com/subscription.html)