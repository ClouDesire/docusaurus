---
id: api-php
title: PHP Client for Cloudesire API
sidebar_label: PHP Client
---

If you are a vendor looking to integrate the syndicated provisioning progress,
or just call the Cloudesire API from PHP, this page is for you.

The simplest way to interact with a REST API in PHP is leveraging the
[sendgrid/php-http-client](https://github.com/sendgrid/php-http-client).

Please take a look at the following upstream documentation:

* [Requirements](https://github.com/sendgrid/php-http-client#prerequisites)
* [Install with Composer](https://github.com/sendgrid/php-http-client#install-with-composer)
* [Install without Composer](https://github.com/sendgrid/php-http-client#install-without-composer)

## Instantiate the client

To obtain an authenticated client you need to provide the URL of the [Cloudesire
API](api.md#domains) (`$api_url`) and a [permanent authentication
token](api.md#permanent-authentication-token) (`$token`).

> Avoid hard-coding those parameters, use environment variables or .ini files.

```php
<?php
require __DIR__ . '/vendor/autoload.php';

$api_url = getenv('CLOUDESIRE_URL');
$token = getenv('CLOUDESIRE_TOKEN');
$headers = ['CMW-Auth-Token:' . $token];
$client = new SendGrid\Client($api_url, $headers);
```

## Fetch subscription data

Every time you receive a syndication event, you need to fetch an updated view of
the specific subscription resource.

```php
$subscriptionId = 20000;
$response = $client->subscription()->_($subscriptionId)->get();
$subscription = json_decode($response->body(), true);
```

## Set subscription endpoints

When the provisioning has been completed on your side, you need to provide the
[end-user endpoints](syndication.md#providing-endpoints-end-user-links-to-access-application)
to access your application.

```php
$endpoints = [
    [
        'endpoint'    => 'https://www.yourapp.com/login',
        'description' => 'Login Page',
        'category'    => 'APP'
    ]
];
$response = $client->subscription()->_($subscriptionId)->endpoints()->post($endpoints);
```

## Provide end-user instructions

Along with the end-user endpoints, you can provide textual
[instructions](syndication.md#providing-end-user-instructions)
to the end-user.

```php
$instructions = [
    'en' => 'Demo English Instructions',
    'it' => 'Istruzioni esemplificative in italiano'
];
$response = $client->subscription()->_($subscriptionId)->instructions()->post($instructions);
```

## Set subscription deployment status to DEPLOYED

Once endpoints and end-user instructions, you can [set the subscription deployment
status to completed](syndication.md#set-provisioning-status-to-deployed).

```php
$requestBody = [
    'deploymentStatus' => 'DEPLOYED'
];
$response = $client->subscription()->_($subscriptionId)->patch($requestBody);
```

## Set subscription deployment status to UNDEPLOYED

When the subscription expires, you need to forbid user to access your application
and confirm the [undeployment of the subscription](syndication.md#update-subscription-information-when-the-subscription-expires).

```php
$requestBody = [
    'deploymentStatus' => 'UNDEPLOYED'
];
$response = $client->subscription()->_($subscriptionId)->patch($requestBody);
```
