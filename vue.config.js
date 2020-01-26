module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],

  outputDir: '_',
  runtimeCompiler: true,

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
