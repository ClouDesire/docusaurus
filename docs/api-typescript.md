---
id: api-typescript
title: TypeScript Client for Cloudesire API
sidebar_label: TypeScript Client
---

You can find the TypeScript clients on our [NPM Repository](https://nexus.cloudesire.com/#browse/browse:cloudesire-npm-public).

> Requires [axios HTTP client](https://github.com/axios/axios)

## Installation

Install the required packages, for example:

```sh
npm install @cloudesire/backend-users-api @cloudesire/backend-billing-api
```

## Usage

```typescript
import axios, { AxiosResponse } from 'axios';
import { Configuration, LoginApi } from '@cloudesire/backend-users-api';
import { SubscriptionApi, SubscriptionDTO } from '@cloudesire/backend-billing-api';

const url = '<cloudesire_api_url>';
const username = '<customer_username>';
const password = '<customer_password>';

// 1. Login to get the auth token
const loginResponse: AxiosResponse<string> = await new LoginApi(
  new Configuration({ username, password }),
  url,
).login({ expire: true });

const authToken = loginResponse.data;

const axiosInstance = axios.create({
  headers: {
    'CMW-Auth-Token': authToken,
  },
});

// 2. Fetch customer's subscriptions
const response: AxiosResponse<SubscriptionDTO[]> = await (new SubscriptionApi(
  new Configuration(),
  url,
  axiosInstance,
)).subscriptionGetAllPaged({ pageSize: 50 });
```
