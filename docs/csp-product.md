---
id: csp-product
title: CSP products onboarding
sidebar_label: CSP products
---

This section describe how to onboard and start selling Microsoft product via its
[Cloud Solution
Provider](https://partner.microsoft.com/en-US/cloud-solution-provider/) (CSP)
program on the marketplace.

Currently the platform support only one CSP account per marketplace, so a
registered software vendor cannot import and use their own Partner Center
credentials. The platform administrator configure the credentials, import CSP
products into the marketplace catalog and assign them to a particular software
vendor account.

Reselling of a particular product by different entities is still possible via
the [channel management](channel.md) feature.

## Prerequisites

* CSP production/sandbox account credentials
* Cloudesire white-label platform

## Import CSP products into the marketplace catalog

As a platform admin, access the *Catalog* section into the *Control Panel*.

Click on the *Import Microsoft product* button to start the wizard to import a
new product into the catalog.

The first step of the wizard involves the following things:

* Deciding a *name* for the new product
* Selecting a product type between *license*, *azure marketplace* and *azure quickstart template*
* Assigning a vendor to the current product

The platform supports 3 type of products that can be sold:

* **License** type is for license-based products (e.g. Office 365 Business),
  published as a [XLS price list every month by
  Microsoft](https://docs.microsoft.com/en-us/partner-center/csp-documents-and-learning-resources#pricing).
* **Azure marketplace** type is for VM-based products available on the [Azure
  marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps) by
  third-party vendors.
* **Azure quickstart template** type is for products based on an [ARM JSON
  template](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-authoring-templates)
  available on the [Azure quickstart
  templates](https://azure.microsoft.com/en-us/resources/templates/).

Once the product has been selected, it's possible to decide an initial
pricing as a final step of the wizard, that can be customized later using the
full *Product Edit* features of the *Control Panel*.