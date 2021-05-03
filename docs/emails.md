---
id: emails
title: Automatic emails sent by the platform
sidebar_label: Email Automation
---

The Cloudesire platform automatically delivers email notifications under certain
circumstances to the end-user.

## Deployment complete

After the end-user ordered a product (either trial or paid), an email is sent
as soon as the application is ready to be used.

**Template name:** *deployCompleteForCustomer*

**English version:**

```twig
  Hi {{ fullName }},

  your order #{{ orderId }} for {{ product }} has been successfully completed.

  {% if (instructionsInEmail) %}
    Please follow these instruction to access {{ product }}:
    {{ vendorNotes }}
    You can check your subscription status <a href="{{ subscriptionUrl }}">here</a>

    {% if (endUserInstructions) %}
      {{ endUserInstructions }}
    {% endif %}

  {% else %}
  You can now access your product from our dashboard.

  <a href="{{ dashboardUrl }}">Go to dashboard</a>

  {% endif %}

  If you have any question on the product you can contact {{ vendor }} at <a href="mailto:{{ vendorMail }}">this e-mail address</a>.

  You can contact our {{ teamName }} for issues with the service (e.g. subscriptions, payments and issues with the platform {{ storeName }}):
  contact us at <a href="mailto:{{ supportMail }}">{{ supportMail }}</a> and we will answer as soon as possible.

```
**Italian version:**

```twig
  Ciao {{ fullName }},

  il tuo ordine #{{ orderId }} per {{ product }} è stato completato con successo.

  {% if (instructionsInEmail) %}

    Queste sono le istruzioni per accedere a {{ product }}:
    {{ vendorNotes }}

    Puoi controllare lo stato del tuo abbonamento <a href="{{ subscriptionUrl }}">qui</a>

    {% if (endUserInstructions) %}
      {{ endUserInstructions }}
    {% endif %}

  {% else %}
    D’ora in poi potrai utilizzare il tuo prodotto accedendo al nostro pannello di controllo.

    <a href="{{ dashboardUrl }}">Vai al pannello di controllo</a>

  {% endif %}

  Per domande relative al prodotto potrai contattare {{ vendor }} a <a href="mailto:{{ vendorMail }}">questo indirizzo e-mail</a>.

  Il {{ teamName }} sarà invece a tua disposizione per questioni relative all’erogazione del servizio
  (ad es. abbonamento, pagamenti e problemi con la piattaforma {{ storeName }}):
  contattaci a <a href="mailto:{{ supportMail }}">{{ supportMail }}</a> e ti risponderemo il più velocemente possibile.

```

## Expiring subscription

When there is an active subscription without the auto-renew that is going to
expire, the platform will send an expiration reminder at 14, 10, 7, 4, 3, 2, 1
day(s) before the expiration.

**Template name:** *subscriptionTermAlert*

**English version:**

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

**Italian version:**

```twig
  Ciao {{ fullName }},

  {% if (isTrial) %}
    ti ricordiamo che la tua prova gratuita per {{ product }} scadrà tra
    {{ daysLeft }} giorni(o).

    Per continuare ad usare il prodotto, passa ad un piano a pagamento prima della data di scadenza.

  {% else %}
    ti ricordiamo che il tuo abbonamento per {{ product }} scadrà tra
    {{ daysLeft }} giorni(o).

    Per continuare ad usare il prodotto, rinnova il tuo abbonamento prima della data di scadenza.
  {% endif %}

  {% if (terminationMessage) %}
    {{ terminationMessage }}
  {% endif %}

  Puoi vedere il tuo abbonamento qui: <a href="{{ subscriptionUrl }}">#{{ subscriptionId }}</a>
  e procedere al pagamento tramite carta di credito.

  Ti ricordiamo che per non subire interruzioni nel servizio e non ricevere più queste e-mail,
  puoi impostare il rinnovo automatico dei tuoi abbonamenti.
```


## Invoice issuing

As soon an invoice is issued, the end-user will receive the following email.

**Template name:** *customerInvoice*

**English version:**

