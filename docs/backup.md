---
id: backup
title: VM backups
sidebar_label: Backups
---

Only for Docker applications, during the [deployment
process](platform.md#understand-the-vm-deployment-process), the platform
attaches a **data-disk** to the VM in which application source code and user
data resides.

The backup process follows the following workflow:

* Application and services are stopped
* A new snapshot request is sent (using the cloud provider APIs)
* Application and services are started again upon snapshot completion

The restore process follows the following workflow:

* Application and services are stopped
* A new disk from existing snapshot get created
* Existing disk is detached from the VM and destroyed
* The new disk is attached to the VM
* Application and services are started again upon attach completion

During these processes, Docker applications may not be accessible (the downtime
duration depends on the cloud provider execution time for snapshots/restore
operations).