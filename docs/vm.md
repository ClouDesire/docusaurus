---
id: vm
title: Bare Virtual-Machines products onboarding
sidebar_label: Virtual-Machines
---

This section describes how **Bare Virtual-Machines** marketplace products
works.

A *bare VM* is a Virtual-Machine running on any of the supported cloud
providers, inside a [Public Cloud tenant] or a Private Cloud ([VCloud],
[Openstack]) previously activated by the customer, with an operating system
chosen during the order phase, without any particular software installed on it
(bare VM).

End-users get **administrative access** to the VM (SSH for Linux, RDP for
Windows) and they are responsible for the management and maintenance of it. For
Linux VM,  **public key authentication** is mandatory and customers need to
provide their own public key before ordering a new Bare VM.

A new SSH keypair can be automatically generated during the marketplace
checkout process.

> ISVs cannot create a new VM product by themselves: an administrator must
> create a new product and assign it in order to be manageable by a particular
> ISV.

## Classic Bare VM

Before supporting Public Cloud tenants, the platform supported the provisioning
of Bare VM inside a shared tenant managed by the platform owner.

Now this feature has been deprecated in favor of the more secure and flexible
tenants approach describe before.

### Example

An example Bare VM product is available on the [demo marketplace].

[demo marketplace]: https://demo-mcp.cloudeng.it/223918/compute/private-bare-vm
[Public Cloud tenant]: modules-public-tenants.md
[VCloud]: modules-vcloud.md
[Openstack]: modules-openstack.md
