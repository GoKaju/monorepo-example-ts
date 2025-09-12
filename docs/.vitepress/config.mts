import { defineConfig } from 'vitepress'
import buildSidebar from './sidebar'

import searchLocale from './i18n/search.es.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My awesome documentation',
  description: 'A VitePress Site',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Domain', link: '/domain/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: buildSidebar(),

    socialLinks: [{ icon: 'github', link: 'https://github.com/your-repo' }],
    search: {
      provider: 'local',
      options: {
        translations: searchLocale,
      },
    },
    langMenuLabel: 'es',
  },
  lang: 'es',
  srcDir: 'src',
  markdown: {
    lineNumbers: true,
  },
  lastUpdated: true,
  ignoreDeadLinks: true,
})
