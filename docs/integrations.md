---
id: integrations
title: Platform integrations
sidebar_label: Integrations
---

The Cloudesire platform integrates with various third-party services for a
variety of use cases.

## TaxJar

[TaxJar](https://www.taxjar.com/) allows to automate sales tax calculations,
reporting, and filings.

### Why

Applying sales taxes all around the world is a gruelling task, due to the
various legislations which may differ from state to state even within the same
country. TaxJar may relieve us from this, by calculating the correct taxes for
an order in US, Canada and EU.

### How

Switch the platform configuration `vatService` to `TAXJAR` and provide a valid
token as an environment variable `SECRET_TAXJAR_API_TOKEN`.
