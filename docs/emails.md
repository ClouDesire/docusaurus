---
id: emails
title: Automatic emails sent by the platform
sidebar_label: Email Automation
---

The Cloudesire platform automatically delivers email notifications under certain
circumstances to the platform actors.

Templates are [here](https://github.com/ClouDesire/backend/tree/master/cloudesire-root/mailsender-client/src/main/resources/templates) (requires developer access).

## Product onboarding

### Approval request

Sent on request for approval of a product.

**Template name:** `approvalRequest`

**Actors:** *configurable*

## Subscription placement, deployment and lifecycle

### Order creation

Once the end-user ordered a product the following email is sent.

**Template name:** `orderCreationCustomer`

**Actors:** *Customer / Vendor / Reseller / Distributor*

### Order approval

If orders are subject to approval, the following email is sent on order request.

**Template name:** `orderRequest`

**Actors:** *Customer*

### Order rejection

If orders are subject to approval, the following email is sent to the customer
on rejection.

**Template name:** `orderReject`

**Actors:** *Customer*

### Order deployment

This email is sent to the customer while the order is processing for
deployment.

**Template name:** `orderDeployment`

**Actors:** *Customer*

### Order undeploy

Sent on undeployment of an expired subscription.

**Template name:** `orderUndeployForCustomer`/`orderUndeployForVendor`

**Actors:** *Customer / Vendor*

To vendor only if order is normal, upgrade or renewal

### Deploy failed

Sent on failure from deployer.

**Template name:** `deploymentFailure`

**Actors:** *Customer / Vendor*

### Deployment complete

After the end-user ordered a product (either trial or paid), an email is sent
as soon as the application is ready to be used.

**Template name:** `deployCompleteForCustomer`/`deployCompleteForVendor`

**Actors:** *Customer / Vendor*

### Subscription amendment

When upgrade orders are subject to approval, the following email is sent to
the vendor (or reseller, if the subscription is resold) as a notification.

**Template name:** `subscriptionAmendment`

**Actors:** *Vendor / Reseller*

### Subscription killed

Sent on subscription kill after payment deadline.

**Template name:** `invoiceKilledToPay`

**Actors:** *Customer*

### Expiring subscription

When there is an active subscription without the auto-renew that is going to
expire, the platform will send an expiration reminder at 14, 10, 7, 4, 3, 2, 1
day(s) before the expiration.

**Template name:** `subscriptionTermAlert`

**Actors:** *Customer*

### Invoice issuing

As soon an invoice is issued, the end-user will receive the following email.

**Template name:** `customerInvoice`

**Actors:** *Customer*

### Invoice to pay

When an invoice is still pending, an alert is sent to the end-user once a day.

**Template name:** `invoiceToPay`

**Actors:** *Customer*

### Invoice payment overdue

When the payment period expires, the subscription is put into a sleeping state:
the end-user cannot use the application but data is still preserved.

The email sent when the subscription is put to sleeping state is the following.

**Template name:** `invoiceSleepingToPay`

**Actors:** *Customer*

### Invoice paid

Sent on invoice payment.

**Template name:** `invoicePaidParentChild`

**Actors:** *Reseller / Distributor*

Reseller does not receive this if invoice is self-billed

## User registration, password recovery and approval

### Registration confirmation

Sent on user registration to verify the account.

**Template name:** `userRegistration`

**Actors:** *User*

### Vendor registration

Sent on vendor registration.

**Template name:** `vendorRegistration`

**Actors:** *Vendor / configurable*

### Vendor approval

When vendor approval is enabled, the following email is sent on successful
approval.

**Template name:** `vendorApproval`

**Actors:** *Vendor / configurable*

### Customer registration

Sent on customer registration.

**Template name:** `customerRegistration`

**Actors:** *configurable*

### Customer update

Sent on customer profile update.

**Template name:** `customerUpdate`

**Actors:** *configurable*

### Password recovery request

Sent on password recovery request.

**Template name:** `userPasswordRecovery`

**Actors:** *User*

### Password recovery succeeded

Sent on password recovery completed successfully.

**Template name:** `userPasswordRecoveryDone`

**Actors:** *User*

### Payment method save

Sent on customer payment method save.

**Template name:** `customerPaymentMethodSave`

**Actors:** *configurable*

### Delayed payment request

Sent on request for approval of delayed payment for a customer.

**Template name:** `customerPendingOrder`

**Actors:** *configurable*
