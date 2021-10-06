---
id: emails
title: Automatic emails sent by the platform
sidebar_label: Email Automation
---

The Cloudesire platform automatically delivers email notifications under certain
circumstances to the platform actors.

Templates are [here](https://github.com/ClouDesire/backend/tree/master/cloudesire-root/mailsender-client/src/main/resources/templates) (requires developer access).

# Product onboarding

## Approval request

Sent on request for approval of a product.

**Template name:** `approvalRequest`

**Actors:** *configurable*

# Subscription placement, deployment and lifecycle

## Order creation

Once the end-user ordered a product the following email is sent.

**Template name:** `orderCreationCustomer`

**Actors:** *Customer / Vendor / Reseller / Distributor*

## Order deployment

This email is sent to the customer while the order is processing for
deployment.

**Template name:** `orderDeployment`

## Order undeploy

Sent on undeployment of an expired subscription.

**Template name:** `orderUndeployForCustomer`/`orderUndeployForVendor`

**Actors:** *Customer / Vendor*

To vendor only if order is normal, upgrade or renewal

## Deploy failed

Sent on failure from deployer.

**Template name:** `deploymentFailure`

**Actors:** *Customer / Vendor*

## Deployment complete

After the end-user ordered a product (either trial or paid), an email is sent
as soon as the application is ready to be used.

**Template name:** `deployCompleteForCustomer`/`deployCompleteForVendor`

**Actors:** *Customer / Vendor*

## Subscription killed

Sent on subscription kill after payment deadline.

**Template name:** `invoiceKilledToPay`

**Actors:** *Customer*

## Expiring subscription

When there is an active subscription without the auto-renew that is going to
expire, the platform will send an expiration reminder at 14, 10, 7, 4, 3, 2, 1
day(s) before the expiration.

**Template name:** `subscriptionTermAlert`

## Invoice issuing

As soon an invoice is issued, the end-user will receive the following email.

**Template name:** `customerInvoice`

## Invoice to pay

When an invoice is still pending, an alert is sent to the end-user once a day.

**Template name:** `invoiceToPay`

## Invoice payment overdue

When the payment period expires, the subscription is put into a sleeping state:
the end-user cannot use the application but data is still preserved.

The email sent when the subscription is put to sleeping state is the following.

**Template name:** `invoiceSleepingToPay`

## Invoice paid

Sent on invoice payment.

**Template name:** `invoicePaidParentChild`

**Actors:** *Reseller / Distributor*

Reseller does not receive this if invoice is self-billed

# User registration and password recovery

## Registration confirmation

Sent on user registration to verify the account.

**Template name:** `userRegistration`

## Password recovery request

Sent on password recovery request.

**Template name:** `userPasswordRecovery`

## Password recovery succeeded

Sent on password recovery completed successfully.

**Template name:** `userPasswordRecoveryDone`
