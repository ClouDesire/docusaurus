/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'documentation' /* title for your website */,
  tagline: 'documentation of the cloudesire platform',
  url: 'https://cloudesire.github.io' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'cloudesire.github.io',
  headerLinks: [
    {doc: 'index', label: 'Docs'},
    {doc: 'api', label: 'API'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/logo-cloudesire.png',
  footerIcon: 'img/logo-cloudesire.png',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#1DACE2',
    secondaryColor: '#C1E8F7',
  },
  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Cloudesire.com',
  organizationName: 'cloudesire', // or set an env variable ORGANIZATION_NAME
  projectName: 'cloudesire.github.io', // or set an env variable PROJECT_NAME
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
