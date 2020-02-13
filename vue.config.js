// const Critters = require('critters-webpack-plugin');

module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost/",
        pathRewrite: {'^/api' : ''}
      }
    }
  },

  outputDir: 'dist',
  runtimeCompiler: true,
  integrity: true,

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  // configureWebpack: {
  //   plugins: [
  //     // new Critters()
  //   ]
  // }

  // pwa: {
  //   name: "feiyan.help",
  //   themeColor: "#813d34",
  //   msTileColor: "#1d499b",
  //   appleMobileWebAppStatusBarStyle: "black-translucent",
  //
  //   workboxPluginMode: "GenerateSW",
  //   // iconPaths: {
  //   //   favicon32: 'favicon/favicon-32x32.png',
  //   //   favicon16: 'favicon/favicon-16x16.png',
  //   //   appleTouchIcon: 'favicon/apple-touch-icon.png',
  //   //   maskIcon: 'favicon/safari-pinned-tab.svg',
  //   //   msTileImage: 'favicon/mstile-150x150.png'
  //   // }
  // },
}
