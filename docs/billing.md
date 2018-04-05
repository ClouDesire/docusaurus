---
id: billing
title: Billing Features
sidebar_label: Billing
---

Cloudesire provides a complete billing, invoicing and payments engine. This
means that the marketplace can manage the entire selling process without
external dependencies.

Before you read this section, please take a look to the
[glossary](glossary.md)to make sure you fully understand the terms that will be
used in this section.

## Overview

Each Cloudesire invoice contains the following items:

* _nominee_: the customer name
* _description_: purchased application name
* _setup costs_: optional application one-off setup cost
* _total_: application recurrent licensing cost
* [_pay-per-use application metrics_](onboarding.md#application-metrics) costs:
  specifying a unit-price for a custom metric allows Cloudesire to calculate the
  related incomes in a certain period of time (billing period) and issue an
  invoice to the customer.eg. 1.000,00 USD for 10 active users in the previous
  billing period
* [_extra-resources_](glossary.md#extra-resources) _costs_: Cloudesire supports
  3 different pricing models for "extra-resources", based on quantity usages.
  e.g. 10 days of Technical Support, 5 hardware components to be used together
  with the application, etc.
* _IaaS costs_: VM instance, bandwidth, disk space

In the following screenshots, you can see some examples of invoices issued by Cloudesire:

![syndicated product invoice](/img/docs/invoice_syndicated.png)]

![managed product invoice](/img/docs/invoice_cloud.png)]

## Pricing Rules

These are the main billing rules followed by the platform:

* _application licensing costs_: at the beginning of each billing period (eg.
  the first day of each month) all the invoices containing the application
  licensing costs and the IaaS costs are issued in advance to customers at the
  beginning of each billing period (eg. the first day of each month). The
  one-off application _setup cost_ is charged only in the first billing period;
* _pay-per-use and extra resources costs:_ invoices containing the [_pay-per-use
  application metrics_](onboarding.md#application-metrics) and _extra-resources_
  costs are issued to customers at the end of the billing period (eg. the last
  day of every month) ;
* _trial orders_: if an application is offered in **trial mode**, when customers
  use (try) it, Cloudesire issues an invoice to the vendor for the related IaaS
  costs. These costs are subtracted from the vendors' revenues in the [_Balance
  Report_](platform.md#glossary-balance-report);
* _sandbox orders_: when the vendor executes a **deployment test** before
  offering his application in the Marketplace (_sandbox_), Cloudesire issues an
  invoice for the related IaaS costs. Again, these costs are subtracted from the
  vendor's revenues in the [Balance
  Report](platform.md#glossary-balance-report).

## Plans configuration

* **billing frequency**: vendors can decide the preferred billing frequency (in
  months), for a every specific _application version_ The _billing frequency_
  can also be _short-living_: in this case, the duration needs to be expressed
  in hours instead of months.
* **minimum order duration**: vendors can decide the minimum order duration for
  each product plan. The minimum order duration is a multiple of the _billing
  frequency._

## Extra-Resources pricing models

Cloudesire supports 3 different pricing models for "extra-resources", based on
quantity usages: tiered scheme, volume scheme and stairstep scheme..

### Tiered scheme

Tiered scheme means that every unit charge is calculated with its own tier price.

With tiered pricing, once you fill up a *tier* you move to the next tier and
start charging a different price.

Tiered pricing is different from volume pricing because tiered pricing defines a
price per unit withing a range, while volume pricing defines a price for all
units within a range.

Example pricing:

* From 1 to 9 users: €5/user
* From 10 users: €3/user

Quantity bought 15 users, total amount: 9 x € 5,00 + 6 x € 3,00 = € 63,00

### Volume scheme

Volume scheme means that all units charge is calculated based on total count in
the related tier.

Therefore, as soon as you hit a particular number, all units will cost the lower
price.

Tiered pricing is different from volume pricing because tiered pricing defines a
price per unit within a range, while volume pricing defines a price for all
units within a range.

Example:

* From 1 to 9 users: €5/user
* From 10 users: €3/user

Quantity bought 15 users, total amount: 15 units * € 3,00 = € 45,00

### Stairstep scheme

Stairstep scheme means that the total cost is calculated based on price tier;
charge is not per unit.

Therefore, vendors will propose different unit prices for various quantities of
an item.

Example:

* From 1 to 9 users: €30
* From 10 users: €100

Quantity bought 15 users, total amount: € 100,00

The following screenshot shows an example of _Extra Resources_ linked to a
specific [Product Plan.](glossary.md#product-plan)

![Vendors Control Panel - Extra Resources](/img/docs/control_panel_extra_resources.png)

Detailed instructions, explaining how to specify and manage Extra Resources
during the onboarding process, are provided in [this
section](glossary.md#extra-resources).

## Orders Renewal

Cloudesire can manage orders with **automatic renewal** or not. In this case,
when a subscription is about to expires, the platform automatically issues a new
invoice to the customer for the next billing period; if the customer previously
decided to let the marketplace store his credit card data Cloudesire
contextually charges the customer.

If _automatic renewal_ is disabled:

* a few days before the subscription expiration, Cloudesire notifies the
  customer to remind the expiration and creates an invoice that the customer
  needs to pay to use the application after the subscription expiration
* if the customer doesn't renew his subscription (i.e. doesn't pay the related
  invoice), Cloudesire stops (or better _suspends_) the related application's
  instance and waits some days (the precise number is configurable in the
  platform) for the payment. If after this period the customer doesn't pay the
  invoice, Cloudesire destroys the application instance and the customer will no
  longer be able to access the application.

## Coupons

System Administrators, Vendors and Resellers can generate a coupons for each
product or product plan

Each coupon will have a unique _code_ and a _period of validity_. The
*code* is what customers need to enter in the coupon field to redeem the
coupon when purchasing an application.

It's possible to specify the e-mail address of a specific user and send the
coupon only to him. If the coupon is created for a specific user, the platform
sends him a communication containing the coupon. It's also possible to
distribute coupons outside the platform: users only need to know the code to
redeem the coupon.

Cloudesire allows to generate 2 types of coupons:

* **discount**: when the customer uses this kind of coupon, a discount is
  applied to the application price;
* **fixed price**: when the customer uses this kind of coupon, a fixed price
  (usually lower) overrides the original one for the given application version
  (plan). A typical use case is: the vendor doesn't want to publish a public
  price for the application and wants to choose a different price for each
  customer.

Coupons can be:

* "**one-time only**", meaning that each coupon can only be used one time and is
  not reusable (even if it is transferable from one customer to another)
* "**reusable**", meaning that each coupon can be used more times (until its
  expiration date)

Furthermore, Cloudesire supports an additional type of coupon:

* **extended trials**: when the customer uses this kind of coupon, the default
  _trial period length_ (e.g. 10 days) will be replaced with the one specified
  in the coupon (e.g. 30 days). A coupon of this type remains valid for all the
  customers receiving this coupon code. This rule does not override the general
  rule "only one trial for each product for each customer". For each _extended
  trials_ coupon, the system administrator can allocate a budget (or _plafond_)
  which will be decreased by a certain amount every time it will be used by
  a customer.

## Bundles

Cloudesire allows System Administrators, and Resellers to create _bundles_ as a
composition of 2 or more products.

A bundle has the same "marketing & legal" attributes of a _normal_ product
(icon, descriptions, feature list, FAQ, screenshots, video, ToS, Privacy Policy,
etc.). On top the platform allows to create several **plans** for the same
bundle (e.g. _silver_, _gold_, _platinum_, etc.).

Each _bundle plan_ is defined as a composition of _products plans. _Using a
simple interface it's possible to specify for each of them a **discount
percentage**; in this way, the total price of a _bundle plan_ is calculated as
the sum of all the discounted prices of all the _products plans attached to
it.

![bundle on the control panel](/img/docs/bundles-4.png)]

On the Marketplace, a bundle is shown as a normal product, highlighting the
discounts, while in the ordering page the customer can have a detailed view of
all the prices and the savings.

![bundle on the marketplace](/img/docs/bundles-6.jpg)]

