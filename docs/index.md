---
id: index
title: Cloudesire platform
sidebar_label: Home
---

Cloudesire is an Enterprise XaaS Marketplace Platform that allows to sell
**subscriptions** on digital products/services provided by 3rd-parties.

![cloudesire architecture](assets/platform/Cloudesire-schema-simplified.png)

The platform provides:

- configurable and brandable **Marketplace** interfaces for publishing
  searchable and filterable products/services catalogs
- a **Control Panel** to easily configure flexible **pricing models**,
  supporting pre-paid and pay-per-use billing plans and volume discounts
- an integrated **Monitoring Engine** for collecting, and billing, custom
  application metrics
- a **Subscription Lifecycle Management Engine**
- a **Billing Engine**, integrated with a native **Invoicing Engine**,
  also supporting **orders approval workflow**
- support for external **Payments Gateways**
- support for **Indirect Reselling Channels**
- a **Customer Dashboard** to allow end-users to directly access their
  purchased services, submit *change-orders* on running subscriptions
  (e.g. plan-switching, upgrades, downgrades), perform payments, browse
  list of orders and invoices
- a documented **REST API Layer**, fully-covering the whole platform
  business logic

The **provisioning** process is typically in charge of the 3rd-party
providing the product/service to be sold on the marketplace, by
implementing a [Syndication Workflow](syndication.md).

In case of **pay-per-use** pricing models, the 3rd-party will also
provide the Cloudesire Monitoring Engine with *actual values*
for all the *billable metrics* belonging to the end-users' running
subscriptions.

## Available Integrations

Below follows a list of integrations available _off the shelf_ for
supporting the self-provisioning and orchestration of different kinds
of IAAS/PAAS/SAAS services.

### Native "product types"

The [onboarding interfaces](onboarding.md) provide specific "produt types"
(and dedicated configuration workflows) for each of the following options:

- [Bare VM](vm.md) provisioned on:
  - customers Public Cloud tenants
  - customers Private Cloud (VMware/OpenStack) tenants
- [API products](api-product.md)
- [Cloud Services](type-cloud-service.md)
- [Generic Services](service.md)
- [Microsoft CSP products](csp-product.md)

### Products available via "Syndicated Connectors"

On the [onboarding interfaces](onboarding.md) it's required to select
_"Syndicated"_ as _product type_ and then to specify the related
"connector syndication endpoint" (to be asked to the platform administrators):

- [VMware vCloud VDCs](modules-vcloud.md)
- [OpenStack VDCs](modules-openstack.md)
- [OpenShift OKD projects](modules-okd.md)
- [Commvault tenants](modules-commvault.md)
- [vCloud Availability tenants](modules-vcav.md)
- [AWS, Azure, Google Cloud tenants](modules-public-tenants.md)
- [Kubernetes clusters](modules-kubernetes.md) on Public Cloud providers
- [Helm charts](modules-helm.md) on Kubernetes clusters
- [Google Workspace tenants](modules-google-workspace.md)

## Main Topics

This website provides detailed documentation related to the following
topics:

- [Platform Modules](platform.md): a more detailed platform architecture
  diagram, with a brief description of the various modules, along with an
  explanation of the main concepts and a glossary.
  This could be a good starting point for your reading!
- [Onboarding Workflow](onboarding.md): how to onboard a new product/service
  on the Cloudesire marketplace
- [Marketplace Customization](marketplace.md): how to customize the UI of
  the marketplace, in order to make it compliant with your brand-identity
- [Channel Management](channel.md): how to configure a *Parent-Child Commerce
  Chain*, enabling multiple Distributors and Resellers
- [Orders Approval Workflow](order-approval-workflow.md): to enable use-cases where
  each order (new purchases, change requests) needs to be approved by a
  privileged user before it becomes effective
- [Live Reporting](live-reporting.md): a functionality that collects, with
  a configurable granularity (e.g. daily), the costs/revenues relating
  to all the pre-paid and pay-per-use services sold through the marketplace
- [Email Automation](emails.md): all the emails sent by the platform according to
  the supported use-cases
- [Cloud Providers](clouds.md): list of supported public cloud providers
- [REST API Guide](api.md): a complete guide to interact with the platform
  API Layer, along with examples and useful resources
