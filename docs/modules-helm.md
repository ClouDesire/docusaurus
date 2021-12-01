---
id: modules-helm
title: Selling and provisioning of Helm applications on Kubernetes clusters
sidebar_label: Helm apps integration
---

> This feature is ALPHA and is subject to changes

Cloudesire platform enables the selling of applications packaged as
[Helm charts](https://helm.sh/) on top of [Kubernetes clusters](modules-public-tenants.md),
managed by the platform or not, leveraging the customer [Cloud Credentials](customer-cloud-credentials.md)
and the Cloud Service capabilities of the platform.

ISVs can onboard a new Helm chart as a new Product using Cloud Service as a
product type and providing as a syndication endpoint, the endpoint to the
`helm-connector` module installed on the platform (ask to the platform
administrators).

The product must be also configured to requires `Cloud Credentials` and
`Kubernetes` as a provider.

The information of which chart needs to be installed on the cluster, should be
set as an `Integration Metadata` on the Product Plans (one or more).

The mandatory integration metadata are:

* `helm-chart`: the name of the chart, e.g. `bitnami/kubeapps`
* `helm-load-balancer-setup`: if set to any value, a load balancer is
  automatically enabled after the chart is successfully installed

Any values that needs to be passed to the chart, can be provided with a `helm-`
prefix and a json payload, e.g.:

Key:

```
helm-apprepository
```

Value:

```json
{"initialRepos": {"name": "custom-repo", "url": "https://chartmuseum.mycompany.com/"}}
```