## Cloud resources pricing

Pricing for the VM associated with managed products is automatically managed by
the platform and vendors should not worry about it.

### Prepaid Bandwidth

* vendors can specify a certain amount of prepaid bandwidth for each application
  they sell in the Cloudesire Marketplace
* Cloudesire manages the bandwidth price for each supported cloud provider
* if the vendor doesn't set a specific prepaid bandwidth amount to his
  application, Cloudesire associates a default prepaid bandwidth package (eg.
  10GB)
* during the deployed application lifetime, if the bandwidth usage exceeds the
  90% of the established limit, Cloudesire sends an e-mail notification to the
  customer, asking for a **bandwidth upgrade order**. If the customer doesn't
  execute the upgrade, Cloudesire prevents access to the application.

### Disk Space

* vendors can specify a certain amount of disk space for each application they
  sell in the Cloudesire Marketplace
* Cloudesire manages the disk space price for each supported cloud provider
* during the deployed application lifetime, if disk space usage exceeds 90% of
  the established limit, Cloudesire sends a notification email to the customer,
  asking for a **disk upgrade order**.

### Backup

* Cloudesire allows the customers to buy **backup plans.**
* every backup plan includes to a maximum number of backups executions (configurable in the platform) that can be manually performed by the customers or scheduled
* a backup plan must be paid by the customer in advance
* if the customer needs to perform a manual backup when the maximum limit in the backup plan is reached, a new **backup order** is created and a related invoice is issued. In this case, the backup starts only when the invoice is paid.

## Payments

* to date, the supported payment gateways for credit cards are **Stripe** and
  ***PayPal**.
* SEPA payments are supported via **Stripe**.
* after the sale of an application, when the customer pays the related invoice,
  Cloudesire automatically starts the application deployment process on the
  selected cloud provider
* if a problem occurs during the interaction with the payment gateway,
  Cloudesire allows the platform administrator to manually set an invoice as
  "paid" (in order to start the deployment process). This feature can be also
  useful to manage **bank transfer** payments (in this case, when the
  administrator sets an invoice as "paid" he can provide the _deposit slip_ data
  using a specific input field)

## Self-Billing

In some particular business scenarios it should be useful to to let some vendors
to issue invoices from themselves, without using the Cloudesire billing engine.

The platform allows the admins to mark a specific product / plan as
"self-billed".

In this case, when the user purchases a product, the platform "begins" the
provisioning and doesn't ask the customer to pay anything.

The real provisioning starts only when the vendor clicks on a specific button on
the control panel for "declaring" (and taking the responsibility) that the
"invoice is paid" and the application can really be provisioned to the end-user.

The platform logs that the vendor should pay the fee back to the platform owner.

The same functionality is also available for the resellers.

A reseller can can mark a _sell-out price_ as "self-billed" for exposing the
related product into his _reseller-marketplace_ without enabling the payment
functionalities on it.