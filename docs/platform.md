---
id: platform
title: Platform modules
sidebar_label: Platform modules
---

The main components of the Cloudesire platform can be summarized as follows:

* **Backend**: it represents the "core" of the platform and consists in a set of
  independent multi-thread modules that uses messaging queues to enable
  asynchronous, distributed and redundant messaging among components, allowing
  enterprise integration patterns. Each module exposes a **REST API** that is
  used consumed by the other modules and by the web interfaces.
* **Control panel**: a responsive web application that allows users to manage
  different entities, according to their role: customers can see their orders
  status and check availability of their instances; vendors can manage their
  application catalog, active customers, orders and running instances of their
  applications; administrator can manage the entire platform and receive updates
  from the monitoring and alerting systems.
* **Marketplace**: a responsive web application where a software vendor can
  publish its own products, along with others vendors products. Customers can
  browse the catalog, compare products, rate and comment them, place orders or
  try an application (if the vendor allows it).

## Backend

Cloudesire Backend modules contains:

* **CMW**: it's the core of Cloudesire, handles most of the business logic
  related to the catalog, customers, subscriptions, invoicing.
* **Deployer**: it is used to create a new cloud instance for each purchased
  application, to instantiate the required virtual resources and to monitor
  step-by-step the deployment status: if something goes wrong, it will retry
  until success. The deployment process is described
  [here](platform.md#application-provisioning-module). Includes a *Cloud
  Abstraction Layer*, a set of connection drivers, used to interact with private
  or public cloud providers APIs. It provides both heterogeneous hypervisors
  support (KVM, Xen, vmware) and public cloud connectors (see the list
  [here](stacks.md#supported-cloud-providers)).
  It is capable of taking and restoring disk snapshot for backup purposes.
* **Monitor**: it consists in a scalable repository of system and application
  metrics that also provides aggregated real-time statistics and graphs.
* **VM-Agent**: a tiny software component that is running inside every VM mnaged
  by the _Deployer_. It push the IaaS metrics (i.e. CPU, Network, RAM, SSD
  usage) to the *Monitor* module.
* **DNS**: provides the remote access of the applications and a custom
  [application endpoint](deployed.md#endpoints) for each deployed instance.
* **Hubspot-connector**: allow the integration of Cloudesire user-base to the
  Hubspot CRM
* **Microsoft-connector**: allow the integration of Cloudesire with Microsoft
  CSP to enable the selling of Microsoft licenses and Azure resources
* **Kong-connector**: allow the integration of Cloudesire with Kong API
  management solution to enable selling of API products into the marketplace
* **Keycloak**: enables SSO capabilities for marketplace users

### Understand the VM deployment process

The deployment process on a specific cloud provider follows this workflow:

* Cloudesire calls a cloud provider chosen by the vendor asking for a **VM
  instantiation** (through the cloud provider APIs), having a specific "size"
  defined by the vendor (i.e. 2 cores, 1GB RAM)
* Cloudesire attaches a **data disk** to the previously created VM, having the
  size defined by the vendor
* Cloudesire installs all the **application stack** (databases, application
  servers, interpreters, libraries, etc.) needed by the vendor's application for
  the correct execution (the application stack is declared by the vendor in the
  [onboarding process](onboarding.md))
* Cloudesire installs the **vendor's application** and initializes the related
  databases into the VM deployed during the steps above mentioned
* Cloudesire creates a specific **DNS entry** in order to make the application
  reachable by the customer (e.g.
  https://application\_name-order\_id.apps.cloudesire.com)
* the end user (customer of the given application) receives a notification (via
  email and in its own control panel interface) with all the instructions needed
  to access its own instance of the application he paid for (URL, default login
  and password)

The deployment process of **legacy applications** (i.e. MS Windows desktop
executables) that doesn't have an automatic and _unattended_ setup follows a
different workflow: in this scenario, a pre-configured windows VM template is
cloned by Cloudesire for each order. On the opposite, if the Windows desktop
application provides an unattended setup, Cloudesire can follow all the
previously described workflow, but the URL provided to the customer refers to a
**remote desktop connection** (i.e. VNC, rdesktop)

### How the snapshot backups works

During the [deployment process](platform.md#application-provisioning-module),
Cloudesire attaches a _data-disk_ to the previously created VM in which
application source code and data (i.e. databases and uploads) are stored.

The backup process follows the following workflow:

* VM shutdown
* data disk snapshot execution (using the cloud provider APIs)
* VM restart

The restore process follows the following workflow:

* VM shutdown
* data-disk detachment and replacement with the previously stored snapshot
  (using the cloud provider APIs)
* VM restart

During these processes, deployed applications are not accessible (the downtime
duration depends on the cloud provider execution time for snapshots/restore
operations).

Before starting a backup, all the application data will be copied to this new
disk, on which the snapshot will be subsequently executed. In this way, the
application will be accessible during the snapshot creation and no shutdown of
the VM will be required.

In the same way, the snapshot restore operation will be executed on this new
disk, and once it is ready the two disks will be switched. In this way, the
application will be accessible during the snapshot restoring and no shutdown of
the VM will be required.
