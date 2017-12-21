const Module = {
  ID: 'go-apis',
  NAME: 'Go APIs'
}

Module.install = () => {
  return {
    dependencies: [],
    devDependencies: []
  }
}

Module.start = () => {
  return {
    commands: [] // ['go run $DIR/main.go']
  }
}

module.exports = {
  Module
}
