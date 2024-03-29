---
id: csp-product
title: CSP products onboarding
sidebar_label: Microsoft CSP
---

Cloudesire can be used as cloud **Billing Engine** for Microsoft **Direct CSPs**
to automate the selling of Office 365 licenses, Azure subscriptions and so on.

This section describe how to onboard and start selling Microsoft product via its
[Cloud Solution Provider](https://partner.microsoft.com/en-US/cloud-solution-provider/)
(CSP) program on the marketplace.

The platform supports one **CSP account** per marketplace (currently a vendor
cannot use their own Partner Center credentials). The platform administrator
configures the credentials, imports **CSP products** into the marketplace
catalog and assigns them to a particular software vendor account.

Reselling of a particular product by different entities is still possible via
the [channel management](channel.md) feature.

## Prerequisites

* CSP production/sandbox account credentials
* Cloudesire white-label platform

## Import CSP products

As a platform admin, access the *Catalog* section into the *Control Panel*.

Click on the *Import Microsoft product* button to start the two-steps wizard to
**import a new CSP product into the marketplace catalog**.

The first step of the wizard involves the following things:

* Select a product type between **licence** and **azure marketplace**
* **Search** a CSP product by name
* Decide a **name** for the new product that will be exposed on the marketplace catalog
* **Assign a company** that will be responsible of managing the product

![Import microsoft product](assets/csp-product/import-microsoft-product.png)

### CSP product types

The platform supports selling three different type of products:

* **License** type is for license-based products on the [XLS price
  list] published every month by Microsoft (e.g. Office 365).
* **Azure marketplace** type is for VM-based products available on the [Azure
  marketplace] by third-party vendors.
* **ARM template** type is a deployment of one or more VM provisioned from a
  [JSON descriptor].

On the second step of the wizard, the selected CSP product offer id or azure
metadata is showed to confirm that the selected product is correct, and it's
possible to decide an **initial pricing**.

![Import microsoft product](assets/csp-product/import-microsoft-product-create.png)

### Product details customization

Once the product is imported, it can be customized as with any other
product present in the catalog (logo, description, and so on), and additional
[Extra Resources](onboarding-extra-resources.md) can be added at your choice.

### Trial support

To enable trial support for a specific plan, an integration metadata entry should be
configured with key `partnerCenterTrialOfferId` and as value the preferred `offer-id`
of type TRIAL for the same product type.

[XLS price list]: https://docs.microsoft.com/en-us/partner-center/csp-documents-and-learning-resources#pricing
[Azure marketplace]: https://azuremarketplace.microsoft.com/en-us/marketplace/apps
[JSON descriptor]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-authoring-templates
