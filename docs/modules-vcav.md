---
id: modules-vcav
title: Selling and provisioning of VMware vCloud Availability tenants
sidebar_label: vCloud Availability tenants
---

Cloudesire platform enables selling of VMware vCloud Availability tenants via a
native API integration.

The customer would have access to the native vCloud Availability UI to configure
Disaster Recovery and migrate workloads from/to multiple VMware clouds.

## Product configuration

ISVs can onboard a vCloud Availability as a new Product using [Syndicated] as a
product type and providing as a syndication endpoint, the endpoint to the
`vcav-connector` module installed on the platform (ask to the platform
administrators).

The plan should include 2 _pay as you go_ billing items, each one with the
following identifiers:

* `cdprometheusmetricreplications`: the number of protected VM (with an active
  replication configuration), `gauge` type
* `cdprometheusmetricbandwidthgib`: the amount of bandwidth consumed across the
  network by the replication jobs, `counter` type with `Increase value over
  time` function

## Example

An example VMware vCloud Availability product is available on our [demo
marketplace].

[Syndicated]: syndication.md
[demo marketplace]: https://demo-mcp.cloudeng.it/192805/data/availability-protect
