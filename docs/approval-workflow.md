---
id: approval-workflow
title: Orders Approval Workflow
sidebar_label: Approval Workflow
---
In some specific use-cases, for example for products/services not supporting
self-provisioning (e.g. "server management") an **order approval workflow**
could be required.

Each product/service can be specially configured to enable the *approval
workflow*: in this case, each order (new purchases, change requests) needs to be
approved by a *responsible person* (**Auditor**) before it becomes effective.

The specific functioning slightly changes depending on the presence of the
[Channel-Management](channel.md) (*parent-child*) module:

- in the *Channel Management* scenario:
  - the Customer places orders on a **Reseller Marketplace**
  - the Auditor is the **Reseller**
- in the *normal* scenario:
  - the Customer places orders on a **Parent Marketplace**
  - the Auditor is the **Vendor**

## Functioning Details

Once a new order is placed by the Customer on a (reseller/parent) marketplace:

- the order is marked as "to be approved" (by a *Auditor*)
- the Customer:
  - receives a notification informing that "the order will be shortly reviewed
    by a responsible person"
  - sees on his Dashboard a list of "to be approved" orders
- The *Auditor*:
  - receives a notification informing that "a new order needs to be reviewed and
    eventually accepted/rejected"
  - sees on his Control Panel a list of "to be reviewed" orders

If the *Auditor*:

- **rejects** the order, then:
  - the order is marked as "rejected"
  - the Customer will be notified with a specific email
- **approves** the order, then the order is marked as "pending" and the normal
  *provisioning workflow* will follow, and in case of positive outcome, the
  Customer will be consequently notified.

## Exceptions

In the *Channel Management* scenario, if a Reseller places an order on behalf of
a Customer, by using the specific functionality available on his Control Panel,
it becomes automatically effective (no approval is needed).
