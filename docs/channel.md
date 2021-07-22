---
id: channel
title: Distribution and Channel Management
sidebar_label: Channel management
---

Distribution and channel management are available in the cloudesire platform.

When the channel management feature is enabled, new user roles became available:

* **Parent** (the marketplace owner) manage the catalog of products offered by
  ISVs and assign them to Distributors
* **Distributors** sell-in their products to their Resellers (business partners,
  dealers, agents)
* **Resellers** sell-out to End Customers

Each Reseller can bill/invoice autonomously, or on behalf of the Distributors
(useful for **Agents**/**Dealers**).

![parent-child summary schema](/img/docs/parent-child-schema.png)

## Logic along the chain

Channel management has a steep learning curve, let's begin to clarify some of
the most important behaviors.

### Product management and pricing

A product can be sold with the interaction of each user down the chain, from ISV
to the Reseller:

* The Parent manage ISVs, acquiring Products at the *Vendor Price* negotiated
  with the ISV
* The Parent decides the catalog composition for each Distributor, as well as
  the *Wholesale Price* for each Product Plan
* Each Distributor decides the Product Plans that he wants to assign in
  different catalogs, together with the respective *Sell-in Price* applying a
  markup to the *Wholesale Price*. Each Distributor catalog is assigned to one
  or more Resellers.
* Each Reseller decides the *Sell-out Price* for each Product Plan in one or
  more catalogs. Each Reseller can manage its own public marketplace with an
  associated default catalog, and can associate an End Customer to a specific
  catalog.

### Reseller features

Resellers have access to a unique set of features:

* Add **VAS** (Value Added Services,
  [extra-resources](glossary.md#extra-resources) to empower its own offer (like
  setup, training, support, devices, etc.). All pricing models available in
  Cloudesire can be applied also to VAS (typically: one-off, subscription,
  consumption)
* Build up its own [**coupons**](billing.md#coupons) (% discount, price
  override, trial extension | reusable or not | with/without time limit)
* Build up its own [**bundles**](billing.md#bundles), hence configure the
  (discounted) price of each bundled product
* Define a new category for each of the resold products on their marketplaces.

## Available Billing/Payment scenarios

The platform supports multiple ways in which a Reseller can sell products to End
Users.

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

### Order placement

For each of the previous billing scenarios, the Reseller has both the "**push**"
and "**pull**" selling modalities available:

* push: the Reseller insert the order on behalf of its End Customer
* pull: the End Customer buys directly from the Reseller marketplace

### Other relevant features

* an actor cannot visualize any data relating to its peers (example: a reseller
  cannot see the sell-in prices applied by its distributor to another reseller)
* actors down the chain cannot visualize any data that relies to an actor up the
  chain (example: reseller cannot see the price at which its distributor is
  buying a given product)
* prices can be decided by each actor relating to its adjacent down the chain
* prices for each service can be set different between peers by the actor up the
  chain
* Parent can deactivate one or more distribution tiers (up to Parent selling
  directly to End Customers)

Each Marketplace can be configured as:

* _standard_: all listing and transaction features enabled
* _listing_: products and prices are visible, but transactions are disabled
* _showcase_: products are visible, prices are masked and transactions disabled

## Parent functionalities

To start enabling the parent-child support into the Cloudesire platform, the
Parent needs to assign one or more products to a Distributor.

To do this, once logged as Parent:

* Click on the **Channel Catalog -> Distributor Products** menu item.
* Click **Add product** to begin assign a new product
* Search by Distributor name and by product name and click on **Add**.

Now the distributor can add the product in one or more **Price List**.

A Parent can also manage on behalf of the respective owners:

* Distributor Price Lists
* Distributor Sell-in
* Reseller Price Lists
* Reseller Sell-out

## Distributor functionalities

Once Distributors has one or more products associated from the Parent, they can
start to insert those products into their Price Lists.

To create a new Price List, logged as a Distributor:

* Click on the **Channel Catalog -> Price Lists** menu item
* Click on **Add** button.
* Insert a **Price List name** and assign existing resellers to this Price List.
* Click on **Save** to create the Price List.

To define a new Sell-in for a product, logged as Distributor:

* Click on the **Channel Catalog -> Products** menu item
* Select a product plan from the list that you want to add to a Price List
* Click on **Add Sell-in** button.
* On the new **Sell-in Configuration** section, select a **Price List** and
  define the **Sell-in one-off price** and the **Sell-in unit subscription
  price**, either as a Percentage or Currency.
* If the product has one or more Extra Resources, click on the **Resources** tab
  to configure the **Sell-in one-off price** and the **Sell-in unit subscription
  price**, either as a Percentage or Currency, for every available Extra
  Resource.
* Click on **Save** to insert the product in the selected Price List.

Each defined Sell-in inside a Price List, can be modified from Sell-in section:

* Click on the **Channel Catalog -> Sell-in** menu item
* Select a **Price List**
* Select any remaining filter and then click on **Search**
* Select the row that you wish to modify and click on **Edit** button
* Once done with the **Sell-in configuration**, click on **Save** button.

You can use the **Delete** button to remove the selected Plan from the current
Price List.

You can use the **Assign** button in this page to add a new product to the
current Price List, when no row is currently selected.

If the product sold is a [Docker application](docker.md) then the
**cloud-pricing** tab is also shown when editing the Sell-in.

The Distributor can also access to a real-time sales reports:

* Click on the **Proceeds** menu item
* Optionally filter by **Reseller**, **Vendor**, **Product** or time range

## Reseller functionalities

Once Resellers has been assigned to a Distributor Price List, they can start to
price those products into their own Price Lists.

To create a new Price List, logged as a Reseller:

* Click on the **Channel Catalog -> Price Lists** menu item
* Click on **Add** button.
* Insert a **Price List name** and assign existing resellers to this Price List.
* Click on **Save** to create the Price List.

To define a new Sell-out for a product, logged as Reseller:

* Click on the **Channel Catalog -> Products** menu item
* Select a product plan from the list that you want to add to a Price List
* Click on **Add Sell-out** button.
* On the new **Sell-out Configuration** section, select a **Price List** and
  define the **Sell-out one-off price** and the **Sell-out unit subscription
  price**, either as a Percentage or Currency.
* If the product has one or more Extra Resources, click on the **Resources** tab
  to configure the **Sell-out one-off price** and the **Sell-out unit
  subscription price**, either as a Percentage or Currency, for every available
  Extra Resource.
* Click on **Save** to insert the product in the selected Price List.

Each defined Sell-out inside a Price List, can be modified from Sell-out section:

* Click on the **Channel Catalog -> Sell-out** menu item
* Select a **Price List**
* Select any remaining filter and then click on **Search**
* Select the row that you wish to modify and click on **Edit** button
* Once done with the **Sell-out configuration**, click on **Save** button.

You can use the **Delete** button to remove the selected Plan from the current
Price List.

If the product sold is a [Docker application](docker.md) then the
**cloud-pricing** tab is also shown when editing the Sell-out.

The Reseller can also access to a real-time sales reports:

* Click on the **Proceeds** menu item
* Optionally filter by **Vendor**, **Product** or time range

### Sell-out visibility options

On the sell-out configuration section a reseller can choose among the 3
following “visibility options”:

* priced: the item is visible on the marketplace, its price is provided, and
  the customers can purchase it (default behaviour)
* included: the item is visible on the marketplace without any price, and the
  customers cannot purchase it (a “contact us” button is provided instead of
  the typical “buy now”)
* excluded: the item is not visibile on the marketplace, but the reseller can
  still sell it to a customer via [order placement](#order-placement)

## Automated distributors and resellers marketplace creation

The platform enables the management of independent marketplaces managed by
distributors and reseller.

The platform supports *Google DNS* and *Cloudflare* providers and can
automatically create new DNS records when creating a marketplace, for example:

* for a reseller: `https://username.resellers.parent.tld`
* for a distributor: `https://username.distributors.parent.tld`

A wildcard SSL certificate is required on Google DNS, while on Cloudflare the
native SSL is available by default.

When using a third-party DNS provider, it's possible to manually configure DNS
records required for new distributors and resellers marketplaces.
