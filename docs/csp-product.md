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

## Import CSP products

As a platform admin, access the *Catalog* section into the *Control Panel*.

Click on the *Import Microsoft product* button to start the two-steps wizard to
**import a new CSP product into the marketplace catalog**.

The first step of the wizard involves the following things:

* Select a product type between **licence** and **azure marketplace**
* **Search** a CSP product by name
* Decide a **name** for the new product that will be exposed on the marketplace catalog
* **Assign a company** that will be responsible of managing the product

![Import microsoft product](/docs/assets/csp-product/import-microsoft-product.png)

### CSP product types

The platform supports 3 type of products that can be sold:

* **License** type is for license-based products on the [XLS price
  list] published every month by Microsoft (e.g. [Office 365 Business]).
* **Azure marketplace** type is for VM-based products available on the [Azure
  marketplace] by third-party vendors (e.g. [Cassandra]).
* **ARM template** type is a deployment of one or more VM provisioned from a
  [JSON descriptor] (e.g. [Wordpress]).

On the second step of the wizard, the selected CSP product offer id or azure
metadata is showed to confirm that the selected product is correct, and it's
possible to decide an **initial pricing**.

![Import microsoft product](/docs/assets/csp-product/import-microsoft-product-create.png)

### Product details customization

Once the product is imported in catalog, it can be customized as with any other
product present in the catalog (logo, description, and so on), and additional
[Extra Resources](onboarding.md#extra-resources) can be added at your choice.

[Office 365 Business]: https://demo.cloudesire.com/1280/office-automation/office-365
[Cassandra]: https://demo.cloudesire.com/1727/office-automation/cassandra-on-azure
[Wordpress]: https://demo.cloudesire.com/1248/cms/wordpress-on-azure-arm-template
[XLS price list]: https://docs.microsoft.com/en-us/partner-center/csp-documents-and-learning-resources#pricing
[Azure marketplace]: https://azuremarketplace.microsoft.com/en-us/marketplace/apps
[JSON descriptor]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-authoring-templates
