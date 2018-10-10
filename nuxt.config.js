module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'zh-TW'
    },
    title: '成大學生會 - NCKUSU',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'NCKUSU offisial website.' },
      { hid: 'keywords', name: 'keywords', content: 'vue.js, nuxt.js, javascript, nckusu, ncku, 成大, 成功大學, 學生會, 成功' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/fb-sdk.js' },
      { src: 'https://use.fontawesome.com/6fac2730d4.js' },
      { src: 'https://www.googletagmanager.com/gtag/js?id=UA-25295802-2' },
      { src: '/js/google-analytics.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css', '~/plugins/fontawesome-free-5.3.1-web/css/all.min.css'],
  plugins: [ {src: '~plugins/vee-validate.js', ssr: true} ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  modules: [
    'nuxt-imagemin',
  ],
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
