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
  enableUpdateBy: true,
  enableUpdateTime: true,
  cname: 'docs.cloudesire.com',
  gaTrackingId: 'G-Y0QZTE1YQV',
  gaGtag: true,
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
    primaryColor: '#D9004F',
    secondaryColor: '#AC0041',
  },
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Cloudesire.com by Engineering D.HUB',
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
