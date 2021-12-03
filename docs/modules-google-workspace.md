---
id: modules-google-workspace
title: Selling and provisioning of Google Workspace licenses
sidebar_label: Google Workspace
---

Cloudesire platform enables the selling of [Google Workspace] licenses for
platform owners that are Google Partners.

Product plans are prepaid and are mapped to the actual standard Workspace
products available from Google, each one with a different configurable billing
plan.

## Product configuration

ISVs can onboard a new Google Workspace as a new Product using
[Syndicated](syndication.md) as a product type and providing as a syndication
endpoint, the endpoint to the `gsuite-connector` module installed on the platform
(ask to the platform administrators).

For each configured plan, ISVs should provide:

* Extra resources:
  * *Number of licences (seats)* with identifier `gsuitenumberofseats`, prepaid.

* Configuration parameters:
  * *User email* with code `gsuite_customer_email_code`: the administrator
    account that will be activated. The domain must be owned by the customer.
    Must be configured via regex validation equal to `^(.+)@(\S+)$`

* Integration Metadata:
  * [gsuite_sku_id]: the numerical id of the product to provision
  * [gsuite_plan_name]: the reseller billing terms with Google
  * [gsuite_renewal_type]: to specify what happens to the subscription at the
    subscription expiring

## Customer experience

After selecting a plan, the customer is prompted to enter:

* the number of user licenses (seats)
* the admin account email (name@company.com)

After the provisioning, the customer can access the Google Workspace dashboard
to finish configuring email delivery for their own domain and to create user
accounts.

## Example

An example Google Workspace product can be found on our [demo marketplace].

[Google Workspace]: https://workspace.google.com/
[gsuite_sku_id]: https://developers.google.com/admin-sdk/reseller/v1/how-tos/products#google-workspace
[gsuite_plan_name]: https://developers.google.com/admin-sdk/reseller/v1/how-tos/concepts#plans
[gsuite_renewal_type]: https://developers.google.com/admin-sdk/reseller/v1/how-tos/manage_subscriptions#update_a_subscriptions_renewal_settings
[demo marketplace]: https://demo-mcp.cloudeng.it/192422/workplace/google-workspace
