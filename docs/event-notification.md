---
id: event-notification
title: Event notification
sidebar_label: Event notification
---

The platform is able to notify a configured endpoint on some meaningful events.

The endpoints can be:

* platform-wide: a configurable list of endpoints, which they will receive
  all the platform's events
* vendor-specific: endpoints configured in a vendor's profile
* product-specific: an endpoint configured on a catalogued product

At the time of writing, vendor and product specific endpoints only receive
subscription related events.

## Introduction to event notification

The basics follow:

* the platform will send notifications (HTTP POST requests with a [JSON
  payload](event-notification.md#anatomy-of-an-event-request)) to an endpoint
  every time an interesting **event** occurs on the marketplace (new
  subscription creation, renews, termination requests, user creation, product
  plan publishing and so on).
* your endpoint should handle these notifications and use them as triggers to
  invoke the [Cloudesire API](api.md) to fetch the needed information, provision
  a new user in its system and update the subscription status and so on.
* integration development should be done on our
  [staging-marketplace](onboarding.md#demo-marketplace-for-tests) and after
  everything looks fine, move to the production marketplace.

## Anatomy of an event request

Every request sent to your endpoint will be a POST request with a JSON payload:

```http
POST /endpoint HTTP/1.1
Accept: application/json
Content-Type: application/json; charset=utf-8
Host: vendor.example.org
CMW-Event-Signature: sha1=bd637c3b084f7c5039aaf2808c3bc6bd7b6c283d

{
    "date": "2015-01-12T11:19:30Z",
    "entity": "Subscription",
    "entityUrl": "subscription/2388",
    "id": "2388",
    "type": "CREATED"
}
```

Where:

The **type** attribute can be:

* `CREATED`
* `MODIFIED`
* `DELETED`

The **entity** attribute can be:

* `Cart`
* `Invoice`
* `ProductVersion`
* `Subscription`
* `User`

The **id** attribute is an unique identifier for the current **entity**, it will
never change.

The **entityUrl** attribute contains the relative URL from which the involved
resource can be fetched.

The **date** attribute contains when the event has been generated.

The **metadata** attribute contains a map of data specific to a particular
**entity** (e.g. `approved=true` or `published=true` for `ProductVersion`s).

The **CMW-Event-Signature** is an HTTP header related to the optional
[validation for incoming event notifications](event-notification.md#security).

### Replying to events

The platform expects that you reply with a `204 - No content` response (with
an empty response body).

If you reply with a `200 - OK` and a payload it's fine too, but the payload will
be automatically discarded.

You can reply with a `429 - Too Many Requests` with an appropriate `Retry-After`
[header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) to delay
the subsequent retries.

If the response contains another status code, the notification will be retried
with an exponential back-off, until the endpoint will return a `204` status
code.

## Security

### Securing your endpoint via HMAC signature validation

For security reasons, you probably want to limit requests on the specified
endpoint(s) to those coming from us.

Once you have configured a secret token in your product edit page, a hash
signature for each payload will be in the `CMW-Event-Signature` HTTP header. The
goal is to compute a hash using your secret token, and ensure that the hashes
match.

e.g. in Java, using
**[Apache Commons Codec](https://commons.apache.org/proper/commons-codec/)**:

```java
import org.apache.commons.codec.digest.HmacUtils;

// do whatever to get the request
RecordedRequest request = server.takeRequest();

String expected = "sha1=" + HmacUtils.hmacSha1Hex( "MY_SECRET_TOKEN", request.getBody().readUtf8() );
String actual = request.getHeader( "CMW-Event-Signature" );

if ( MessageDigest.isEqual( actual.getBytes(), expected.getBytes() ) )
{
    // continue evaluating request...
}
```

> the hash signature starts with `sha1=`, no matter which implementation you
> use.
