import { defineConfig } from 'vitepress'
import myLangGrammar from './tmlLanguage.heta.json' with { type: 'json' }
import sidebarThis from '../_sidebar.json' with { type: 'json' }
//import sidebarSpecifications from '../specifications/_sidebar.json' with { type: 'json' }
//import sidebarHetacompiler from '../hetacompiler/_sidebar.json' with { type: 'json' }
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
  '/specifications/': [{
    text: 'Language',
    items: [
      { text: 'Intro', link: '/specifications/' },
      { text: 'Syntax', link: '/specifications/syntax' },
      { text: 'Tabular format', link: '/specifications/tabular-format' },
      { text: 'Actions', link: '/specifications/actions' },
      { text: 'Classes', link: '/specifications/classes' },
      { text: 'Modules', link: '/specifications/modules' },
      { text: 'Namespaces', link: '/specifications/namespaces' },
      { text: 'Math expressions', link: '/specifications/math' },
      { text: 'Null values', link: '/specifications/null' },
      { text: 'Units', link: '/specifications/units' },
      { text: 'Cases', link: '/specifications/cases' },
      { text: 'Compilation steps', link: '/specifications/compilation' },
      { text: 'Change Log', link: 'https://github.com/hetalang/heta-specifications/blob/master/changelog.md' },
    ]
  }],
  '/hetacompiler/': [{
    text: 'Heta compiler',
    items: [
      { text: 'Intro', link: '/hetacompiler/' },
      { text: 'Export formats', link: '/hetacompiler/export-formats' },
      { text: 'CLI references', link: '/hetacompiler/cli-references' },
      { text: 'qsp-functions.heta', link: '/hetacompiler/qsp-functions.heta' },
      { text: 'qsp-units.heta', link: '/hetacompiler/qsp-units.heta' },
      { text: 'Migrate to v0.6', link: '/hetacompiler/migrate-to-v0.6' },
      { text: 'Migrate to v0.7', link: '/hetacompiler/migrate-to-v0.7' },
      { text: 'Migrate to v0.8', link: '/hetacompiler/migrate-to-v0.8' },
      { text: 'Migrate to v0.9', link: '/hetacompiler/migrate-to-v0.9' },
      { text: 'Change Log', link: 'https://github.com/hetalang/heta-compiler/blob/master/CHANGELOG.md' },
      { text: 'License', link: 'https://raw.githubusercontent.com/hetalang/heta-compiler/refs/heads/master/LICENSE' },
    ]
  }],
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
