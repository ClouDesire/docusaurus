---
id: docker
title: Docker applications onboarding
sidebar_label: Docker applications
---

The simpler, and suggested way to onboard an application on the marketplace is
via a Docker image, or a composition of multiple images via Docker Compose.

Before starting, make sure that you:

* Understand the [Docker basics](https://docs.docker.com/engine/docker-overview/)
* Have [Docker](https://docs.docker.com/install/) and [Docker
  Compose](https://docs.docker.com/compose/install/)
* Have written a `Dockerfile` and have built at least a working Docker image

Once a Docker image is available, you need to [onboard](onboarding.md) your
application into the Catalog: create a _Package_ (linked to your application),
then select _Docker_ in the _Stacks_ input-box, and finally type the _Docker
image URL_ in the related input-box, as shown in the following screenshot and
more detailed described in [this section](deployed.md/#packages).

![Vendors Control Panel - Docker Image](/img/docs/control_panel_docker_image.png
"Vendors Control Panel - Docker Image")

There are some things to keep in mind to use Docker efficiently with Cloudesire.

## Data volumes

Remember to define volumes in your container to persist data across
redeployments. Container can be restarted at any time and data-loss will occurs
if they aren't correctly defined.

## Container composition

It is highly recommended to use multiple images for each component of your
application, instead of a single container with everything inside.

> Always use official images for your dependencies (e.g.
> [mysql](https://hub.docker.com/_/mysql/),
> [postgres](https://hub.docker.com/_/postgres/)) to get regular updates and
> avoid security concerns.

The [Composer](https://docs.docker.com/compose/) tool will assists you in
running multiple containers together within your machine, to test that
everything is working.

Once that you have a working `docker-compose.yml`, you can import it into the
marketplace from the _Modules_ section.

### Example docker-compose.yml

Here follows a `docker-compose.yml` example.

The `services` section is the standard Compose section to define containers and
their configuration.

The `x-cloudesire` section contains optional metadata ignored by Compose but
handled by the platform to define multiple [endpoint
patterns](deployed.md#endpoints) and [application
metrics](onboarding.md#application-metrics) for each defined service.

The name of each object inside this section must be equal to a service defined
below (i.e. `test`).

> To add the `x-cloudesire` in your *docker-compose.yml* you need to use at
> least 3.4 format or Compose will throw an error.

```yaml
version: '3.4'

services:
  test:
    image: httpd:latest

    ports:
    - 8080:8080

    volumes:
    - /var/www/uploads

    environment:
      ENV_NAME: production

x-cloudesire:
  test:
    endpoints:
      - pattern: http://{nodename}/website
      - pattern: http://{nodename}/backend
    metrics:
      - identifier: application-metric
        endpoint: /metric
        frequence: 86400
```

## Private Repository

The platform is integrated with a private Docker Registry where vendors can
privately push their images.

First, login with your user credentials on the Docker cli (domain.tld depends
on where the marketplace is, ask to your administrator):

```bash
docker login docker.domain.tld
```

Images should be tagged with a pattern like:

```docker
docker.domain.tld/identifier/image-name:tag
```

> Find your company identifier in the edit profile section of the control panel (company slug)

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

## Network

Cloudesire runs containers **in the same network**, meaning that all the running
containers can directly talk to each other. A container on the network can be
reached through its name (avoid using characters not permitted as hostnames like
`_`).

## Default environment variables

For a complete list of the default available environment variables take a look
in the [available environment variables](deployed.md#environment-variables)
section.

## SSL support

Cloudesire manages automatically a **reverse proxy** in front of your
application, so you **don't need to include HTTPS support** in the container.

A LetsEncrypt certificate is automatically configured for every deployed
instance.

## Stack Parameters

When defining a Docker application, you can configure some parameters:

| Name               | Cardinality | Type    | Example      | Description                                   |
|--------------------|-------------|---------|--------------|-----------------------------------------------|
| expose             | N           | int     | 8080         | Generates env vars as if it is linked         |
| privileged         | 1           | boolean | true         | If container requires high privileges         |
| common_directories | N           | string  | files/upload | A path to a data directory, relative to /     |
| open_ports         | N           | int     | 9000         | A port that should be open on the firewall    |
| web_port           | 1           | int     | 8000         | The port of the webapp that should be proxied |

These parameters are automatically populated if you upload a `docker-compose.yml` file.