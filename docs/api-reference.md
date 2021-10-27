---
id: api-reference
title: Cloudesire REST API Reference
sidebar_label: API Reference
---

We use [Springfox](https://github.com/springfox/springfox) to autogenerate
[Swagger](https://swagger.io/) definitions for the Cloudesire API.

API are grouped into different areas:

* [Billing API](/redoc/billing.html): Subscription, Invoice, Order and many resources useful when developing a Syndicated application
* [Catalog API](/redoc/catalog.html): Product, ProductVersion, ExtraResource... Useful when mass import of products into the catalog
* [Channel API](/redoc/channel.html): Distributor and Reseller price lists, Useful for mass import of price lists
* [Cloud Apps API](/redoc/cloud-apps.html): for Docker and BareVM products
* [Cloud providers API](/redoc/cloud-providers.html): to manage the available Cloud Providers, Instance Types, and their pricing
* [Users API](/redoc/users.html): users and companies
* [Admin API](/redoc/admin.html): administrative API, mainly for maintenance purposes
* [Environment API](/redoc/environment.html): the configuration of the entire platform

Swagger endpoints are reachable at (concatenate to [API
domain](api.md#domains)):

* /v2/api-docs?group=admin
* /v2/api-docs?group=billing
* /v2/api-docs?group=catalog
* /v2/api-docs?group=channel
* /v2/api-docs?group=cloudApps
* /v2/api-docs?group=cloudProviders
* /v2/api-docs?group=users
* /v2/api-docs?group=environment

You can use those endpoints to generate swagger clients in a variety of
programming language leveraging the
[swagger-codegen](https://github.com/swagger-api/swagger-codegen) project.
