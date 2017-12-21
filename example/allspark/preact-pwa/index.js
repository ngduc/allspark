const Module = {
  ID: 'preact-pwa',
  NAME: 'Preact PWA using pwa-cli',
  APP_NAME: 'my-pwa'
}

// dependencies to install.
Module.install = () => {
  return {
    commands: ['yarn global add preact', 'yarn global add preact-cli'],
    dependencies: [],
    devDependencies: []
  }
}

Module.start = () => {
  return {
    commands: [
      `preact create default --name="${Module.APP_NAME}" --yarn --git=false --install=false --force=true .`,
      'yarn'
    ]
  }
}

module.exports = {
  Module
}
