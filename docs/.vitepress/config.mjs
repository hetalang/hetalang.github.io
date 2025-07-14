import { defineConfig } from 'vitepress'
import myLangGrammar from './tmlLanguage.heta.json' with { type: 'json' }
import sidebarThis from '../_sidebar.json' with { type: 'json' }
import sidebarSpecifications from '../specifications/_sidebar.json' with { type: 'json' }
import sidebarHetacompiler from '../hetacompiler/_sidebar.json' with { type: 'json' }
//import sidebarHetasimulator from '../heta-simulator/_sidebar.json' with { type: 'json' }
import sidebarResources from '../resources/_sidebar.json' with { type: 'json' }

const hostname = 'https://hetalang.github.io';
const head = [
  [
    'script',
    { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-SSNKYMLHTQ' }
  ],
  [
    'script',
    {},
    `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SSNKYMLHTQ');
    `
  ]
];

const sidebar = {
  '/': sidebarThis,
  '/resources/': sidebarResources,
  '/specifications/': sidebarSpecifications,
  '/hetacompiler/': sidebarHetacompiler,
  /*
  '/heta-simulator/': [{
    text: 'HetaSimulator.js',
    items: [
      { text: 'README', link: '/heta-simulator/' },
      { text: 'Documentation', link: 'https://hetalang.github.io/HetaSimulator.jl/stable/' },
      { text: 'Change Log', link: 'https://github.com/hetalang/HetaSimulator.jl/blob/master/CHANGELOG.md' },
      { text: 'License', link: 'https://github.com/hetalang/HetaSimulator.jl/blob/master/LICENSE' },
    ]
  }],
  */
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,

  lang: 'en-US',
  title: "Heta project",
  description: "Home site for Heta project",
  //https://vitepress.dev/reference/default-theme-last-updated
  lastUpdated: true,
  // https://vitepress.dev/guide/sitemap-generation
  sitemap: {
    hostname: hostname
  },
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: { src: '/img/logo.svg', alt: 'Heta project logo' },
    // siteTitle: 'Hello World',
    footer: {
      message: 'Heta Project is sponsored by InSysBio CY Ltd',
      copyright: '© Heta Project, 2019-2025'
    },
    externalLinkIcon: true,
    // https://vitepress.dev/reference/default-theme-search
    search: {
      provider: 'local' 
    },
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Language', link: '/specifications/' },
      { text: 'Heta compiler', link: '/hetacompiler/' },
      { text: 'HetaSimulator.js', link: 'https://hetalang.github.io/HetaSimulator.jl/stable/' },
      { text: 'Resources', link: '/resources/' }
    ],
    
    sidebar: sidebar,
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hetalang' }
    ]
  },

  head: head,

  transformPageData(pageData) {
    const canonicalUrl = `${hostname}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(['link', { rel: 'canonical', href: canonicalUrl }])
  },

  markdown: {
    // any builtin language name works here
    languages: [myLangGrammar]
  }
})
