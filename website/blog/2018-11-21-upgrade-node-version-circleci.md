---
title:     "How to upgrade node on CircleCI machine executor"
author:    Manuel Mazzuola
authorURL: https://keybase.io/originof
---

CircleCI offers 3 different [executor types](https://circleci.com/docs/2.0/executor-types/): machine, Docker and MacOS. On Linux the best choice would be the docker executor but if you need full control over the job environment you must opt for the machine executor.

The default machine executor image includes Docker, docker-compose, along with common language tools like nvm for node.  
The issue we have encountered at Cloudesire is that if you need a different version of node you can't just install it via apt because the workspace uses nvm to manage node versions. And you can't just use nvm because on every run CircleCI resets the nvm configuration.

What we have found to work is to load nvm from `/opt/circleci/.nvm` install the required version and set it as default.  
For example to use node `v8.11.3`:

```shell
# load-nvm.sh
export NVM_DIR="/opt/circleci/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

```yaml
# config.yml
version: 2

jobs:
  build:
    machine: true

    steps:
      - checkout
      - run:
          name: Install node@v8.11.3
          command: |
            ./load-nvm.sh
            nvm install v8.11.3
            nvm alias default v8.11.3

      - run: |
          ./load-nvm.sh
          npm version
```

<!--truncate-->
