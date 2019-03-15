---
id: billing
title: Billing Features
sidebar_label: Billing
---

The Cloudesire platform provides a complete billing, invoicing and payments
engine. This means that the marketplace can manage the entire selling process
without external dependencies.

Before you read this section, please take a look to the
[glossary](glossary.md)to make sure you fully understand the terms that will be
used in this section.

## Overview

Each generated invoice contains the following elements:

* _nominee_: the customer name
* _description_: purchased application name
* _one-off cost_: product one-off setup cost if any
* _license cost_: application recurrent licensing cost
* [_pay-per-use application metrics_](onboarding.md#application-metrics): costs
  that vary depending on real usage of the application
* [_extra-resources_](glossary.md#extra-resource): costs for prepaid resources
* [_cloud resources costs_](billing.md#cloud-resources-pricing): costs for the
  cloud infrastructure used for Docker applications.

In the following screenshots, you can see some examples of invoices issued by Cloudesire:

![syndicated product invoice](/img/docs/invoice_syndicated.png)

![managed product invoice](/img/docs/invoice_cloud.png)

## Billing principles

These are the main billing principles:

* _product licensing costs_: at the beginning of each billing period (every
  30 days) an invoice containing the application licensing costs and the IaaS
  costs is issued in advance to the customer. The one-off cost is charged only
  in the first billing period
* _extra resources_: if prepaid extra resources are defined, they are added into
  the same invoice of the licensing costs. If pay-as-you-go, at the end of the
  billing period, an invoice containing the pay-per-use costs is issued to the
  customer
* _trial and sandbox orders_: if an cloud application is offered in **trial
  mode**, cloud costs will be charged to the vendor, in the same report where
  earnings are calculated.

## Subscription Renewal

Cloudesire can manage subscriptions with **automatic renewal** (autorenew)
enabled or not.

If **autorenew** is enabled:

* when a subscription expires, the platform automatically issues a new invoice
  to the customer for the next billing period
* if the customer previously decided to let the marketplace store his credit
  card data, Cloudesire automatically charges the invoice amount.

If **autorenew** is disabled:

* a few days before the subscription expiration, Cloudesire notifies the
  customer to remind the expiration and creates an invoice that the customer
  needs to pay to use the application after the subscription expiration
* if the customer doesn't renew his subscription (i.e. doesn't pay the related
  invoice), Cloudesire _suspends_ the subscription
  instance and waits some days (the precise number is configurable in the
  platform) for the payment. If after this period the customer doesn't pay the
  invoice, Cloudesire destroys the application instance and the customer will no
  longer be able to access the application.

### Pricing application policies during a renew

During the lifetime of an active subscription, prices may be modified by their
owners.

The platform will automatically **applies the up-to-date prices** during the renew
process of a subscription, and they are persisted inside the order for future
reference.

If a new invoice is generated for a subscription with an order duration window
that is greater than the billing period (e.g.: a product with a yearly
commitment but monthly billing), the prices applied are consistent for the
entire order duration window.

## Coupons

Platform Administrators, Vendors and Resellers can generate coupons for products
or product plans.

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
  trials_ coupon, the platform administrator can allocate a budget (or _plafond_)
  which will be decreased by a certain amount every time it will be used by
  a customer.

## Bundles

Cloudesire allows Platform Administrators, and Resellers to create _bundles_ as a
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

![bundle on the control panel](/img/docs/bundles-4.png)

On the Marketplace, a bundle is shown as a normal product, highlighting the
discounts, while in the ordering page the customer can have a detailed view of
all the prices and the savings.

![bundle on the marketplace](/img/docs/bundles-6.jpg)

## Cloud resources pricing

Pricing for the VM associated with Docker applications is automatically managed
by the platform and vendors should not worry about it.

### Prepaid Bandwidth

* vendors can specify a certain amount of prepaid bandwidth for each Docker
  application they sell in the Cloudesire Marketplace
* Cloudesire manages the bandwidth price for each supported cloud provider
* if the vendor doesn't set a specific prepaid bandwidth amount to his Docker
  application, Cloudesire associates a default prepaid bandwidth package (eg.
  10GB)
* during the Docker application lifetime, if the bandwidth usage exceeds the 90%
  of the established limit, Cloudesire sends an e-mail notification to the
  customer, asking for a **bandwidth upgrade order**. If the customer doesn't
  execute the upgrade, Cloudesire prevents access to the application.

### Disk Space

* vendors can specify a certain amount of disk space for each Docker application
  they sell in the Cloudesire Marketplace
* Cloudesire manages the disk space price for each supported cloud provider
* during the Docker application lifetime, if disk space usage exceeds 90% of the
  established limit, Cloudesire sends a notification email to the customer,
  asking for a **disk upgrade order**.

### Backup

* Cloudesire allows the customers to buy **backup plans.**
* every backup plan includes to a maximum number of backups executions
  (configurable in the platform) that can be manually performed by the customers
  or scheduled
* a backup plan must be paid by the customer in advance
* if the customer needs to perform a manual backup when the maximum limit in the
  backup plan is reached, a new **backup order** is created and a related
  invoice is issued. In this case, the backup starts only when the invoice is
  paid.

## Payments

The Cloudesire platform has first-class support for **Stripe** payment gateway.

* Credit Cards are handled by Stripe (card details are sent only to Stripe
  servers and *never* to our backend)
* SEPA debit are supported via Stripe.
* **Paypal** is a fallback payment method when not using Stripe
* Bank transfer or any other manual payment method can be handled directly by
  Platform Administrators

## Self-Billing

In some particular business scenarios it is useful to let some vendors to
issue invoices from themselves, without using the Cloudesire invoicing engine.

The platform allows the admins to mark a specific product plan as *self-billed*,
or to enable/disable globally *self-billing* for all the products.

In this case, when the user purchases a product, only a pro-forma invoice is
generated to help the vendor emit their own invoice, and the vendor is
responsible to set the payment status for every invoice emitted as self-billed.

The platform will record that the vendor should pay the fee back to the platform
owner inside the *revenues* section.

### Self-Billing for resellers

The *self-billing* functionality is also available for the resellers: a reseller
can can mark a _sell-out price_ as *self-billed* for exposing the related
product into his _reseller-marketplace_ overriding the invoice generation on it.
