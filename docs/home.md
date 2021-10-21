---
id: home
title: Home
sidebar_label: Home
---
# Platform Architecture

Cloudesire is an Enterprice XaaS Marketplace Platform that allows to sell 
**subscriptions** on digital products/services provided by 3rd-parties.

![cloudesire architecture](assets/platform/Cloudesire-schema-simplified.png)

The platform provides:
- customizable and brandable **Marketplace** interfaces for publishing 
  searchable and firterable products/services catalogs
- a **Control Panel** to easily configure flexible **pricing models**, 
  supporting pre-paid and pay-per-use billing plans and volume discounts
- an integrated **Monitoring Engine** for collecting, and billing, custom
  application metrics
- a **Subscription Lifecycle Management Engine**
- a **Billing Engine**, integrated with a native **Invoicing Engine**,
  also supporting **orders approval workflow**
- support for external **Payments Gateways**
- support for **Indirect Reselling Channels** 
- a **Customer Dashboard** to allow end-users to directly accces their 
  purchased services, submit *change-orders* on running subscriptions 
  (e.g. plan-switching, upgrades, downgrades), perform payments, browse 
  the list orders and invoices
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

A list of integrations are available off the shelf for supporting 
the self-provisioning and orchestration of different kind of 
IAAS/PAAS/SAAS services:
- [VMWare vCloud tenants](modules-vcloud.md)
- [OpenStack tenants](modules-openstack.md)
- [OpenShift OKD projects](modules-okd.md)
- [Microsoft CSP services](csp-product.md)
- GCP/Azure/AWS tenants
- Google GSuite tenants
- Commvault tenants
- Kubernetes clusters on EKS/GKE/AKS
- [bare VMs](vm.md) and [Docker](docker.md) Apps provisioned on:
  - shared/dedicate hyperscalers' tenants
  - shared/dedicate private VMWare/OpenStack tenants

## Main Topics

This website provides detailed documentation related to the following
topics:

- [Platform Modules](pletform.md): a more detailed platform architecture
  diagram, with a brief description of the various modules, along with an 
  explaination of the main concepts and a glossary. 
  This could be a good starting point for your reading!
- [Onboarding Workflow](onboarding.md): how to onboard a new product/service 
  on the Cloudesire marketplace
- [Marketplace Customization](marketplace.md): how to customize the UI of
  the marketplace, in order to make it compliant with your brand-identity 
- [Channel Management](channel.md): how to configure a *Parent-Child Commerce
  Chain*, enabling multiple Distributors and Resellers
- [Orders Approval Workflow](approval-workflow.md): to enable use-cases where
  each order (new purchases, change requests) needs to be approved by a 
  privileged user before it becomes effective
- [Live Reporting](live-reportin.md): a functionality that collectis, with 
  a configurable granularity (e.g. daily), the costs/revenues relating 
  to all the pre-paid and pay-per-use services sold through the marketplace
- [Email Automation](emails.md): all the emails sent by the platform according to
  the supported use-cases
- [Cloud Providers](clouds.md): list of supported public cloud providers
- [REST API Guide](api.md): a complete guite to interact with the platform
  API Layer, along with examples and useful resources
