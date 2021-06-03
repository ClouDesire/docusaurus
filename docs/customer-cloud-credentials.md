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
* Resource name: the ARN identifying your amazon account in the form `arn:aws:iam::<account-id>:role/OrganizationAccountAccessRole`. Replace `<account-id>` with your account numeric ID (e.g: 012345678901)

Obtain the credentials on the [IAM](https://console.aws.amazon.com/iam/home) section of the AWS console.

## Azure

You can obtain Azure credentials on the [Azure portal](https://portal.azure.com)
with the following steps:

* Access `Azure Active Directory` service from the dashboard
* Go in `App registrations` section under `Manage`
* Create a new app with the `New registration` button
* Choose a name of your preference (e.g. `cloudesire integration app`), note it
  because it's required later. Leave defaults for remaining settings
* Copy `Application (client) ID` and paste it on the Cloudesire `Identity` field
* Copy `Directory (tenant) ID` and paste it on the Cloudesire `OAuth endpoint`
  in the form `https://login.microsoftonline.com/<directory-id>/oauth2/token`
* Go in `Certificates & secrets` section under `Manage`
* Create a new secret with the `New client secret` button, selecting your
  preferred expiration for this credential
* Copy secret `Value` and paste it on the Cloudesire `Credential` field
* Go back to the dashboard and access the `Subscriptions` section, select your
  subscription
* Copy `Subscription ID` and paste it on the Cloudesire `Endpoint` field in the
  form of `https://management.azure.com/subscriptions/<subscription-id>`
* Go in `Access control (IAM)` section and select `Add a role assignments`
* Create a role assignment with role `Contributor` and assign access to the App
  providing the name you chosen early

Now you are ready to create a new Cloud Credential on the Cloudesire panel.

An example configuration would be:

* Identifier: `my-azure-credential`
* Identity: `f752ce48-618a-44f8-b5ef-47b5ab9b25b2`
* Credential: `51wYIN41AC.UU29tzeT9l_xx89~1Pw~MDK`
* Endpoint: `https://management.azure.com/subscriptions/d7759627-d2df-4caa-8f02-6fa88b694b4f`
* OAuth endpoint: `https://login.microsoftonline.com/96fabb56-8782-4f37-b6f2-ae41118a6b43/oauth2/token`
