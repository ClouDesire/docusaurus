---
id: openstack
title: Selling and provisioning of OpenStack tenants
sidebar_label: OpenStack tenants
---

Cloudesire platform enables selling of OpenStack tenants via a native API
integration.

A special product on the marketplace is available for purchase that
automatically provision on OpenStack a new user with a dedicated project.

To achieve this, administrator credentials of an OpenStack cloud is necessary to
be able to dynamically create new users and projects.

Both *prepaid* and *pay-as-you-go* pricing models are supported.

In *prepaid* plans, end-users are asked for how many CPU cores, GB of memory, GB
of disk space and IP addresses want to buy. In this case, project quotas are
automatically setup to ensure that the end-user will not request too many
resources.

In *pay-per-use* plans, end-users are billed at the end of the billing period by
using the automatically gathered metrics for each of the billed resources (CPU,
ram, disk space, IP addresses).
