---
id: modules-keycloak
title: Keycloak Integration
sidebar_label: Keycloak
---

Cloudesire supports [Keycloak](https://www.keycloak.org/) for providing additional
capabilities:

- Single-Sign On
- Identity Brokering and Social Login
- User Federation (to connect to existing LDAP or Active Directory servers)

Keycloak can also authenticate users with existing OpenID Connect or SAML 2.0
Identity Providers.

## Integration Specifications

Keycloak manages the users credentials, while the [user roles](platform-users.md)
are still managed by Cloudesire.

When the Keycloak module is active:

- the *native* marketplace login forms are replaced by the Keycloak login page
- on the Cloudesire database, each user entity has an *attached* "Keycloak ID"
  (without storing any credentials)
- Keycloak validates the users credentials; when a user is authenticated by Keycloak,
  his "Keycloak ID" is forwarded to the Cloudesire backend, that automatically
  can autheticate the corresponding user.

From the user-experience perspective, customers can:

  - login to the marketplace/dashboard interfaces by using the Keycloak login form
  - self-register to the marketplace, and behind the scenes a corresponding Cloudesire
  account will be created if not already existing (the matches are made by considering
  the users' emails)

Other kind of users (vendors, resellers, etc) must be previously registered both
in Cloudesire and KeyCloak, then at the first login the platform matches the 2
entries by using the users emails.