/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const siteConfig = {
  title: 'documentation' /* title for your website */,
  tagline: 'knowledge base of the cloudesire platform maintained by the cloudesire development team',
  url: 'https://docs.cloudesire.com' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  editUrl: 'https://github.com/ClouDesire/docusaurus/tree/source/docs/',
  cname: 'docs.cloudesire.com',
  gaTrackingId: 'UA-107718815-1',
  headerLinks: [
    {doc: 'index', label: 'Docs'},
    {doc: 'api', label: 'API'},
    {page: 'help', label: 'Help'},
  ],
  /* path to images for header/footer */
  headerIcon: 'img/logo-cloudesire.png',
  footerIcon: 'img/logo-cloudesire.png',
  favicon: 'img/favicon/favicon.ico',
  /* colors for website */
  colors: {
    primaryColor: '#1DACE2',
    secondaryColor: '#C1E8F7',
  },
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Cloudesire.com',
  organizationName: 'cloudesire', // or set an env variable ORGANIZATION_NAME
  projectName: 'docusaurus', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/cloudesire/cloudesire.github.io',
  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
};

module.exports = siteConfig;
