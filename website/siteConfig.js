/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const siteConfig = {
  title: 'cloudesire documentation',
  tagline: 'the saas marketplace platform with advanced billing/invoicing engine and docker support',
  url: 'https://docs.cloudesire.com',
  baseUrl: '/',
  editUrl: 'https://github.com/ClouDesire/docusaurus/edit/source/docs/',
  cname: 'docs.cloudesire.com',
  gaTrackingId: 'UA-107718815-1',
  headerLinks: [
    { doc: 'index', label: 'Docs' },
    { doc: 'api', label: 'API' },
    { doc: 'syndication', label: 'Syndication' },
    { doc: 'glossary', label: 'Glossary' },
    {
      href: 'https://www.cloudesire.com',
      label: 'Back to cloudesire.com'
    },
  ],
  headerIcon: 'img/logo-cloudesire.png',
  footerIcon: 'img/logo-cloudesire.png',
  favicon: 'img/favicon/favicon.ico',
  colors: {
    primaryColor: '#1DACE2',
    secondaryColor: '#C1E8F7',
  },
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Cloudesire.com',
  organizationName: 'cloudesire',
  projectName: 'docusaurus',
  highlight: {
    theme: 'default',
  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cloudesire.github.io/feedback-widget/build/bundle.js',
    '/js/feedback.js',
  ],
  repoUrl: 'https://github.com/cloudesire/cloudesire.github.io',
  onPageNav: 'separate',
  algolia: {
    apiKey: "06aaa65659156b0fd43caf8c5d9997e9",
    indexName: "cloudesire"
  },
  docsSideNavCollapsible: true,
};

module.exports = siteConfig;
