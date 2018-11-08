---
id: channel
title: Distribution and Channel Management
sidebar_label: Channel management
---

Distribution and channel logics are available in the cloudesire platform.

* **Parent** (the MSP usually) deals with Vendors, and decides the catalog
  composition for Distributors together with Wholesale Prices
* **Distributors** sell-in to Resellers (VAS, VAR, business partners, dealers,
  agents, etc.)
* **Resellers** sell-out to End-Customers (applying a Recommended Retail Price
  imposed by the MSP, or building up their own price strategy)
* Each Reseller can bill/invoice autonomously, or on behalf of the Distributors
  (useful for **Agents**/**Dealers**)

![parent-child summary schema](/img/docs/parent-child-schema.png)

## Product/service assignment rules and pricing logics, along the chain

**Main Product / Pricing logics:**

* The Parent (the Service Provider, usually) deals with Vendors, acquiring
  Services at the "Vendor Price" negotiated with the Vendor
* The Parent decides the catalog composition for each Distributor,as well as the
  "Wholesale Price" for each Service Plan
* Each Distributor decides the Service Plans that he wants to assign to each
  Reseller, together with the respective "Sell-in Price" applying a markup to
  the "Wholesale Price"
* Each Reseller decides the "Sell-out Price" to publish to its End-Customers for
  each Service Plan. Sell-out Prices can alternatively be imposed by each of the
  actors up the chain (typically, Vendors that impose a Recommended Retail
  Price)

**Each actor down the chain (from ISV to Reseller) can also:**

* Add **VAS** (Value Added Services, AKA
  [extra-resources](glossary.md#extra-resource)) to empower its own offer (like
  setup, training, support, devices, etc.). All pricing models available in
  Cloudesire can be applied also to VAS (typically: one-off, subscription,
  consumption)
* Build up its own [**coupons**](billing.md#coupons) (% discount, price
  override, trial extension | reusable or not | with/without time limit)
* Build up its own [**bundles**](billing.md#bundles), hence configure the
  (discounted) price of each bundled product

## Available Billing/Payment scenarios

### Scenario 1: Self-Billing

* Cloudesire provides to the Reseller the _billing instructions_ (namely: who is
  consuming what, and respective duration)
* The Reseller invoices to its End-Customer, and collects the payment through
  its own properties (online or offline).

More info on [Self-billing section](billing.md#self-billing).

### Scenario 2: Billing on behalf

* Cloudesire invoices the End Customer with Parent or Distributor or Reseller
  administrative data (VAT, etc.) – can be set for each Reseller
* Cloudesire collects payments through its own payment gateways
* Cloudesire pays back each due amount up the chain to ISVs, Parent,
  Distributors, Resellers, Cloud Providers

### Scenario 3: Billing

* Cloudesire invoices the End Customer with Parent or Distributor or Reseller
  administrative data (VAT, etc.) – can be set for each Reseller
* Cloudesire collects payments, through the payment gateways of the Parent or
  Reseller
* Cloudesire calculates each due amount, to be paid by who has collected the
  payment along the chain to ISVs, Parent, Distributors, Resellers, Cloud
  Providers

For each Scenario, the Reseller has both the "**push**" and "**pull**" selling
modalities available:

* push: the Reseller insert the order on behalf of its Customer
* pull: the Customer buys directly from the Reseller store

### Other relevant features

* an actor cannot visualize any data relating to its peers (example: a reseller
  cannot see the sell-in prices applied by its distributor to another reseller)
* actors down the chain cannot visualize any data that relies to an actor up the
  chain (example: reseller cannot see the price at which its distributor is
  buying a given product)
* prices can be decided by each actor relating to its adjacent down the chain,
  or RRP can be forced by Parent
* prices for each service can be set different between peers by the actor up the
  chain
* Parent can deactivate one or more distribution tiers (up to Parent selling
  directly to End Customers)

Each Marketplace can be configured as:

* _standard_: all listing and transaction features enabled
* _listing_: products and prices are visible, but transactions are disabled
* _showcase_: products are visible, prices are masked and transactions disabled

Each Marketplace can be **customized**:

![reseller auto-generated marketplace](/img/docs/reseller-marketplace-custom.jpg)

## Parent functionalities

To start enabling the parent-child support into the Cloudesire
platform, the Parent needs to assign one or more products to each Distributor.

To do this, once logged as Parent, click on the _Catalog_ menu item and then on
the _Distributor-Products_ menu item. On this view, you can search by
Distributor name and/or by product name for filtering the list, otherwise you
can select a single Distributor and then click on the "add product" button on
the top-right to select a product to be assigned to him.

Each Distributor-product assignment can be deleted (but only if no subscription
was activated before for the corresponding product, through that specific
Distributor channel).

![admin distributor products](/img/docs/2-admin-distributor-products.png)

The _Distributor-Catalogs_ view provides a list of all the associations created
with the previous tool, together with all the product assignments made by each
Distributors to his Resellers.

It's possible to filer the list by searching for Distributor name, Reseller name
and product name.

![admin distributor catalogs](/img/docs/1-admin-distributor-catalogs.png)

## Distributor functionalities

The Distributor can access to his catalog by clicking on the namesake menu item.

![distributor catalog](/img/docs/3.1-distributor-catalog.png)]

By clicking on the "assign" button is possible to assign the specific product to
a Reseller: a dialog is proposed, where the Distributor can search a Reseller
(by filtering for his name) and then set the **sell-in markups** for the one-off
/ subscription / extra resources / cloud resources costs.

![sell-in selection](/img/docs/3.2-distributor-sell-in-config-product-preselected.png)

All the already created sell-in configurations are listed in the _Sell-In
Config_ view:

![distributor sell-in config list](/img/docs/3-distributor-sell-in-config-list.png)

By clicking on each row in the list, 3 new buttons should be proposed on the
top-right: "assign", "edit" and "delete".

The "assign" button can be used if no sell-in prices was assigned for the
specific product; if pressed the previously described dialog will be proposed to
create the configuration.

The "delete" button will unset the sell-in prices for the selected
product-Reseller assignment: this is obviously possible only if no subscriptions
was created on that specific channel.

The"edit" button can be used to change the current sell-in price configurations
for the selected product-Reseller assignment: of course the new sell-in prices
will become effective only for the successive subscriptions.

If no row is selected the "assign" button is shown on the top-right: by clicking
on it, the Distributor can create a new sell-in configuration from the scratch
on this interface, where is possible to configure the sell-in markups both for
the one-off costs and the subscription cost:

![distributor sell-in edit licenses](/img/docs/4-distributor-sell-in-config-edit-licenses.png)

By clicking on the "Extra-Resources" tab, the Distributor can also set the
sell-in markups also for the [extra-resources](glossary.md#extra-resource) to
be sold together with the product.

![distributor sell-in config edit extra resources](/img/docs/5-distributor-sell-in-config-edit-extra-resources.png)

If the product to be sold is a [Docker application](docker.md) then the
"cloud-pricing" tab is also provided. In this section, the Distributor can set
the sell-in markups for all the cloud resources unit prices, given a selected
[cloud provider](clouds.md) (among the all supported
by the platform).

![distributor sell-in edit cloud resources](/img/docs/6-distributor-sell-in-config-edit-cloud-resources.png)

The Distributor can also easily access to a real-time **sales reports** through
his Resellers' channels. This functionality is provided by the _Proceeds_ view,
where is possible to filter by date-interval (also having the partial totals in
the last records pagination) and by Reseller name.

![distributor realtime proceeds](/img/docs/7-distributor-proceeds.png)]

## Reseller functionalities

The Reseller can access the _Sell-Out Config_ section to browse the **sell-out
prices** related to all the products listed in his catalog. This view is
filterable by product name.

![reseller sell-out config list](/img/docs/8-reseller-sell-out-config-list.png)

By clicking on a specific row, a dialog will be provided, where the Reseller can
configure the sell-out prices both for the on-off and the subscription pricing
components:

![](/img/docs/9-reseller-sell-out-config-edit-licenses.png)

The "Extra Resources" tab will provide the possibility to set-up the sell-out
prices for the [extra-resources](glossary.md#extra-resource) to be sold
together with the product.

![](/img/docs/10-reseller-sell-out-config-edit-extra-resources.png)

If the product to be sold is a [Docker application](docker.md) then the
"cloud-pricing" tab is also provided. In this section, the Reseller can set the
sell-out prices for all the cloud resources units, given a selected [cloud
provider](clouds.md) (among the all supported by the
platform).

The Reseller can change the sell-out configurations for a product anytime: of
course the new prices will be applied only for the future subscriptions.

![](/img/docs/11-reseller-sell-out-config-edit-cloud-resources.png)

The Reseller can also easily access to a real-time **sales reports**. This
functionality is provided by the _Proceeds_ view, where is possible to filter by
date-interval (also having the partial totals in the last records pagination).

![](/img/docs/12-reseller-proceeds.png)]

### Automated distributor/reseller marketplace creation

The platform automatically creates **dedicated** **domain names** for each
distributor / reseller marketplace.

By default, the platform creates URLs following this pattern:

* reseller marketplaces: https://_reseller\_unique\_username_.**resellers**.parent\_domain\_name.com
* distributor marketplaces: https://_distributor\_unique\_username_.**distributors**.parent\_domain\_name.com

To be able to activate the above mechanism, the platform should be able
to dynamically create DNS records for the _parent\_domain\_name_ (a wildcard SSL
certificate is required).

It's also possible to manually configure **custom domain names** for distributor
/ reseller marketplaces.
