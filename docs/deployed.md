---
id: deployed
title: Deployed applications onboarding
sidebar_label: Deployed applications
---

In this section you will understand how to onboard deployed applications. Please
make sure you read this section before you onboard your deployed application.
Please note that onboarding of deployed and syndicated applications is not the
same.

The onboarding process starts after creating a new "Product" in the Marketplace
Catalog, as described [here](onboarding.md#applications-catalogue).

Cloudesire supports [custom ZIP files](deployed.md#zip-packaging) to provide
applications as a package, but we strongly recommend
[Docker](deployed.md#docker-packaging) to onboard a new deployed  application.

Cloudesire will provision on the cloud a new VM containing a running instance of
the app for each customer.

## Technical Onboarding

Software vendors can specify for each product:

* one or more "**Packages**" (namely Docker Images or ZIP Packages, containing
  the application source code)
* one or more "**Modules**" (namely a composition of **one or more Packages**,
  which will be installed in a VM on the cloud)

For example, an application can be described specifying a _Module_ (with
specific **cloud resources requirements**) which is a _composition_ of a
_back-end Package_ (e.g. a Java module exposing REST API plus a PostgreSQL
database) and a _front-end Package_ (e.g. a simple and "light" NodeJs
application).

### Sandbox orders

Sandbox orders are fake orders in which vendors can test the deployment workflow
of their applications. Even if they are not real orders, they simulate a real
purchase scenario, so that vendors can identify integration issues in their
workflow before applications are available to the public.

#### How to launch a sandbox order

To launch a **sandbox**, you need to have at least one product in your catalog:
this means that you have already uploaded at least one product and a plan on the
marketplace.

Click "Catalog" from the menu at the top left of the screen to see your
applications. Once you know which application you want to test, go to "_Plans_"
and select "SANDBOX".

In the following picture you can see an example of the page from which you can
launch a sandbox order.

![Vendors Control Panel: Syndication -
Sandbox](/img/docs/control_panel_syndicated_sandbox.png)

### Packages

To access the list of the available Packages, click on the "_Catalog_" \>
"_Packages_" menu item on the left.

![Vendors Control Panel: Packages](/img/docs/control_panel_packages.png "Vendors
Control Panel: Packages")

To create a new Package using the [ZIP Packaging](deployed.md#zip-packaging)
methodology click on the "_New_" button.

![Vendors Control Panel: ZIP](/img/docs/control_panel_packages_ZIP.png "Vendors
Control Panel: ZIP")

For each Package, vendors must provide the following information:

* **Name**: e.g. _back-end_
* **Stacks**: PHP, Java, Ruby, etc. (also **Docker**…)
* **Database** (optional): MySQL, PostgreSQL, MongoDB.
* **ZIP package**: a ZIP package following the specifications provided in [this
  section](deployed.md#zip-packaging).
* **Version**: whenever the vendor provides a new Package, Cloudesire assigns to
  it a new _version number_ and stores the previous one. The older Application
  Packages versions can be used by the vendor in order to execute automatic
  **downgrades** of running applications.

When a Package is created, it can be linked to a specific _Product Plan_, simply
selecting it from the list and clicking on the "_Attach Package to Module_"
button. In this way a new **Module** will be created (if not existent) or the
Package will be added to an already existent Module.

![Vendors Control Panel: Packages-Modules
Links](/img/docs/control_panel_packages_modules_links.png "Vendors Control
Panel: Packages-Modules Links")

To simultaneously create one or more Package, corresponding to a **composition
of Docker images**, click on the "_New Docker Compose_" button. More details on
the Docker Packaging are available in [this
section](deployed.md#docker-packaging).

![Vendors Control Panel: Packages -
Docker](/img/docs/control_panel_packages_Docker.png "Vendors Control Panel:
Packages - Docker")

In this case, a _Docker Compose_ string must be provided, and the vendor can
also directly link the Packages to a specific Product Plan (crating in this way
a new Module, or adding all the Packages to an already existent Module).

### Modules

The list of all available modules is provided in the "_Catalog_" \> "_Modules_"
section.

![Vendors Control Panel: Modules](/img/docs/control_panel_modules.png "Vendors
Control Panel: Modules")

By selecting a specific Module and clicking on the "_Edit_" button on the
top-right of the page, software vendors can specify some parameters.

![Vendors Control Panel: Modules - VM
Sizing](/img/docs/control_panel_modules_VM.png "Vendors Control Panel: Modules -
VM Sizing")

* CPU Core(s) and RAM (in MB): a slider allows the vendor to choose the
  preferred configuration (e.g. 1 core + 1Gb, 2 cores + 4Gb, etc.)
* Disk Space (in GB): a slider allows the vendor to select the quantity of space
  available for user data

### Advanced Setting for Modules

By clicking on a specific Package name attached to a certain Module, three
buttons are shown on the top-right of the interface:

* "_Promote to Stable_": to be used to declare the current Package as "stable"
  in the Module
* "_Show Advanced_": to open the Advanced Settings pop-up (see below)
* "_Unlink_": to unlink the Package from the Module

![Vendors Control Panel: Modules - advanced
setttings](/img/docs/control_panel_modules_advanced.png "Vendors Control Panel:
Modules - advanced setttings")

The Advanced Settings pop-up provides the following sections:

* **Endpoints Patterns**: one or more (custom) access URLs to the module of the
  product (e.g. _/backend_, or _/stats_, etc.); more info at [this
  section](deployed.md#endpoints)
* **Application Metrics**: specific application _aspects_ that the vendor
  intends to monitor or bill to the customer leveraging the **pay-per-use**
  paradigm; more info in [this section](onboarding.md#application-metrics)
* **Environment Variables**:  environment variables to be injected in the
  deployed VM and accessed at runtime by the application. More info in [this
  section](deployed.md#environment-variables).
* **Stack Parameters**: some language-specific parameters to provide to the
  [Deployer Module](platform.md#application-provisioning-module) (e.g. fine
  tuning of interpreters or application server). More info in [this
  section](deployed.md#stack-parameters).

## Data Persistence

Cloudesire allows vendors and customers to perform **upgrades** and
**downgades** tasks on running applications instances.

To avoid data loss, Cloudesire needs to know where the application data are
before performing these tasks.

For this reason, vendors need to specify the file-system path containing the
application data (e.g. _files/upload_) using the **common_directories** [Stack
Parameter](deployed.md#stack-parameters)

## Endpoints

For each installed application, Cloudesire provides a default Endpoint to allow
end-users ( customers) to access the application. Furthermore, vendors can
specify one or more **custom** access URLs that will be linked to each specific
[Module](deployed.md#modules) of a given Product (e.g. _/backend_, or _/stats_,
etc.).

To add a new Endpoint, you need to access to the "_Modules_" section (more
details [here](deployed.md#modules)), select a specific _Module_ and _Package_
(more details [here](deployed.md#packages)) and then click on the "_Show
Advanced_" button on the top-right of the page. Furthermore, by accessing to the
"_Endpoint Patterns_" tab it's possible to fill all the required fields (a
Description, a Category and a Value) and click on the "_Add_" button to finish.

![Vendors Control Panel - Endpoints](/img/docs/control_panel_endpoints.png
"Vendors Control Panel - Endpoints")

## Environment Variables

**Vendors can inject Environment Variables** for each application, so feel free
to use them to define variables that could be accessed at runtime from your
applications.

You can even choose to permit the _end-user_ to the **edit** some of those
variables.

To add a new Environment Variable, vendors need to access to the "_Modules_"
section (more details [here](deployed.md#modules)), select a specific _Module_
and _Package_ (more details [here](deployed.md#packages)) and then click on the
"_Show Advanced_" button on the top-right of the page. By accessing to the
"_Environment Variables_" tab vendors can fill all the required fields (the
_Name_ and the _Value_) and click on the "_Add_" button to finish.

![Vendors Control Panel - Environment
Variables](/img/docs/control_panel_environment_variables.png "Vendors Control
Panel - Environment Variables")

There are predefined environment variables set at runtime by the platform and
that you could use:

### Database access environment variables

* `CLOUDESIRE_DB_USER` username to connect to the database;
* `CLOUDESIRE_DB_PASS` password to connect to the database;
* `CLOUDESIRE_DB_NAME` name of the available database;
* `CLOUDESIRE_DB_HOST` hostname of the database;
* `CLOUDESIRE_VHOST` the hostname automatically generated for a running
  application instance (e.g.: _example-123.apps.cloudesire.com_)

### Customer information environment variables

* `CD_USER_BILLING_COMPANY_NAME` billing company name of the customer;
* `CD_USER_BILLING_TAX_CODE` billing tax code of the customer;
* `CD_USER_EMAIL` email address of the customer;
* `CD_USER_ENVIRONMENT` marketplace identification string of the customer;
* `CD_USER_NAME` name of the customer;
* `CD_USER_LANGUAGE` language of the customer;
* `CD_USER_PHONE_NUMBER` phone number of the customer;
* `CD_USER_SURNAME` surname of the customer;
* `CD_USER_USER_NAME` username of the customer;

### VirtualHost placeholder in environment variables

It is possible to declare a variable with a placeholder vavlue that will be
replaced with the VirtualHost at runtime.

* `%VIRTUAL_HOST%` will be replaced with the virtual host (e.g.:
  _example-123.apps.cloudesire.com_)

It is also accepted: `http://%VIRTUAL_HOST%/` that will be replaced in
_http://example-123.apps.cloudesire.com/_

For stacks-specific environment variables, look in their specific sections:

* [onboarding of ZIP packaged applications](deployed.md#zip-packaging)
* [onboarding of Docker applications](deployed.md#docker-packaging)

## Filesystem Browsing

Cloudesire allows  vendors to enable a file-system browsing module for each
deployed applications instances.

In this way, customers (and vendors) can **browse** the file-system of the VM
containing a running application, **upload** new files on it, and perform
**live-editing** for textual files (e.g. in order to modify some configuration
files).

To enable this feature, it is necessary to specify the **common_directories**
[Stack Parameter](deployed.md#stack-parameters) with a valid file-system path
(e.g. _files/upload_)

## SSH Access

Basic SSH access is _enabled by default_ for all vendors, with the unique
prerequisite that at least one _SSH public key_ is provided within the vendor
profile, before launching a new instance.

Access is available via a default user named **app**, that is an _unprivileged
user_ that can only:

* access applications data under `/srv`
* restart application servers using `sudo service` command
* inspect application logs in `/var/log`

For Docker applications, access to D_ocker API is restricted_ for security
reasons, but access can be granted if asked for vendors in good standing that
have been in activity for at least 6 months.

## ZIP Packaging

Before you start onboarding  an application to the marketplace, please take a
look to our [integration facilities.](onboarding.md#integration-facilities) We
provide a **staging marketplace** where you can register your company, log-in
and on-board your application via ZIP package without any worry (also simulating
the purchase of your product using demo credit cards). We strongly recommend to
upload and test applications on the staging marketplace before publishing them
on the public marketplace.

In order to deploy automatically an Application, a ZIP
[package](deployed.md#packages) is required, containing:

* the web application's source code or the packaged artifacts;
* the database data that the application needs to be fully functional (end-users
  should not do any installation wizard requiring technical skills).

The ZIP package structure must meet the following general criteria:

* a _sql_ folder if using MySQL, Postgres or ASPNET;
* a _mongodb_ folder if using MongoDB;
* a folder with the web application's code, depending on the language and/or
  stack used (follow the links below for your application stack).

Before going forward in this documentation, please take a look to the [data
persistence](deployed.md#data-persistence) section in order to **avoid data
loss** in your application.

### Application Stacks-specific requirements

We support several application stack, but each application stack has specific
aspects that should be kept in consideration.

* [How-to package .NET applications](stacks.md#net)
* [How-to package CGI applications](stacks.md#cgi)
* [How-to package Django applications](stacks.md#django)
* [How-to package Java applications](stacks.md#java)
* [How-to package NodeJS applications](stacks.md#nodejs)
* [How-to package PHP applications](stacks.md#php)
* [How-to package Ruby applications](stacks.md#ruby)

### Database-specific requirements

An application could automatically initialize the database schema at the first
run, otherwise it's possible to insert a database dump into the zip. We adopted
the [flyway](http://flywaydb.org/) database migration tool, that supports schema
versioning by simply creating multiple .sql file starting with the version
number. For example:

```bash
V1__initial_schema.sql
V2__added_field.sql
V3__added_index.sql
```

For more information, refer directly to the [flyway
documentation](https://flywaydb.org/documentation/migrations#sql-based-migrations).

* [How-to package applications using MongoDB](stacks.md#mongodb)
* [How-to package applications using MySQL](stacks.md#mysql)
* [How-to package applications using PostgreSQL](stacks.md#postgresql)
* [How-to package applications using MSSQL Server](stacks.md#mssql-server)

### Post-deploy script

It's possible to automatically execute custom commands on the last stage of the
deploy, just in case you need some special hook before the application is ready.

Just put in the application folder a file named cloudesire.build, starting with
a standard [shebang](http://en.wikipedia.org/wiki/Shebang_(Unix)), e.g.:

    #!/bin/bash
    echo 'Build completed' > log.txt

This script will run at the end of the deploy process. Keep in mind that if the
script return a non-zero value, a failure is returned, and the deploy will be
marked as failed.

### Example Applications

Here you can find a selection of ready-to-use **demo apps**, written in several
application stacks:

* [PHP5 + MySQL](https://cdn.cloudesire.com/demo_apps/php-mysql-app.zip)
* [PHP5 + MongoDB](https://cdn.cloudesire.com/demo_apps/php-mongodb-app.zip)
* [Ruby on Rails +
  PostgreSQL](https://cdn.cloudesire.com/demo_apps/rails-postgresql-app.zip)
* [Django +
  PostgreSQL](https://cdn.cloudesire.com/demo_apps/django-postgresql-app.zip)
* [Java6 + MySQL](https://cdn.cloudesire.com/demo_apps/java-mysql-app.zip)
* [NodeJS +
  MongoDB](https://cdn.cloudesire.com/demo_apps/nodejs-mongodb-app.zip)
* [ASP.NET + SQL Server
  Express](https://cdn.cloudesire.com/demo_apps/aspnet-sql-app.zip)
* [CGI-BIN +
  PostgreSQL](https://cdn.cloudesire.com/demo_apps/cgibin-postgresql-app.zip)

And this is a collection of the most famous open-source applications, already
available on the marketplace:

* [Drupal](https://cdn.cloudesire.com/demo_apps/drupal.zip)
* [Dokuwiki](https://cdn.cloudesire.com/demo_apps/dokuwiki.zip)
* [OwnCloud](https://cdn.cloudesire.com/demo_apps/owncloud.zip)
* [Redmine](https://cdn.cloudesire.com/demo_apps/redmine.zip)
* [WordPress](https://cdn.cloudesire.com/demo_apps/wordpress.zip)

## Docker Packaging

Before getting hands dirty, take a look at the [understanding
Docker](https://docs.docker.com/introduction/understanding-docker/) page.

When you're ready, take a look to our [integration
facilities](onboarding.md#integration-facilities): we provide a **staging
marketplace** where you can register your company, log-in and on-board your
application via Docker Image(s) without any worry (also simulating the purchase
of your product using demo credit cards).

The first step is to install the _Docker_ command-line tool on your development
machine:

* [Linux](https://docs.docker.com/linux/started)
* [Mac](https://docs.docker.com/mac/started/)
* [Windows](https://docs.docker.com/windows/started)

You can find a lot of easy to read documentation on the official [Docker User
Guide](https://docs.docker.com/get-started/).

Before going forward in this documentation, please take a look to the [data
persistence](deployed.md/#data-persistence) section to **avoid data loss** in
your application.

Once a Docker image is created, the only think you need to do to
[onboard](onboarding.md) your application in Cloudesire is to create a _Package_
(linked to your application), then select "_Docker_" in the "_Stacks_"
input-box, and finally type the Docker image URL in the related input-box, as
shown in the following screenshot and more detailed described in [this
section](deployed.md/#packages).

![Vendors Control Panel - Docker Image](/img/docs/control_panel_docker_image.png
"Vendors Control Panel - Docker Image")

### Writing a Dockerfile to build an image

A `Dockerfile` is required to generate a _Docker_ image for your application.

A lot of useful information about writing a `Dockerfile` is available at [Best
practices for writing
Dockerfiles](https://docs.docker.com/articles/dockerfile_best-practices/).

A simple example of a `Dockerfile` follows:

```dockerfile
FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
COPY . /src
# Install app dependencies
RUN cd /src; npm install

EXPOSE  8080
CMD ["node", "/src/index.js"]
```

You need to choose a good base image to start from (`FROM` keyword) on [Docker
Hub](https://hub.docker.com/).

There are base images of the most common GNU/Linux distributions:

* [Debian](https://hub.docker.com/_/debian/)
* [Ubuntu](https://hub.docker.com/_/ubuntu/)
* [Centos](https://hub.docker.com/_/centos/)

There are also base images with application stacks preinstalled, along with a
`onbuild` variant, that will ease the packaging of new applications:

* [Node](https://hub.docker.com/_/node/)
* [Python](https://hub.docker.com/_/python/)
* [PHP](https://hub.docker.com/_/php/)
* [Ruby](https://hub.docker.com/_/ruby/)
* [Tomcat](https://hub.docker.com/_/tomcat/)

A lot of widely used Open-Source software are available too:

* [MySQL](https://hub.docker.com/_/mysql/)
* [Postgres](https://hub.docker.com/_/postgres/)
* [MongoDB](https://hub.docker.com/_/mongo/)
* [Redis](https://hub.docker.com/_/redis/)

To build an image from a Dockerfile in the current directory, use:

    docker build -t yourapp:latest .

Then, you can run a container from this image with:

    docker run --rm -ti yourapp:latest

### Requirements and Suggestions

There are some things to keep in mind to use Docker efficiently with Cloudesire.

#### Data volumes

Remember to define volumes in your container to persist data across launches.

#### Container composition

It is highly recommended to use multiple images for each component of your
application, instead of a single container running everything.

A tool named [Composer](https://docs.docker.com/compose/) assists you in running
multiple containers together within your machine, to test that everything is
working.

#### Network

Cloudesire runs containers **in the same network**, meaning that all the running
containers can directly talk to each other. A container on the network can be
reached through its name.

#### Environment variables

For a complete list of environment variables take a look in the [available
environment variables](deployed.md#environment-variables) section.

#### SSL support

Cloudesire manages automatically a **reverse proxy** in front of your
application, so you **don't need to include HTTPS support** in the container.

### Private Repository

ClouDesire offers a private repository where vendors can privately push their
images. This service is free while in BETA.

First, login with your user credentials on the Docker cli:

```bash
docker login docker.domain.tld
```

Images should be tagged with a pattern like:

```docker
docker.domain.tld/identifier/image-name:tag
```

> Find your company identifier in the edit profile section of the control panel

Example of commands to push an image to the appshop.cloud marketplace:

```bash
docker login docker.appshop.cloud
docker build -t myimage:1.0 .
docker tag myimage:1.0 docker.appshop.cloud/mycompany/myimage:1.0
docker push docker.appshop.cloud/mycompany/myimage:1.0
```

At this point, an application can be configured in the Cloudesire [onboarding
interfaces](onboarding.md), simply creating a [Package](deployed.md#packages)
(linked to your application) and selecting "_Docker_" in the "_Stacks_"
input-box, as described in [this section](deployed.md#technical-onboarding).

## Stack Parameters

When defining a [Docker](deployed.md#docker-packaging) or
[ZIP](deployed.md#zip-packaging) _module_ in Cloudesire, you can specify some
parameters:

| Name               | Usage      | Cardinality | Type   | Example      | Description                                   |
|--------------------|------------|-------------|--------|--------------|-----------------------------------------------|
| expose             | Docker     | N           | int    | 8080         | Generates env vars as if it is linked         |
| privileged         | Docker     | 1           | bool   | true         | If container requires high privileges         |
| common_directories | Docker/ZIP | N           | string | files/upload | A path to data, relative to /                 |
| open_ports         | Docker     | N           | int    | 9000         | A port that should be open on the firewall    |
| web_port           | Docker     | 1           | int    | 8000         | The port of the webapp that should be proxied |

### How to add Stack Parameters

To add a new Stack Parameter, you need to access to the "_Modules_" section
(more details [here](deployed.md#modules)), select a specific _Module_ and
_Package_ (more details [here](deployed.md#packages)) and then click on the
"_Show Advanced_" button on the top-right of the page. Furthermore, by accessing
to the "_Stack Parameters Values_" tab it's possible to select a specific
parameter specifying a value for it.  When you're done, click on the "_Add_"
button to finish.

![Vendors Control Panel - Stack
Parameters](/img/docs/control_panel_stack_parameters.png "Vendors Control Panel
- Stack Parameters")

## Sandboxing

Once finished the technical onboarding of your deployed app, it's time to test
its self-provisioning on the cloud!

Let's start by selecting a plan, and by clicking on the corresponding "Sandbox"
button in the "Actions" column; then select one of the supported cloud providers
on which you want to start the testing deploy of your app.

![Launch sandbox](/img/docs/vendors-sandboxing.png)

The provisioning process will start immediately; it will require few minutes,
depending on the cloud provider performances, the "weight" of your app, and
other factors.

You'll be redirected on another view, where you can follow the provisioning
steps; at the end of the deployment, the platform will provide the following
interface:

![vendor running instance](/img/docs/vendors-running-instance.jpg)

The following elements are available:

* **General Info:** the name of the product, its logo, the name of the vendor,
  the current deployment status
* **Subscription Details:** the subscription type (which is _Sandbox_ in this
  case, but will be _Normal_ for the real purchased instances of the
  application), the creation / expiration date, the customer name (which is
  "dummy" for Sandbox orders)  and 2 separate sections for allowing to access
  the related invoices and/or orders
* **VM Details:** the sizing (CPU, RAM) and the public IP address of the virtual
  instance hosting the running application
* **Resource usage:** 2 gauges for highlighting the current Disk Space and
  Bandwidth usage
* **Application Endpoints:** the actual values of the [application
  endpoints](deployed.md#endpoints) previously defined by the vendor
* **Deployment Log:** shows the [deployment
  steps](platform.md#application-provisioning-module), updated in real-time
* **Debug:** provides the real-time application and/or system logs, collected
  from the virtual machines
* **Charts:** a series of real-time monitoring charts, grouped into _Disk_ /
  _Network_ / _System_ sections
