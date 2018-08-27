---
title:     "Automatically remove unused Docker data"
author:    Matteo Giordano
authorURL: http://twitter.com/malteo
---

We use Docker *A LOT* at Cloudesire, and working intensely with it can leave some cruft in `/var/lib/docker`.

Fortunately, the Docker CLI supports [pruning](https://docs.docker.com/engine/reference/commandline/system_prune/), which works as a garbage collector for unused objects such as images, containers, volumes, and networks.

You can try it on a terminal with

    $ docker system prune

    WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - all build cache
    Are you sure you want to continue? [y/N] y
    Total reclaimed space: 3.145GB

Not bad!

I'd like to automate this though...  Let's configure a systemd timer to remove unused Docker data!

systemd will look for user services inside `~/.config/systemd/user/`, let's create it

    mkdir -p ~/.config/systemd/user

Enter the newly created directory and create two files, `docker-prune.service`

```
[Unit]
Description=Prune unused Docker images

[Service]
Type=simple
ExecStart=/usr/bin/docker system prune --force

[Install]
WantedBy=default.target
```

and `docker-prune.timer`

```
[Unit]
Description=Prune unused Docker images weekly
RefuseManualStart=no
RefuseManualStop=no

[Timer]
Persistent=false
OnBootSec=80
OnCalendar=weekly
Unit=docker-prune.service

[Install]
WantedBy=timers.target
```

start and enable our new timer

```
systemctl --user start docker-prune.timer
systemctl --user enable docker-prune.timer
```

systemd will cleanup Docker leftovers every week!

<!--truncate-->
