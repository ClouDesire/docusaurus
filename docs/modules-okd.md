---
id: modules-okd
title: Selling and provisioning of OKD projects
sidebar_label: OKD projects itnegration
---

Cloudesire platform enables selling of OKD projects via a native API
integration.

A special product on the marketplace is available for purchase that
automatically provision on OKD a new user with a dedicated project.

To achieve this, administrator credentials of an OKD platform is necessary to
be able to dynamically create new users and projects.

Both *prepaid* and *pay-as-you-go* pricing models are supported.

> Switching between different pricing models on an active subscription is not
> yet supported.

## Prepaid pricing model

In *prepaid* plans, customer selects how many vCPU cores and GB of memory should
be available on the project, and optionally GB of disk space. In this case,
project quotas are automatically setup to ensure that the customer will not
allocate too many resources beyond their limits.

## Pay-as-you-go pricing model

In *pay-as-you-go* plans, customer is billed at the end of the billing period by
using the automatically gathered metrics for each of the billed resources (vCPU
cores, GB of memory, GB of disk space).

## Example product

An example OKD product is available on our [demo
marketplace](https://demo-mcp.cloudeng.it/37618/devops/container-app-platform).
