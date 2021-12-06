---
id: modules-commvault
title: Selling and provisioning of tenants on Commvault
sidebar_label: Commvault tenants
---

Cloudesire platform enables selling of [Commvault] tenants via a native API
integration.

The customer would have access to the native Commvault UI to configure their
backup schedules for private or public workloads.

The integration also provide support to automatically enable backup schedules
for every new VMware VDC provisioned through our [vcloud integration].

## Product configuration

ISVs can onboard a Commvault as a new Product using [Syndicated] as a product
type and providing as a syndication endpoint, the endpoint to the
`commvault-connector` module installed on the platform (ask to the platform
administrators).

The product must be configured with `Max number of subscriptions` to `Only one
subscription is allowed` because customers are expected to have an unique
subscription to manage all of their backups.

The plan should includes 2 _pay as you go_ billing items, each one with the
following identifiers:

* `cvPrimaryBackupStorage`: the space in GB used for primary copies
* `cvSecondaryBackupStorage`: the space in GB used for geo-replicated copies

## Example

An example Commvault product is available on our [demo marketplace].

[Commvault]: https://www.commvault.com/
[vcloud integration]: modules-vcloud.md
[syndicated]: syndication.md
[demo marketplace]: https://demo-mcp.cloudeng.it/170871/data/backupprotect
