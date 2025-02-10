import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Animal Shogi',
  description: 'browser based minimam animal shogi',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }],
    sidebar: {
      "/adr/": [
        {
          text: "ADR",
          items:[
            {text: "BOARDGAME.IO の開始を Vue プラグインで実行するのをやめる", link: "/adr/delete-vue-plugin.md"},
            {text: "勝利条件の判定方法", link: "/adr/how-to-culc-is-victory.md"},
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/petaxa/animal-shogi' }],
  },
})
