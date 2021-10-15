---
id: live-reporting
title: Live Reporting
sidebar_label: Live Reporting
---
A specific platform module is in charge of collecting, with a configurable 
granularity (e.g. daily), the costs/revenues relating to all the pre-paid and
pay-per-use services sold through the marketplace. 

This allows a **Live Reporting** functionality, which is essential in contexts 
where the Cloudesire platform is not directly used to bill end customers, 
but rather must provide 3rd-party systems (ERP) with "billing instructions".

## Contextualization

The default functioning of Cloudesire is to _staticize_ incomes related to:
- [Syndicated Products](syndication.md)
- [Docker Applications](socker.md)
- [VM products](vm.md)

on a dedicated data-structure, named **proceeds**, which contains:
- _pre-paid_ incomes, that will be staticized at the **beginning** of each 
  billing period of the related subscription
- _post-paid_ (pay-per-use) incomes, that will be staticized at the
  **end** of each billing period of the related subscription
  
 Depending on the billing frequency (monthly, bimonthly, yearly, etc.) of 
 the running subscriptions, Cloudesire aggregates all the _proceeds' rows_ 
 related to each subscription, and periodically generates the related
 **invoices** to be issued to the end-customers.
 
 If the [Distribution and Channel Management](channel.md) module is active,
 the proceeds' rows will be accordingly _markupped_ along the parent-child chain:
 
 - the Parent will markup the _vendor costs_ (previously specified by the Vendors)
   by configuring the _wholesale prices_ for Distributors 
 - the Distributors will markup the _wolesale prices_ (previously specified 
   by the Parent) by configuring the _sell-in prices_ for Resellers
 - the Resellers will markup the _sell-in prices_ (previously specified 
   by the Distributors) by configuring the _sell-out prices_ for end-customers

as a consequence, the invoices' rows will include the sell-out prices.

