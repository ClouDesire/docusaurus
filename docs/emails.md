---
id: emails
title: Automatic emails sent by the platform
sidebar_label: Email Automation
---

The Cloudesire platform automatically deliver email notifications under certain
circumstances to the end-user.

## Deployment complete

After the end-user ordered a product (either trial or paid), an email is sent
as soon as the application is ready to be used:

```twig
  Hi {{ fullName }},

  your order #{{ orderId }} for {{ product }} has been successfully completed.

{% if (instructionsInEmail) %}

    Please follow these instruction to access {{ product }}:
  {{ vendorNotes }}

  {% if (empty(endpoints)) %}
    You can check your subscription status <a href="{{ subscriptionUrl }}">here</a>
  {% else %}
    To access the application, click on the following link:
    {{ endpoints }}
  {% endif %}

  {% if (endUserInstructions) %}
    {{ endUserInstructions }}
  {% endif %}

{% else %}
  You can now access your application from our <a href="{{ dashboardUrl }}">dashboard</a>.
{% endif %}

  If you have any question on the application you can contact {{ vendor }} at
  <a href="mailto:{{ vendorMail }}">this e-mail address</a>.<br/>

  You can contact our Success Team for issues with the service
  (e.g. subscriptions, payments and issues with the platform {{ storeName }}):
  contact us at <a href="mailto:{{ supportMail }}">{{ supportMail }}</a> and we
  will answer as soon as possibile.
```

## Expiring subscription

When there is an active subscription without the auto-renew that is going to
expire, the platform will send an expiration reminder at 14, 10, 7, 4, 3, 2, 1
day(s) before the expiration.

The content of the email will be:

```twig
  Hi {{ fullName }},

{% if (isTrial) %}
  this is a reminder for your trial subscription for {{ product }} that will
  expire in {{ daysLeft }} day(s).

  Please make sure you upgrade to a paid plan before the expiration date in
  order to continue using the application.
{% else %}
  this is a reminder for your subscription for {{ product }} that will expire
  in {{ daysLeft }} day(s).

  Please make sure you renew your subscription before the expiration date in
  order to continue using the application.
{% endif %}

  You can review your subscription here:
  <a href="{{ subscriptionUrl }}">#{{ subscriptionId }}</a>
  and pay with your credit card.

  You can set subscriptions to auto-renew to make sure you don't experience
  any interruption in service.
  Also, you will no longer receive these e-mails.
```

## Invoice emission

As soon an invoice is emitted, the end-user will receive the following email:

```twig
  Hi {{ fullName }},

  Your invoice for {{ product }} has just been issued.

{% if (invoicePaid) %}
  It has already been automatically paid and you can
  <a href="{{ invoiceUrl }}">review it here</a>.
{% else %}
  You can <a href="{{ invoiceUrl }}">review it here</a> and pay with your
  credit card.
{% endif %}
```

## Invoice to pay

When an invoice is still pending, an alert is sent to the end-user once a day:

```twig
  Hi {{ fullName }},

  this is a gently reminder for your pro forma invoice
  <a href="{{ invoiceUrl }}">#{{ invoiceId }}</a> for {{ product }}
  basing on our files this invoice is still to be paid.

  You have {{ daysLeft }} days left to pay the invoice.
  After that time, your subscription will be suspended and you will no longer
  be able to use {{ product }}.

{% if (cardIsSaved) %}
  We attempted to charge your credit card, but it was declined so we couldn't
  renew your subscription to {{ product }}. If you have insufficient funds on
  your card, please recharge it. Otherwise, please contact your Credit Card
  Company or bank. If you want to change the card that is associated with your
  account, please reply to this email to contact the support.

  We will automatically attempt to charge your card again within 24 hours.
{% else %}
  You can pay with your credit card <a href="{{ invoiceUrl }}">here</a>.
{% endif %}
```

## Invoice payment overdue

When the payment period expire, the subscription is put into a sleeping state:
the end-user cannot use the application but data is still preserved.

The email sent when the subscription is put to sleep is:

```twig
  Hi {{ fullName }},

  your subscription for {{ product }} is currently suspended,
  waiting for your payment of invoice
  <a href="{{ invoiceUrl }}">#{{ invoiceId }}</a>.

  You have {{ daysLeft }} days left before your subscription will be cancelled
  and your application and business data definitely erased.

  Please make sure you pay the invoice to continue using the application.

  You can review your subscription here:
  <a href="{{ subscriptionUrl }}">{{ subscriptionId }}</a> and pay with your
  credit card.
```