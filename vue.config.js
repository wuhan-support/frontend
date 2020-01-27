module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost/"
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

  pwa: {
    name: "feiyan.help",
    themeColor: "#2d66ba",
    msTileColor: "#1d499b",
    appleMobileWebAppStatusBarStyle: "black-translucent",

    workboxPluginMode: "GenerateSW",
    // iconPaths: {
    //   favicon32: 'favicon/favicon-32x32.png',
    //   favicon16: 'favicon/favicon-16x16.png',
    //   appleTouchIcon: 'favicon/apple-touch-icon.png',
    //   maskIcon: 'favicon/safari-pinned-tab.svg',
    //   msTileImage: 'favicon/mstile-150x150.png'
    // }
  },
}
