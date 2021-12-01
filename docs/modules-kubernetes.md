---
id: modules-kubernetes
title: Selling and provisioning of managed Kubernetes clusters on Public Cloud providers
sidebar_label: Kubernetes as a service
---

Cloudesire enables the selling of Kubernetes clusters on top of [Public Cloud
tenants](modules-public-tenants.md), leveraging the [Cloud
Credentials](customer-cloud-credentials.md) feature.

The customer that has activated one or more Public Cloud tenants, can request
the activation of managed Kubernetes clusters, leveraging the existing services:

* [EKS](https://aws.amazon.com/eks/) for AWS
* [AKS](https://azure.microsoft.com/en-us/services/kubernetes-service/) for Azure
* [GKE](https://cloud.google.com/kubernetes-engine) for Google Cloud

For activating the cluster, the customer can choose:

* The region where the cluster will run
* The node instance type
* Initial number of worker nodes
* Minimum number of worker nodes
* Maximum number of worker nodes

After the successful activation of the cluster, the customer receive a
[kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)
file that can be directly used with `kubectl`.

All the necessary fine tuning of the cluster can happen on the native Cloud
Provider interfaces or API after the initial creation.

## Example

Check [Private K8s
Cluster](https://demo-mcp.cloudeng.it/228128/compute/private-k8s-cluster) on the
demo marketplace.
