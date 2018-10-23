---
id: vm
title: Bare Virtual-Machines products onboarding
sidebar_label: VM products
---

This section describes how **Bare Virtual-Machines** marketplace products
works.

A *bare VM* is a Virtual-Machine running on any of the supported cloud
providers, with an operating system selected by the end-user during the order
phase, without any software installed on it.

End-users get **SSH root access** to the VM and they are responsible for the
management and maintenance of it. For the SSH connection,  **public key
authentication** is mandatory and end-users need to provide their own public key
before buying a VM product.

> A new SSH keypair can be automatically generated during the marketplace checkout process.

ISVs cannot create by themselves a new VM product, but an administrator must
create a new product and assign it in order to be manageable by a particular ISV.

### Example

An example Bare VM product is available on the [demo marketplace].

[demo marketplace]: https://demo.cloudesire.com/2102/iaas/bare-vm
