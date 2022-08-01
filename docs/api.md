---
id: api
title: Cloudesire REST API Introduction
sidebar_label: REST API Introduction
---

The Cloudesire platform exposes REST API and uses **JSON** as data exchange
format.

## URI format

To interact with API resources, you need to use an URL with the format:

```http
https://{domain}/api/{resource}/{resourceId}
```

## Domains

Every marketplace has a different API `domain`, depending on its environment:

* **demo-eng.cloudesire.com**: _backend-demo-eng.cloudesire.com_

As example, the full URL endpoint of *demo-eng.cloudesire.com* would be:

`https://backend-demo-eng.cloudesire.com/api/`

## Versioning

Client should set the request parameter `apiVersion` globally on every request
to avoid failures while the API evolves.
This value is a string representation in `yyyymmdd` format of the date when a
breaking changes is introduced to support new features.

```http
GET /api/productVersion?apiVersion=20180312 HTTP/1.1
```

To discover the latest available version check the source of
[ApiVersion.java](https://github.com/ClouDesire/java-api-client/blob/master/cloudesire-api-client-dto/src/main/java/com/cloudesire/platform/apiclient/dto/ApiVersion.java).

> Make sure to always set apiVersion query parameter to avoid future breakage of
your integration

## Authentication

The API support two different authentication methods:

* Via username/email and password supplied as standard [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication);
* Via an authentication token, short-lived or permanent, that can also be requested via API.

### Permanent authentication token

You can request a permanent login token in the *profile* section once logged into
the marketplace control panel, and this should be the preferred authentication
method when developing an integration with the Cloudesire API.

> **Security**: you can have only one permanent login token at time, requesting
a new one will invalidate the previous one.

Once obtained the token, set on every HTTP request two additional headers:

* `CMW-Auth-Token`: the token you got from your profile

A good test would be to retrieve your user profile:

```http
GET /api/user/me HTTP/1.1
CMW-Auth-Token: my_token


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

| Code | Status                | Description                                                                                 |
| ---- | --------------------- | ------------------------------------------------------------------------------------------- |
| 200  | OK                    | The request was successful                                                                  |
| 201  | Created               | The request was successful and a resource was created                                       |
| 204  | No Content            | The request was successful but there is no representation to return (the response is empty) |
| 400  | Bad Request           | The request could not be understood or was missing required parameters                      |
| 401  | Unauthorized          | Authentication failed or authentication token is expired                                    |
| 403  | Forbidden             | Access denied, you can't do that.                                                           |
| 404  | Not Found             | Resource was not found, or was deleted recently                                             |
| 405  | Method Not Allowed    | Requested method is not supported for the specified resource                                |
| 500  | Internal Server Error | You have just found a bug and we have been already alerted                                  |
| 503  | Service Unavailable   | The service is temporary unavailable (e.g. server maintenance). Try again later             |

## Error response

Every time a non-successful response in generated, a JSON payload returns with a
list of error messages in `errorHolders` field, with a human-readable message in
the `error` field plus an error message in `key` field with
`%placeholder%` that can be replaced in `extraFields` field:

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

Look at the dedicated [API Reference](api-reference.md) page.
