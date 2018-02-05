export default {
  'entry': 'src/pages/*.js',
  'outputPath': './dist',
  'publicPath': '/cfAdmin/cf/',
  'multiPage': true,
    'theme': 'theme.config.js',
  'env': {
    'development': {
      'extraBabelPlugins': [
        'dva-hmr',
        'transform-runtime',
        ['import', { 'libraryName': 'antd', 'style': true }]
      ]
    },
    'production': {
      'extraBabelPlugins': [
        'transform-runtime',
        ['import', { 'libraryName': 'antd', 'style': true }]
      ]
    }
  }
}

