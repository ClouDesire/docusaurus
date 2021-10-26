---
id: api-reference
title: Cloudesire REST API Reference
sidebar_label: API Reference
---

We use [Springfox](https://github.com/springfox/springfox) to autogenerate
[Swagger](https://docs.cloudesire.com/redoc/billing.html) definitions for the Cloudesire API.

API are grouped into different areas:

* [Billing API](/redoc/billing.html)
* [Catalog API](/redoc/catalog.html)
* [Channel API](/redoc/channel.html)
* [Cloud Apps API](/redoc/cloud-apps.html)
* [Cloud providers API](/redoc/cloud-providers.html)
* [Users API](/redoc/users.html)
* [Admin API](/redoc/admin.html)
* [Environment API](/redoc/environment.html)

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
