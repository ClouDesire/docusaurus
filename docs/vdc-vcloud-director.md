---
id: vdc-vcloud-director
title: Selling and provisioning of VMware vCloud Director tenants
sidebar_label: vCloud tenants
---

Cloudesire platform enables selling of vCloud director tenants via a native API
integration.

A special product on the marketplace is available for purchase that
automatically provisions a VDC organization with admin access.

To achieve this, administrator credentials of a vCloud Director platform is
necessary to be able to dynamically create new VDCs.

Both *prepaid* and *pay-as-you-go* pricing models are supported.

> Switching between different pricing models on an active subscription is not
> yet supported.

## Prepaid pricing model

In *prepaid* plans, customer selects how many CPU cores, GB of memory, GB of
disk space and IP addresses he wants to buy. In this case, project quotas are
automatically setup to ensure that the customer will not acquire too many
resources.

## Pay-as-you-go pricing model

In *pay-as-you-go* plans, customer is billed at the end of the billing period by
using the automatically gathered metrics for each of the billed resources (CPU
cores, GB of memory, GB of disk space). IP address needs to be bought as a
prepaid extra resources to be available inside the VDC network.

