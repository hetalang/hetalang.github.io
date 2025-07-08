import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,

  lang: 'en-US',
  title: "Heta project",
  description: "Home site for Heta project",
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: '/img/logo.svg',
    // siteTitle: 'Hello World',
    footer: {
      message: 'Heta Project is sponsored by InSysBio CY Ltd',
      copyright: '© Heta Project, 2019-2025'
    },
    externalLinkIcon: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Language', link: '/specifications/' },
      { text: 'Heta compiler', link: '/heta-compiler/' },
      { text: 'HetaSimulator.js', link: '/heta-simulator/' },
      { text: 'Resources', link: '/resources/' }
    ],
    
    sidebar: {
      '/': [{
        text: 'Home',
        items: [
          { text: 'About', link: '/' },
          { text: 'Ecosystem', link: '/ecosystem' },
          { text: 'Version compatibility', link: '/compatibility' },
          { text: 'Contributing', link: '/contributing' }
        ]
      }],
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
          { text: 'Change Log', link: '/specifications/changelog' }
        ]
      }],
      '/heta-compiler/': [{
        text: 'Heta compiler',
        items: [
          { text: 'General info', link: '/heta-compiler/' },
          { text: 'Export formats', link: '/heta-compiler/export-formats' },
          { text: 'CLI references', link: '/heta-compiler/cli-references' },
          { text: 'qsp-functions.heta', link: '/heta-compiler/qsp-functions.heta' },
          { text: 'qsp-units.heta', link: '/heta-compiler/qsp-units.heta' },
          { text: 'Change Log', link: '/heta-compiler/CHANGELOG' },
          { text: 'License', link: 'https://raw.githubusercontent.com/hetalang/heta-compiler/refs/heads/master/LICENSE' },
          { text: 'Migrate to v0.6', link: '/heta-compiler/migrate-to-v0.6' },
          { text: 'Migrate to v0.7', link: '/heta-compiler/migrate-to-v0.7' },
          { text: 'Migrate to v0.8', link: '/heta-compiler/migrate-to-v0.8' },
          { text: 'Migrate to v0.9', link: '/heta-compiler/migrate-to-v0.9' }
        ]
      }],
      '/heta-simulator/': [{
        text: 'HetaSimulator.js',
        items: [
          { text: 'README', link: '/heta-simulator/' },
          { text: 'Documentation', link: 'https://hetalang.github.io/HetaSimulator.jl/stable/' },
          { text: 'Change Log', link: '/heta-simulator/CHANGELOG' }
        ]
      }],
      '/resources/': [{
        text: 'Resources',
        items: [
          { text: 'About', link: '/resources/' },
        ]
      }]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hetalang' }
    ]
  }
})
