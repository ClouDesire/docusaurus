---
title:     "How to setup SSO on Graylog 4 with oauth2-proxy"
author:    Pietro Paolo Ferrari
authorURL: https://twitter.com/PP_Ferrari
---

We recently upgraded our Graylog instance to Graylog 4. We also enabled SSO with Github in order to enable all members of our team to login and use Graylog. But, in our experience, it wasn't straightforward as we thought it would be.
We choose to use `oauth2-proxy` as the SSO provider.

To activate SSO on Graylog 4 using `oauth2-proxy`, you have to:

- Enable the `Trusted Header Authentication`. In `Graylog 4` the SSO functionality has been integrated directly into the product and you don't need to rely on an external plugin anymore. To configure SSO, go to System -> Authentication -> Authenticators -> Edit Authenticators. In the `Username header` box insert the name of the header that you're going to authenticate the user with and `enable` the Authenticator. We decided to use the `X-Forwarded-User` header that is automatically added to the request by the oauth2-proxy.
- set the `--trusted-proxies` option launching graylog, passing to it the IP address of the `oauth2-proxy` instance. If you're using `docker` (like us), you can use the `GRAYLOG_TRUSTED_PROXIES` environment variable to the container;
- In `oauth2-proxy`, you have to set the `--pass-basic-auth` option to `false` (it is `true` by default). If you don't do that, Graylog will always try to login the user with basic authentication and it will not use the header configured in the Authenticators settings (`X-Forwarded-User` in our case);
- create a graylog user for each member of your team and use the username they use on the platform you choose to login them from. That is needed because, as time of writing, Graylog 4.0.6 does not automatically create an internal user for each user that logins with SSO functionality.

<!--truncate-->
