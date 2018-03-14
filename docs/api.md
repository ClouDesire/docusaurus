---
id: api
title: REST API
sidebar_label: API
---

The Cloudesire API is based on **REST** principles and uses **JSON** as data exchange format.

## Client

At this time we don’t have official API client library, but you can take a look at [these suggestions](api.md#rest-api-clients).

### URI format

To access resources, you need to use an URI with the format:

    https://{domain}/api/{resource}/{resourceId}

### Endpoints (SSL required)

Every marketplace has a different API endpoint, depending on its environment:

* **production environment**: _backend.cloudesire.com_
* **staging-vendors**: _staging-vendors.cloudesire.com_

### Versioning

API versioning is implemented using the request parameter `apiVersion` to
differentiate versions. The value is the date in yyyymmdd format of the release
of a new feature or the introduction of breaking changes.

Latest version is `20180312`.

    GET /api/productVersion?apiVersion=20180312 HTTP/1.1


### Authentication

The API support two different authentication methods:

* Via username/email and password supplied as standard [Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication);
* Via an authentication token, short-lived or immortal, that can be requested via API.

### Login token retrieving and usage

To request an authentication token you need to send an authenticated `GET /login` request using your credentials supplied as Basic Auth:

    GET /api/login HTTP/1.1
    Authorization: Basic YWRtaW46YWRtaW4=
    

    HTTP/1.1 200 OK
    Content-Type: application/json
    
    "hrNSv0ZPZVVeDkf8Pta2RLmkyVqEcKMfzTdCUi8voLQMOUcHUMaqSyylhVAVZ8rZSkl4lsNiWemC6l6WSnqnILhXYQcrPIZm"
    

Then, just stop using Basic Auth and start setting two additional headers for every request, one for the token and one for your username:

    GET /api/login HTTP/1.1
    CMW-Auth-Token: hrNSv0ZPZVVeDkf8Pta2RLmkyVqEcKMfzTdCUi8voLQMOUcHUMaqSyylhVAVZ8rZSkl4lsNiWemC6l6WSnqnILhXYQcrPIZm
    CMW-Auth-User: vendor
    

When the token will expire you will get a `401` error respose and you should request a new one.

If you need a token that doesn’t expire, set the `expire` parameter, but be aware that requesting a new permanent token will invalid the previous token:

    GET /api/login?expire=false HTTP/1.1
    

### Typical Server Responses

|Code|Status|Description|
|----|------|-----------|
|200 |OK|The request was successful|
|201|Created|The request was successful and a resource was created|
|204|No Content|The request was successful but there is no representation to return (the response is empty)|
|400|Bad Request|The request could not be understood or was missing required parameters|
|401|Unauthorized|Authentication failed or authentication token is expired|
|403|Forbidden|Access denied, you can’t do that.|
|404|Not Found|Resource was not found, or was deleted recently|
|405|Method Not Allowed|Requested method is not supported for the specified resource|
|500|Internal Server Error|You have just found a bug and we have been already alerted|
|503|Service Unavailable|The service is temporary unavailable (e.g. server maintenance). Try again later|

### Error response

Every time a non-successful response in generated, a JSON payload returns with a list of human-readable error messages:

    HTTP/1.1 400 Bad Request
    Content-Type: application/json
    
    {
        "errors": [
            "You can't bill for an undeployed, expired or trial subscription."
        ]
    }
    

### First Request Example

Now that you know where and how to make an authenticated request, start fetching your own account details by issuing a `GET /user/me` request:

```http
GET /api/user/me HTTP/1.1
CMW-Auth-Token: hrNSv0ZPZVVeDkf8Pta2RLmkyVqEcKMfzTdCUi8voLQMOUcHUMaqSyylhVAVZ8rZSkl4lsNiWemC6l6WSnqnILhXYQcrPIZm
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

### Common Fields

Now that you see the first full response from the API, you may have noticed the following peculiarities:

*   Each resource contains a `self` attribute that represent its unique URL;
*   Linked resources (e.g.: company), are referenced by an object containing an `url` field.
*   Date field are in _ISO 8601_ format containing both time and timezone information (UTC as default).

### Common Operations

Usually each resource support the basic CRUD operations mapped on the four HTTP verbs:

*   `GET` for retrieving;
*   `POST` for creation;
*   `PUT` for modification;
*   `DELETE` for deletion.

Sometimes the method `PATCH` is used either for partial modification or for custom actions.

### API documentation

Here you can find the detailed documentation of the Cloudesire APIs:

* [Catalog API](http://api.cloudesire.com/catalog.html)
* [Marketplace API](http://api.cloudesire.com/marketplace.html)
* [Subscription API](http://api.cloudesire.com/subscription.html)

## REST API Clients

### Java

We suggest to use our [Tisana4j REST client library](https://github.com/ClouDesire/tisana4j) to build a client to call our API. We are planning to relase an official Java API client in the future.

### PHP

We suggest to use the great [Guzzle](http://guzzle.readthedocs.org/) to build a client to call our API.

### CLI tool

We suggest to use [HTTPie](https://github.com/jakubroztocil/httpie) to call our API via a command-line tool to experiment.
