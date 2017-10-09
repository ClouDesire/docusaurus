---
layout: post
title:  "Configure logback log level via environment variables"
date:   2017-10-09 14:57:15 +0200
categories: java
---

If you are running a java application with logback inside a docker container, it may be really useful to interact with logging levels via OS environment variables.

It's simple as declaring a new variable inside your `logback.xml` file and provide a default value.

```xml
<variable name="CLOUDESIRE_LOG_LEVEL" value="${CLOUDESIRE_LOG_LEVEL:-DEBUG}" />
<logger name="com.cloudesire" level="${CLOUDESIRE_LOG_LEVEL}"/>
```

Then you can simply run your docker container tuning the log level by passing an appropriate value, e.g.: `CLOUDESIRE_LOG_LEVEL=WARN`.