```twig
  Hi {{ fullName }},

  {% if (generatesInvoice) %}
    Your invoice for {{ product }} has just been issued.
  {% elseif (invoiceDelayed) %}
    the consumption summary for {{ product }} has been processed and is available through your dashboard.
    You will shortly receive the relevant invoice from our administrative department.
  {% else%}
    Your consumption summary for {{ product }} is ready.
  {% endif %}

  {% if (invoicePaid) %}
    It has already been automatically paid and you can <a href="{{ invoiceUrl }}">review it here</a>
  {% elseif (invoiceDelayed) %}
    Please proceed with the payment according to the agreed contractual terms.
  {% else %}
    Please review it and proceed with the payment.
    <a href="{{ invoiceUrl }}">Pay now</a>
  {% endif %}
```

**Italian version:**

```twig
  Ciao {{ fullName }},

  {% if (generatesInvoice) %}
     La tua fattura per {{ product }} è stata appena emessa.
  {% elseif (invoiceDelayed) %}
     la consuntivazione spese per {{ product }} è stata elaborata ed è consultabile attraverso la tua dashboard.
     A breve riceverai la relativa fattura dal nostro reparto amministrativo.
  {% else %}
      Il riepilogo consumi per {{ product }} è pronto.
  {% endif %}

  {% if (generatesInvoice) %}
    {% if (invoicePaid) %}
      È già stata automaticamente pagata e puoi visionarla <a href="{{ invoiceUrl }}">qui</a>
    {% else %}
      Puoi visionarla e procedere al pagamento con uno dei metodi di pagamento abilitati.
      <a href="{{ invoiceUrl }}">Paga ora</a>
    {% endif %}

  {% else %}
    {% if (invoicePaid) -%}
      Il pagamento è già stato effettuato.
      Puoi visionarlo <a href="{{ invoiceUrl }}">qui</a>.
    {% elseif (invoiceDelayed) -%}
      Ti ricordiamo di procedere al pagamento entro i termini contrattuali concordati.
    {% else %}
      Puoi visionarlo e procedere al pagamento con uno dei metodi di pagamento abilitati.
      <a href="{{ invoiceUrl }}">Paga ora</a>
    {% endif %}
{% endif %}
```

## Invoice to pay

When an invoice is still pending, an alert is sent to the end-user once a day.

**Template name:** *invoiceToPay*

**English version:**

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

**Italian version:**

```twig
  Ciao {{ fullName }},

  secondo i dati a nostra disposizione, il pagamento di <a href="{{ invoiceUrl }}">#{{ invoiceId }}</a>
  per {{ product }} risulta non saldato.

  Hai ancora {{ daysLeft }} giorni(o) per procedere al pagamento.
  Trascorsi questi giorni, il tuo abbonamento sarà sospeso e non potrai più utilizzare {{ product }}.

  {% if (cardIsSaved) %}
    Abbiamo provato ad addebitare automaticamente l'importo dovuto per l’abbonamento a {{ product }}, ma la carta è stata
    rifiutata. Se il credito della tua carta ricaricabile è insufficiente, effettua una ricarica. Altrimenti, contatta il
    tuo istituto bancario per capire perché la carta è stata rifiutata. Se desideri modificare la carta associata al tuo
    account, scrivici rispondendo a questa email.

    Effettueremo un nuovo tentativo di addebito tra 24 ore.
  {% else %}
    <a href="{{ invoiceUrl }}">Paga ora</a>
  {% endif %}
```

## Invoice payment overdue

When the payment period expires, the subscription is put into a sleeping state:
the end-user cannot use the application but data is still preserved.

The email sent when the subscription is put to sleeping state is the following.

**Template name:** *invoiceSleepingToPay*

**English version:**

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

**Italian version:**

```twig
  Ciao {{ fullName }},

  il tuo abbonamento per {{ product }} è attualmente sospeso, in attesa del pagamento di
  <a href="{{ invoiceUrl }}">#{{ invoiceId }}</a>.

  Hai ancora {{ daysLeft }} giorni(o) prima che il tuo abbonamento venga disattivato e i dati inseriti vengano cancellati definitivamente.
  Ti ricordiamo che per continuare a usare il prodotto è necessario procedere con il pagamento.

  Puoi vedere il tuo abbonamento qui: <a href="{{ subscriptionUrl }}">{{ subscriptionId }}</a>
  e procedere al pagamento tramite carta di credito.
```
