---
id: modules-public-tenants
title: Tenants on Public Cloud providers
sidebar_label: Public Cloud Tenants
---

The Cloudesire platform enables AWS, Azure or Google Cloud partners to
automatically provision and bill public cloud services to their customers.

## Prerequisites

Marketplace owner must have signed a partnership agreement with AWS, Azure or
Google Cloud.

## How it works

For each supported cloud provider, a specific platform module manages the
life-cycle of the public cloud tenants tied with the Cloudesire subscriptions.

When a customer orders a public tenant, a new account on the specific Cloud
Provider gets provisioned, and the admin credentials, necessary for the
first setup of the account, are provided to the customer.

The Cloudesire platform automatically creates [Cloud
Credentials](customer-cloud-credentials.md) associated to the newly created
account, enabling the future provisioning of [BareVM](vm.md) or
[Kubernetes](modules-kubernetes.md).

Credentials are securely stored on a [Vault by
HashiCorp](https://www.vaultproject.io/) instance integrated into the Cloudesire
platform.

Overnight, the `costs-collector` module harvests from the cloud providers billing
API the latest costs associated for each active tenant. Since the costs on
billing API are made available without a timing guarantee, the daily harvesting
is actually performed on a moving window of multiple days, refreshing existing
billing data with the most updated ones.

The harvested costs are immediately pushed as *live proceeds* and made available
to the customers in their *Cost Analysis* section.

Each month, invoices are issued automatically, covering all the costs incurredfixes by
the customer in the current billing period.
