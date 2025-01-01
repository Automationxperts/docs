import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { EnumChangefreq } from 'sitemap';
// import type { Options as UmamiOptions } from '@dipakparmar/docusaurus-plugin-umami';

const isDeployPreview =
  process.env.VERCEL_ENV === 'development' ||
  process.env.VERCEL_ENV === 'preview';

const themes = require('prism-react-renderer').themes;

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const config: Config = {
  title: `AUTOMATION EXPERT`,
  tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://devopsify.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'automationxpert', // Usually your GitHub org/user name.
  projectName: 'tech-docs', // Usually your repo name.
  trailingSlash: false, // Remove trailing slash at the end of url

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Scripts to be injected into <head></head>
  scripts: [
    {
      src: 'https://cdn.splitbee.io/sb.js',
      async: true,
    },
  ],

  // Presets are sets of config and plugins for a particular type of Docusaurus site.
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: false,
          editUrl: 'https://github.com/Automationxperts/docs/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: !isDeployPreview
          ? {
              trackingID: 'G-EZ7C3BQQ3J',
              anonymizeIP: false,
            }
          : undefined,
        sitemap: {
          changefreq: EnumChangefreq.WEEKLY,
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
        },
      } satisfies Preset.Options,
    ],
  ],

  // themeConfig is used to configure the look and feel of your site.
  themeConfig: {
    image:
      'https://opengraph.githubassets.com/5f64176affcb4de799b0eb3903e8e71e35d89e9022c4953e88f9b879302bead0/dipakparmar/docs-diary',
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: `Devopsify Docs`,
      hideOnScroll: false,
      logo: {
        alt: 'Technical Docs',
        src: 'img/logo.svg',
      },
      items: [
        // Left Navbar items
        {
          to: '/tags',
          label: 'Tags',
          position: 'left',
        },
        // Right Navbar items
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://twitter.com/Automationxpert',
          position: 'right',
          className: 'header-twitter-link',
          'aria-label': 'Twitter',
        },
        {
          href: 'https://github.com/Automationxperts/docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    footer: {
      // style: 'light',
      copyright: `Copyright © 2020-${new Date().getFullYear()} Automation Expert, Inc.`,
    },
    algolia: {
      appId: 'L1RXPNBXCJ',
      apiKey: '2ab0d916d62484fc18abaa797ac8cf44',
      indexName: 'automation',
      contextualSearch: true,
    },
  } satisfies Preset.ThemeConfig,

  // Themes are used to customize the colors and styles used by Docusaurus.
  themes: [],

  // Plugins are used to extend the functionality of Docusaurus.
  plugins: [
    [
      require.resolve('@docusaurus/plugin-client-redirects'),
      {
        redirects: [
          {
            to: '/troubleshooting-fixes/macos/macos-dock-changes-position',
            from: '/troubleshooting-fixes/macos',
          },
        ],
        createRedirects(existingPath) {
          if (existingPath.includes('/')) {
            // Redirect from /docs/X to /X
            // deepcode ignore GlobalReplacementRegex: Only root level docs are redirected
            return [existingPath.replace('/', '/docs/')];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
    /*
    [
      '@dipakparmar/docusaurus-plugin-umami',
      {
        websiteID: 'c401b94a-f278-46e3-bc17-72e9494f1375',
        analyticsDomain: 'analytics.dipak.io',
        scriptName: 'ua.js',
        dataDoNotTrack: true,
        dataDomains: 'docs.dipak.tech',
      } as UmamiOptions,
    ],
    */

    async function tailwindcss() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postCssOptions) {
          // Appends TailwindsCSS and AutoPrefixer
          postCssOptions.plugins.push(require('tailwindcss'));
          postCssOptions.plugins.push(require('autoprefixer'));
          return postCssOptions;
        },
      };
    },
  ],
};

export default config;
