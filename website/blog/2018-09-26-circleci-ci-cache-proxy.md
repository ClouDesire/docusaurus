---
title:     "Dependencies caching on local CircleCI builds"
author:    Manuel Mazzuola
authorURL: https://keybase.io/originof
---

At Cloudesire a couple of years ago we decided to switch from Jenkins to CircleCI. First of all, because we are lazy to self-maintain a server and secondly because it offers affordable prices.

A great tool CircleCI provides is the [local CLI](https://circleci.com/docs/2.0/local-cli/).  
The `circleci` commands enable you to reproduce the CircleCI environment locally and run jobs as if they were running on the hosted application for more efficient debugging and configuration in the initial setup phase.  
The bad news about the local CLI is that the `restore_cache` key is [ignored](https://circleci.com/docs/2.0/local-cli/#caching).
While building you'll receive the message `Error: Skipping cache - error checking storage: not supported in the local builds` and dependencies are downloaded each time, shame 🕭 shame 🕭 shame 🕭.

A fast setup solution I currently use is to proxy [docker](https://www.docker.com/) to a local [nginx](https://www.nginx.com/) container that acts as cache layer.

### Start the proxy container

Start the [nginx-cache](https://github.com/manuelmazzuola/nginx-cache/blob/master/Dockerfile) container

    docker run --name nginx-cache -d manuelmazzuola/nginx-cache
and get the internal IP by inspecting it with

    docker inspect nginx-cache | grep IPAddress

### Proxy docker requests

Create or edit the file `~/.docker/config.json` and change it according to the following configuration where `{IP}` is the internal IP of the cache container:

```json
{
 "proxies":
 {
   "default":
   {
     "httpProxy": "http://{IP}:8080",
     "noProxy": "127.0.0.1,localhost,{IP}"
   }
 }
}
```

and test it by running the following twice

    docker run --rm alpine/httpie --print=hH GET unpkg.com/react@16/umd/react.development.js Cache-Control:no-cache
the first response will contains `X-Cached: MISS` and the next responses should contain `X-Cached: HIT`, Eὕρηκα!  
But wait, why was the file cached even if `Cache-Control:nocache` is present? Our `nginx-cache` container ignores all the caching headers because some build tools, like maven, add the `Cache-Control:nocache` header to the requests it made ☹

That's it! Remember that only `http` requests will be cached, so if you want maven artifacts to be cached you could add an http mirror to your `$MAVEN_HOME/conf/settings.xml`

```xml
<mirror>
  <id>central-secure</id>
  <url>http://repo.maven.apache.org/maven2</url>
  <mirrorOf>central</mirrorOf>
</mirror>
```

or if you use npm/yarn run the following `npm config set registry http://registry.npmjs.org/`.

If you want to download your dependencies over `HTTP` only on your computer you could use a different config file by using `circle build -c my-custom-config` or inject an env. variable `circle build -e LOCAL_BUILD=1` that your build scripts will read and change the repositories according to the value.

<!--truncate-->
