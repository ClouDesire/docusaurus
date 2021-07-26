---
title:     "How to setup SSO on Graylog 4 with oauth2-proxy"
author:    Pietro Paolo Ferrari
authorURL: https://twitter.com/PP_Ferrari
---

We recently upgraded our Graylog instance to Graylog 4. In the process, we enabled the SSO functionality (called `Trusted Header Authentication`) in order to enable all members of our team to login and use Graylog. We decided to use [oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy) as the reverse proxy to authenticate with Github.
In our experience, it wasn't straightforward as we thought it would be.

First of all, we enabled the `Trusted Header Authentication` method in Graylog. To enable it, go to System -> Authentication -> Authenticators -> Edit Authenticators in your Graylog istance. In the `Username header` box insert the name of the header that you're going to authenticate the user with and `enable` the Authenticator. We decided to use the `X-Forwarded-User` header that is automatically added to the request by the `oauth2-proxy`. Also, Graylog warns your to pass the `--trusted-proxies` option when starting it. We deploy graylog using Docker, so we added the `GRAYLOG_TRUSTED_PROXIES` environment variable when starting up the container and we set its value with the default docker network gateway. 

Then, we configured an `oauth2-proxy` container to use `GitHub` as the authentication provider. For more info, take a look at the [OAuth2-proxy official documentation](https://oauth2-proxy.github.io/oauth2-proxy/docs/configuration/overview). 

At this point, we were ready to test our login process. `oauth2-proxy` was login us correctly, but Graylog was still showing us the login page. We started digging in the request's headers and we found out that the problem was the `Basic Authentication` header. By default, `oauth2-proxy` passes the `Basic Authentication` header to the site you're trying to login to. This is probably fine in most cases, but it was not for us. The solution was to set the `--pass-basic-auth` option to `false` (it is `true` by default) and leave the `--pass-user-headers` option set to `true`. 

We redeployed our `oauth2-proxy` with the new configuration, but faced another issue. Graylog does not create an internal user for the user who is trying to login using SSO. We had to manually create an internal graylog user foreach member of our team using the same username as the one they have on Github. 
After that, everyone was able to login using their Github credentials and SSO was finally working!

To recap, to activate SSO on Graylog 4 using `oauth2-proxy`:

- Enable the `Trusted Header Authentication`. Go to System -> Authentication -> Authenticators -> Edit Authenticators. In the `Username header` box insert the name of the header that you're going to authenticate the user with and `enable` the Authenticator.
- set the `--trusted-proxies` option launching graylog. If you're using `docker`, you can use the `GRAYLOG_TRUSTED_PROXIES` environment variable;
- In `oauth2-proxy`, you have to set the `--pass-basic-auth` option to `false` (it is `true` by default). If you don't do that, Graylog will always try to login the user with basic authentication and it will not use the header configured in the Authenticators settings;
- create a graylog user for each member of your team and use the username they use on the authentication provider.

<!--truncate-->
