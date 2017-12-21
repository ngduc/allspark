const Module = {
  NAME: 'Serverless APIs'
}

Module.install = () => {
  return {
    dependencies: [],
    devDependencies: ['serverless']
  }
}

Module.start = () => {
  return {
    commands: ['echo "sls" ready']
  }
}

module.exports = {
  Module
}
