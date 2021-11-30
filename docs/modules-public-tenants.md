---
id: modules-public-tenants
title: Tenants on Public Cloud providers
sidebar_label: Public Cloud Tenants
---

The Cloudesire platform enables AWS, Azure or Google Cloud partners to
automatically provision and bills public cloud services to their customers.

## Prerequisites

Marketplace owner must have signed a partnership agreement with AWS, Azure or
Google Cloud.

## How it works

For each supported cloud providers, there is a platform module that manage the
life-cycle of the public cloud tenants tied with the Cloudesire subscriptions.

When a customer orders a public tenant, a new account on the specific Cloud
Provider get provisioned, and the admin credentials, necessary for the
first setup of the account, are provided to the customer.

The Cloudesire platform automatically create `Cloud Credentials` associated to
the newly created account, enabling the future provisioning of BareVM or
Kubernetes cluster.

Credentials are securely stored on a [Vault by
HashiCorp](https://www.vaultproject.io/) instance integrated into the Cloudesire
platform.

Overnight, the `costs-collector` module harvest from the cloud providers billing
API the costs associated for each active tenant.

The harvested costs are immediately pushed as live proceeds and made available
to the customers in their *Cost Analysis* section.

Each month, invoices are emitted automatically covering all the costs spent by
the customer in the current billing period.
