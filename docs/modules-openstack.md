---
id: modules-openstack
title: Selling and provisioning of OpenStack tenants
sidebar_label: OpenStack VDC
---

Cloudesire platform enables selling of OpenStack tenants via a native API
integration.

A special product on the marketplace is available for purchase that
automatically provision on OpenStack a new user with a dedicated project.

To achieve this, administrator credentials of an OpenStack cloud is necessary to
be able to dynamically create new users and projects.

Both *prepaid* and *pay-as-you-go* pricing models are supported.

> Switching between different pricing models on an active subscription is not
> yet supported.

## Prepaid pricing model

In *prepaid* plans, customer selects how many CPU cores, GB of memory, GB of
disk space and IP addresses want to buy. In this case, project quotas are
automatically setup to ensure that the customer will not request too many
resources.

## Pay-as-you-go pricing model

In *pay-as-you-go* plans, customer is billed at the end of the billing period
by using the automatically gathered metrics for each of the billed resources
(CPU cores, GB of memory, GB of disk space, IP addresses).

## Example

An example OpenStack VDC product is available on our [demo
marketplace](https://demo-mcp.cloudeng.it/161743/compute/virtual-data-center-openstack).
