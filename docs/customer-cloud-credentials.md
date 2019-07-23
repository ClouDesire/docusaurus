---
id: customer-cloud-credentials
title: Customer Cloud Credentials
sidebar_label: Customer Cloud Credentials
---

Customers can provide credentials to provision [bare vm](vm.md) and [docker
applications](docker.md) on their own public [cloud provider
account](clouds.md).

## AWS

You can use your AWS account on the platform by providing:

* Identifier: an unique description useful for recognizing this credentials among
  the others
* Access key: the access key ID (for example, AKIAIOSFODNN7EXAMPLE)
* Secret key: the secret access key (for example,
  wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY)

Obtain the credentials by creating a new user on [IAM
console](https://console.aws.amazon.com/iam/home), with permission
`AmazonEC2FullAccess`.

## Azure

* Identifier: an unique description useful for recognizing this credentials among
  the others
* Identity: the application-id (or client-id) of a new `App registration` inside
  the `Azure Active Directory` section
* Credential: the `Client secret` into the `App registration` section
* Endpoint: an URL in the form
  `https://management.azure.com/subscriptions/<subscription-id>`
* OAuth endpoint: an URL in the form,
  `https://login.microsoftonline.com/<tenant-id>/oauth2/token`. The `Tenant-id`,
  into the `App registration` section (also called `Directory id`)

Obtain the credentials on the [Azure portal](https://portal.azure.com):

* Create a new `app` in `Azure Active Directory` - `App registrations` section
* Create a new `Client secret` for the app
* Go to the `Subscriptions` section and select your subscription. In the
  `Access control (IAM)` section, select `Add a role assignment`. Create a new
  role assignment with role `Contributor` and as `Service principal` the app
  name
