import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Animal Shogi',
  description: 'browser based minimam animal shogi',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }],

    socialLinks: [{ icon: 'github', link: 'https://github.com/petaxa/animal-shogi' }],
  },
})
