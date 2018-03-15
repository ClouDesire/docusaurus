---
id: api
title: REST API Introduction
sidebar_label: Introduction
---

The Cloudesire platform expose a REST API and uses **JSON** as data exchange
format.

## API Clients

When building your custom integration, you may want to start building using one
of the following resources.

### Java

We are maintaining a [Java client](https://github.com/ClouDesire/java-api-client)
based on retrofit to consume our API.

### PHP

We suggest to use the great [Guzzle HTTP Library](http://guzzle.readthedocs.org/)
to build a client to call our API, but we have a [php-curl example project](https://github.com/ClouDesire/examples/tree/master/php-syndication).

### CLI

We suggest to use [HTTPie](https://github.com/jakubroztocil/httpie) to call our
API via a command-line tool to experiment.

## URI format

To access resources, you need to use an URI with the format:

    https://{domain}/api/{resource}/{resourceId}

## Endpoints (HTTPS-only)

Every marketplace has a different API endpoint, depending on its environment:

* **production environment**: _backend.cloudesire.com_
* **staging-vendors**: _staging-vendors.cloudesire.com_
* **italia-startup**: _prod-its.cloudesire.com_

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
* Via an authentication token, short-lived or immortal, that can be requested via API.

### Login token (temporary and permanent)

To request an authentication token you need to send an authenticated `GET /login` request using your credentials supplied as Basic Authentication:

```http
GET /api/login HTTP/1.1
Authorization: Basic YWRtaW46YWRtaW4=


HTTP/1.1 200 OK
Content-Type: application/json

"long-string-token"
```

Then, just stop using Basic Authentication and start setting two additional headers for every request, one for the token and one for your username:

```http
GET /api/login HTTP/1.1
CMW-Auth-Token: long-string-token
CMW-Auth-User: vendor
```

When the token will expire you will get a `401` error response and you should
request a new one.

If you need a token that doesn't expire, set the `expire` parameter, but be aware that **requesting a new permanent token will invalid the previous token**:

```http
GET /api/login?expire=false HTTP/1.1
```

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

## First Request Example

Now that you know where and how to make an authenticated request, start fetching
your own account details by issuing a `GET /user/me` request:

```http
GET /api/user/me HTTP/1.1
CMW-Auth-Token: long-string-token
CMW-Auth-User: vendor


HTTP/1.1 200 OK
CMW-Deprecated-By-Version: 2
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

## Common Fields

Now that you see the first full response from the API, you may have noticed the
following characteristics:

* Every resource contains a `self` field that represent its unique URL (e.g.: `user/3`);
* Referenced resources (e.g.: product.company), are referenced by an object containing an `url` field with the resource endpoint (e.g.: `company/123`)
* Date field are in _ISO 8601_ format containing both time and timezone information (UTC as default).

## Common Operations

Usually each resource support the basic CRUD operations mapped on the four HTTP verbs:

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