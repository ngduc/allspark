const Module = {
  NAME: 'Netlify',
  BUILD_PATH: './build',
  SITE_ID: 'my-pwa', // change this to your sub-domain name, e.g. http://SITE_ID.netlify.com/
  DOMAIN: '' // optional
}

Module.install = () => {
  return {
    dependencies: [],
    devDependencies: ['netlify-cli']
  }
}

Module.start = () => {
  // Run
  // $ netlify deploy
  // $ netlify update -n Netlify.SITE_NAME
  return {
    commands: [
      `pwd`,
      `./node_modules/netlify-cli/bin/cli.js deploy --path ${Module.BUILD_PATH} --site-id ${Module.SITE_ID}`
    ]
  }
}

module.exports = {
  Module
}
