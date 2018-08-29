---
title:     "Selling and provisioning OpenStack tenants"
author:    Giovanni Toraldo
authorURL: http://twitter.com/gionn
---

We're delighted to announce that we started the development of a new marketplace
component to allow the selling of tenants of [OpenStack
powered](https://www.openstack.org/) datacenters.

The goal is to give our marketplace customers the opportunity to purchase - and
immediately start to use - cloud resources on the OpenStack instances of our
platform clients.

To achieve this goal, we leveraged the [syndication
workflow](https://docs.cloudesire.com/docs/syndication.html) by developing an
integration with the OpenStack API layer. We are currently supporting the latest
Queens release of the 2018 February 28th but we took care to avoid
recently-introduced APIs in order to easily support older OpenStack versions.

To easily install OpenStack on our test environment, we leveraged the
[conjure-up](https://conjure-up.io/) tool maintained by Canonical, which allows
to automatically install and configure the most common OpenStack components on
multiple LXC containers on a single node (physical or VM).

At the end of the first development phase, we'll support the self-provisioning
of the OpenStack tenants as a consequence of each purchase of a special
product-type (VDC) which will be available on our marketplace catalog: the
workflow will automatically create a new OpenStack user (tenant), then associate
a new **Project** to him, and finally allocate specific **Resources Quotas**.

In this way, for each **VDC product plan**, the marketplace administrator can
set the minimum and maximum provisionable resources for each tenant, eventually
specifying a *prepaid pricing model* (e.g. monthly payments plus one-off costs,
plus professional services to be offered bundled with the VDC access).

The next development wave will also support the **pay-per-use** scenario: we’ll
integrate the OpenStack metering APIs in order to collect the actual cloud
resources usage; those metrics will be managed by our billing engine which will
generate (for each customer, at the end of the billing period) the related
invoices listing the consumption costs.

As usual, at the end of each development wave, we’ll publish the state-of-art of
the module on our [demo marketplace](https://demo.cloudesire.com).

<!--truncate-->
