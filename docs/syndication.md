---
id: syndication
title: Onboarding of syndicated applications
sidebar_label: Syndicated applications
---

A **syndicated application** is an application that is directly managed by the software vendor, and not hosted on the Cloudesire platform itself.

This feature enables software vendors to sell applications that are already hosted somewhere and that has native support for **multi-tenancy**. The provisioning of a new tenant should be almost instantaneous, and the integration has to be done directly via [Cloudesire REST API](api.md).

Please note that the Cloudesire platform, in this case, is used only for the marketplace and billing features, and not for the self-deploy on public cloud providers.

## Introduction to Syndication

The basics follows:

* Platform will send notifications (HTTP POST requests) to an endpoint every time an interesting **event** occurs on the marketplace (new subscription created, invoice payment and so on).
* the endpoint should handle these notifications, e.g. fetch the needed information, provision a new user in its system and update the subscription status via Cloudesire API.

### Syndicated Applications: workflow of new orders and provisioning

A simple example follows, expaining the workflow of a new tenant order and provisioning:

* the customer orders a new tenant of your application in the marketplace
* Cloudesire sends a notification to your endpoint, containing the following information: entity = `subscription`, id = {subscription_id}, status = `created`
* once you've received this notification, you need to call our API in order to retrieve the subscripion details (given its identifier) which includes:
    * the customer data (name, email, etc.) to be stored in your database
    * a `paid` flag, which can be `true` (if the customer already paid the subscription for your application, for example if the platform previously stored his credit card data) or `false`(if the customer hasn't paid yet the subscription)
* if the `paid` flag is `true` you can provision your tenant in your platform
* if the `paid` flag is `false` you need to wait for the next notification, which will contain the following information: entity = `subscription`, id = {subscription_id}, status = `modified`. Once you've received this notification, you need to call our API again, retrieve the subscription data, and check if the `paid` flag is `true`.
* once you've executed the provisioning of the tenant in your platform, you need to call our API for the last time, setting the subscription status to `deployed`
* when the subscription status changes to `deployed`, Cloudesire notifies the customer, providing him the instructions to access your application

In other words, you should provision your tenant only when the `paid` flag is `true` (unless you're offering **trials** for your application).

![](/img/docs/Syndication-Worklow-Provisioning.png)

[Here](https://github.com/ClouDesire/php-syndication-example) you can find a simple PHP example, implementing the tenant provisioning/unprovisioning for a demo application.

### How to setup the syndication endpoint

While developing your integration with the Cloudesire platform, you may find useful to test your source code in our [staging marketplace](syndication.md#staging-marketplace), where _fake payments_ are possible and where you can test the whole customer journey, end-to-end.

We strongly recommend to onboard and test your application on the staging marketplace before onboarding it on the public marketplace.

Let's start things off: during the [application onboarding](syndication.md#applications-onboarding) process, when creating a **new product**, choose "_Syndicated Product_", and then configure the HTTP(S) URL of your **Syndication Endpoint** where the events will be delivered, almost instantly.

![Vendors Control Panel - Syndication](/img/docs/control_panel_syndication.png "Vendors Control Panel - Syndication")

If you want to secure your syndication endpoint, please read [this section](syndication.md#security).

### Anatomy of an event request

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

* `Subscription`
* `Invoice`

The **id** attribute is an unique identifier for the current **entity**.
The **entityUrl** attribute contains the relative URL from which the involved resource can be fetched.
The **date** attribute contains when the event has been generated.
The **CMW-Event-Signature** is an HTTP header related to the optional [validation for incoming event notifications](syndication.md#security).

### Replying to events

The platform expects that you reply with a `204  -  No content` response, so with an empty response body.

If you return a `200  - OK` reply with body message, it will be accepted but the content will be discarded.

If the response contains a non-2xx status code (4xx & 5xx), the notification will be retried at the next loop, until the endpoint will return a 2xx status code.

### The "Test Events" feature

If you are prototyping the integration with Cloudesire, you may find useful the "**Test Events"** functionality, available in the _General_ tab into Product editing page.

This button will trigger a chosen notification to your endpoint, without kicking any kind of workflow on the Cloudesire side. This test notification contains some stubbed data.

We strongly recommend to use this feature and make sure the integration is working properly.

## Workflow of a Subscription

### API Authentication requirements

Please make sure that you understand the basics of the [Cloudesire API](api.md) before interacting with the platform: most endpoints require _basic authentication_.

### First steps

Before you start, take a look to our [integration facilities](onboarding.md#integration-facilities): we provide a **staging marketplace** where you can register your company, log-in and develop your integration. You can also simulate the purchase of your product using demo credit cards.

We strongly recommend to onboard and test your application on the staging marketplace before onboarding it on the public marketplace.

Trigger a _SANDBOX_ order from the _Plans_ section inside the application edit page.

![Vendors Control Panel: Syndication - Sandboxing](/img/docs/control_panel_syndicated_sandbox.png)

The first event you will receive, is a `Subscription CREATED` event.

### Retrieve the subscription resource after a Subscription CREATED

You can start by fetching the _Subscription_ resource, that should exist after having received a `Subscription CREATED` event, by using the address contained in the _entityUrl_ attribute:

```http
GET /api/subscription/2388 HTTP/1.1
```
    

An example response would be:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "billingPeriod": 1,
    "buyer": {
        "url": "user/2240"
    },
    "company": {
        "url": "company/433"
    },
    "createdAt": "2015-01-05T13:59:00Z",
    "deploymentStatus": "WAITING_PAYMENT",
    "id": 2388,
    "invoices": [
        {
            "url": "invoice/2390"
        }
    ],
    "lastInvoice": "2015-01-05T13:59:00Z",
    "name": "Application syndicated - Base version",
    "nextInvoice": "2015-02-05T13:59:00Z",
    "orders": [
        {
            "url": "order/2389"
        }
    ],
    "paid": false,
    "product": {
        "url": "product/126"
    },
    "self": "subscription/2388",
    "syndicatedEndpoints": [],
    "type": "NORMAL",
    "updatedAt": "2015-01-05T13:59:00Z"
}
```

The `type` attribute contains which kind of order the customer has issued, and can be:

* `NORMAL`: standard order for which the customer is going to pay an invoice before using the application;
* `SANDBOX`: a test order issued by the vendor, that mimic the NORMAL order behavior.
* `TRIAL`: a request for a free trial of the application;

For `NORMAL` and `SANDBOX` subscriptions, you may notice that the `deploymentStatus` attribute is `WAITING_PAYMENT`, meaning that the customer has not paid the first invoice yet.

Before provisioning the tenant, you should wait for another `Subscription MODIFIED` event, checking that the `deploymentStatus` attribute contains `PENDING`, and the `paid` field is true.

The `paid` field is true when all the generated invoices for a certain subscription has been paid by the customer, otherwise it is false.

Please note that if the customer credit card information is stored on the platform, each subscription will be created as "already paid"  (namely in the first `Subscription CREATED` event, the `deploymentStatus` will be `PENDING`, and the `paid` field will be true.)

For `TRIAL subscriptions`, you should provision the new tenant immediately, and the initial `deploymentStatus` will be `PENDING` (and not `WAITING_PAYMENT`).

As you can see, the _Subscription_ resource contains references to other resources (e.g. _Orders_, _Invoice_, _User_, _Product_). You may want to fetch those object to retrieve additional information beside the data contained in the _Subscription_ resource.

For example the next step may be to fetch the associated resource `user/2240`, to retrieve information about the user who requested your application.

### Retrieve customer information

Once we got the customer reference, you can fetch it to obtain information about the customer:

```http
GET /api/user/2240 HTTP/1.1


HTTP/1.1 200 OK
Content-Type: application/json

{
    "acceptedTerms": true,
    "activated": true,
    "activationDate": "2014-01-01T00:00:00Z",
    "address": {
    "address": "Via Napoli",
    "city": "Pisa",
    "country": "IT",
    "id": 2241,
    "zipCode": "12345"
    },
    "creationDate": "2014-07-02T08:20:01Z",
    "email": "customer@example.org",
    "enabled": true,
    "environment": "cloudesire",
    "id": 2240,
    "name": "Demo Customer",
    "phoneNumber": "123891237912",
    "self": "user/2240",
    "userName": "customer",
    "userRole": "ROLE_USER"
}
```

At this point you may have everything you need to create a new tenant in your platform, but feel free to explore all the related resources.

### Update subscription information (after a new tenant provisioning)

Once the tenant provisioning is complete, you just need to notify the platform that the customer may use the application, activating the subscription and entering information on how to reach the application.  This means that you need to provide endpoints and end-user instructions.

#### Providing endpoints

Send a `POST` request to `subscription/2388/endpoints` to set the end-user application endpoints:

```http
POST /api/subscription/2388/endpoints HTTP/1.1
Content-Type: application/json; charset=utf-8

[
    {
    "endpoint": "https://application.example.org/login",
    "description": "Login page",
    "category": "APP"
    },
    {
    "endpoint": "https://application.example.org/reset_password",
    "description": "Password reset",
    "category": "PASSWORD_RESET"
    },
    {
    "endpoint": "https://docs.example.org/",
    "description": "Online Documentation",
    "category": "DOCUMENTATION"
    },
    {
    "endpoint": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "description": "Video tutorial",
    "category": "VIDEO"
    },
]
```    

Possible values for the _category_ field are: `APP`, `PASSWORD_RESET`, `DOCUMENTATION`, `VIDEO`. Please note that an endpoint with the category `APP` is required, while the others are optional.

Security note: applications endpoints must be accessible via HTTPS.

#### Providing End User Instructions

Vendors can submit localized messages to customers, for example to provide login instructions.

Languages depend on the marketplace, for example in a marketplace with English and Italian languages available:

```http
POST /api/subscription/2388/instructions HTTP/1.1
Content-Type: application/json; charset=utf-8

{
    "en": "Use your email as login and the password jei9je9y to login",
    "it": "Utilizza la tua email come login e come password: jei9je9y"
}
```

> It would be great to give the customer the possibility to [auto-login](syndication.md#auto-login) to your application without providing any credentials. To achieve this goal, we strongly suggest to add an **authorization token** to the endpoint to access the application. In this way, you can recognize the customer and enable automatic log-in into your application. If you follow this flow, you do not need to specify the user credentials into the end-user instructions.

### Set provisioning status to DEPLOYED

As the final step, send a `PATCH` request on the `subscription/2388` endpoint to alter the subscription status:

```http
PATCH /api/subscription/2388 HTTP/1.1
Content-Type: application/json; charset=utf-8

{
    "deploymentStatus": "DEPLOYED"
}
```

Starting from now, the customer can use your application!

### Problems during provisioning of your tenant

If something goes wrong during the provisioning of a new tenant in your application, please follow [these instructions](syndication.md#managing-provisioning-exceptions).

### Update subscription information (when the subscription expires)

When the subscription period expires, the platform will send another `Subscription MODIFIED` event. Fetch again the _Subscription_ and look at the **status** attribute that should be set to `UNDEPLOY_SENT` for the current subscription.

In this moment you should unprovision or block tenant access to your application, and confirm the operation via a `PATCH` request on the `subscription/2388` endpoint to finally terminate the subscription:

```http
PATCH /api/subscription/2388 HTTP/1.1
Content-Type: application/json; charset=utf-8

{
    "deploymentStatus": "UNDEPLOYED"
}
```

![syndication unprovisioning](/img/docs/Syndication-Worklow-Unprovisioning.png)

You have now completed the standard workflow for a syndicated application, congratulations!

### Billing events notifications

When the customer ask for a subscription renewal, version upgrade or trial-to-paid upgrade, the platform will send a `Subscription MODIFIED` event.

After receiving the event, you have to fetch the _Subscription_ resource, and make sure that your database is aligned with ours.

For example:

* for renewals: check the updated `endDate` field
* for version upgrade: check the updated `productVersion` field
* for trial-to-paid upgrade: check both updated `endDate` and `type` (`NORMAL`) fields

## Security

### Securing your endpoint

For security reasons, you probably want to limit requests on the specified endpoint(s) to those coming from us. If you set a **secret token** in the **application configuration** every event notification **payload will be signed** with and **HMAC hexdigest**.

### Validating payload signature

Once you have configured a secret token in your application configuration, a hash signature for each payload will be in the `CMW-Event-Signature` HTTP header. The goal is to compute a hash using your secret token, and ensure that the hashes match.

e.g. in Java, using **[Apache Commons Codec](https://commons.apache.org/proper/commons-codec/)**:

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

YMMV, of course. **Notice** though that the hash signature starts with `sha1=`, no matter which implementation you use.

## Managing Provisioning Exceptions

If something goes wrong during the provisioning of a new tenant in your application, please be sure to set the subscription status to `FAILED` by invoking our API, for example:

```http
PATCH /api/subscription/{id} HTTP/1.1
Content-Type: application/json; charset=utf-8

{
    "deploymentStatus": "FAILED"
}
```

and then to provide the customer appropriate _end-user instructions_, in order to explain what happened (e.g. _sorry, our system went down. Please retry later._)

## Advanced Billing Features

There a few features that can be used alongside the basic integration.

### Application Metrics

Even for syndicated applications, you can define and bills [application metrics](onboarding.md#application-metrics).

Besides the general usage and information provided, you should only take care of an additional **HTTP header**, sent to your metric endpoint: **CD-Subscription-Id**.

An example request:

```http
GET /custom_metric_endpoint HTTP/1.1
Content-Type: application/json; charset=utf-8
CD-Subscription-Id: 28
```

An expected response from your metric endpoint:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
    "metricsName": "custom_metric",
    "value": 3.0
}
```

This HTTP header will let you to identify the subscription from which a metric is requested, so you can return the proper value.

### Plan Upgrade

You can even upsell to your customers a new subscription plan. Please note that only upgrades and no downgrades are supported at this time.

```http
PATCH /api/subscription/{id} HTTP/1.1
Content-Type: application/json; charset=utf-8

{
    "action": "SYNDICATED_UPGRADE",
    "productVersion": {
    "url": "productVersion/123"
    }
}
```

The subscription should be an existing and deployed subscription of one of your customers, and the configuration should be the new product version you want to upgrade to.

Once requested, you will receive a Subscription MODIFIED event since the configuration attribute in the subscription resource will be modified accordingly to your request.

The customer will receive a new invoice, that needs to be payed, with prices scaled depending on how many days are remaining for the current billing period of the existing subscription.

### Trial to paid subscription upgrade

It's possible to upgrade a trial subscription to a paid one. The subscription must be in `DEPLOYED` state and cannot have a lifespan set.

You can upgrade a trial subscription by renewing it for the desired number of months.

Once renewed, a trial subscription becomes a proper paid subscription.

Given a trial subscription you are a vendor for with ID `{id}`, you can order a renewal for e.g. 1 month with a `PATCH` request:

```http
PATCH /subscription/{id} HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "action": "renew"
}


HTTP/1.1 204 No Content
```

### Custom billing

As a vendor, you can generate a custom invoice for a deployed, unexpired subscription. The generated invoice will be issued immediately.

Given a subscription you are a vendor for with ID `{id}` you can generate a custom invoice with a `POST /subscription/{id}/invoice` request:

```http
POST /subscription/{id}/invoice HTTP/1.1
Accept: application/json
Content-Type: application/json

[
    {
        "description": "First row",
        "price": {
            "price": "100.0000"
        },
        "quantity": 2.0,
        "unit": "un"
    },
    {
        "description": "Second row",
        "price": {
            "price": "23.4567"
        },
        "quantity": 1.0,
        "unit": "un"
    }
]


HTTP/1.1 201 Created
Location: https://backend.cloudesire.com/api/invoice/10000
```
    

### Recurring Costs

You can add recurring costs to a syndicated subscription.

Given a subscription you are a vendor for with ID `{id}` you can add recurring costs to it with a `POST /subscription/{id}/invoice/recurring` request:

```http
POST /subscription/{id}/invoice/recurring HTTP/1.1
Accept: application/json
Content-Type: application/json

[
    {
        "description": "First row",
        "price": {
            "price": "100.0000"
        },
        "quantity": 2.0,
        "unit": "un"
    },
    {
        "description": "Second row",
        "price": {
            "price": "23.4567"
        },
        "quantity": 1.0,
        "unit": "un"
    }
]


HTTP/1.1 200 OK
{}
```

Every invoice generated for a subscription with recurring costs will contain these lines.

To remove recurring costs from a subscription just post an empty list:

```http
POST /subscription/{id}/invoice/recurring HTTP/1.1

[]
```

### Proceeds declaration

As a vendor you can declare proceeds for one of your products active subscriptions.

Given a subscription with ID `{id}`, you can generate a cashed invoice with:

```http
POST /subscription/{id}/invoice?cashed=true HTTP/1.1
Accept: application/json
Content-Type: application/json

[
    {
        "description": "First row",
        "price": {
            "price": "100.0000",
            "vat": 22.0
        },
        "quantity": 2.0,
        "unit": "un"
    },
    {
        "description": "Second row",
        "price": {
            "price": "23.4567",
            "vat": 22.0
        },
        "quantity": 1.0,
        "unit": "un"
    }
]
```

These invoices will be used only while generating balance reports at the end of the month.

## Recap for Publishing

Before publishing your application into the marketplace, please make sure that these requirements are satisfied:

* appropriate **translations** are provided for the [**end-user-instructions**](syndication.md#providing-end-user-instructions), for each marketplace languages (e.g. English, Italian, etc.)
* **no HTML links** are present into the end-user instructions text (if you need to provide the end-users a link, please create a specific _endpoint_ for it; e.g. "reset password")
* at least one [**application endpoint**](syndication.md#providing-endpoints) is provided
* all the endpoints must have an appropriate **category**
* all the endpoints must be **accessible via HTTPS** due to the nature of data that business applications contains

During a purchasing process, a crystal-clear communication is a crucial point. For this reason, please **don't send email** to the customer after the provisioning of his _tenant_ in your application: Cloudesire will notify him for you.

If you need to provide the customer some information after the provisioning (e.g. the credentials to access your application, or a short guide to start using your application) you can provide specific _[end-user instructions](syndication.md#providing-end-user-instructions)._

### Auto-Login

It is great to enable your customers to **auto-login** to your application without providing any credentials.

For instance, it means that your customers will not need to remember credentials for Cloudesire platform AND your product. Also, you will not need to provide end-user instructions to your customers to login for the first time to your application. Long story short, you can provide your customer a smooth and simple user experience.

To achieve this goal, we strongly suggest to add an **authorization token** to the endpoint to access the application. In this way, you can recognize customers and enable automatic log-in to your application.

If you follow this flow, you do not need to specify user credentials into end-user instructions.

> In order to see your product visible on the marketplace, it should at least have one **Plan** set to _published_.
