---
id: vendor-approval-workflow
title: Vendor accounts and Products Approval Workflow
sidebar_label: Vendors approval workflow
---

In some specific use-cases, for example when a platform owner would like to open
the product onboarding to a large audience, it could be useful to have new
accounts and new products reviewed by an administrator before reaching the
public marketplace catalog.

A specific platform configuration can activate an approval workflow for new
vendors account and products.

## Account approval workflow

For every new vendor account creation on the marketplace, the Admin receives an
email with a summary of all the account details that the vendor provided.

Until an Admin approves the account, the vendor cannot login to the control
panel.

Once an Admin approved the account, the vendor will receive an email notification
and can login to the control panel to start onboarding new products.

## Product approval workflow

When this feature is enabled, if the the **Vendor** makes changes on the
editorial descriptions of a product / plan, the platform creates a **draft**
that needs to be approved by the **Admin** in order to become effective (really
published on a marketplace).

The Vendor can request the Admin to review (and possibly approve) his draft by
clicking on a "Request review" button. Once done, the Admin will receive an
**email notification**.

The platform provides the Admin with a view listing all the "pending drafts". By
clicking on one of them, a *comparison view* is provided, to empathize the
differences between the previous contents and their latest versions.

While a draft is under approval by the Admin, the Vendor can still *update* his
draft, the new modifications will substitute the previous ones on the "current
draft".

When the Admin approves a draft:

- the vendor receives an **email notification** ("your draft is now approved")
- if the draft refers to an unpublished plan, the platform automatically publish
  it
- if the draft refers to _main product descriptions_ (not directly related to
  plans), the changes are published on the marketplaces only if the product was
  already visible
