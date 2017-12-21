#!/usr/bin/env node

// const { exec } = require('child_process') // can't run interactive commands.
const execSh = require('exec-sh')
const jetpack = require('fs-jetpack')
const program = require('commander')
const chalk = require('chalk')
/* eslint-disable no-console */
const log = console.log
const logHeader = msg => log(chalk.yellow('\n' + msg))

program
  .version('0.0.9')
  .option('-p, --path <path>', 'Change base path (use relative path)', '.')
  .option('-a, --add <module>', 'Add a module to list (in allspark.json)', '.')
  .parse(process.argv)

logHeader('✨  Allspark ✨')

const CURRENT_FULL_PATH = process.cwd()

let BASE_PATH = program.path // relative path. (default to '.')
BASE_PATH = BASE_PATH.slice(-1) === '/' ? BASE_PATH.slice(0, -1) : BASE_PATH

const ALLSPARK_PATH = BASE_PATH + '/allspark'
const ALLSPARK_FULL_PATH = CURRENT_FULL_PATH + BASE_PATH.slice(1) + '/allspark'
// const BASE_PATH = SRC_PATH.split('/').slice(0, -1).join('/') // remove the last-dir part.
// const SRC_PATH_ABS = CURRENT_FULL_PATH + '/' + SRC_PATH

const configFilePath = ALLSPARK_PATH + '/allspark.json'
const CONFIG = jetpack.read(configFilePath, 'json')
if (!CONFIG || !CONFIG.modules) {
  // config file not found! #TODO => auto create it?
  process.exit()
}

const execArray = (Module, cmds, callback) => {
  const execNext = () => {
    let cmd = cmds.shift() || ''
    cmd = cmd.replace('$DIR', './allspark/' + Module.ID)
    execSh(cmd, { cwd: BASE_PATH }, err => {
      log('cmd: ', cmd)
      if (err) {
        callback(err)
      } else {
        /* eslint-disable no-lonely-if */
        if (cmds.length) {
          execNext()
        } else {
          callback(null)
        }
      }
    })
  }
  execNext()
}

// install dependencies & devDependencies of a Module
const installDeps = Module => {
  const cmds = []

  const checkDeps = depsArr => {
    const depsToAdd = []
    if (depsArr && depsArr.length > 0) {
      depsArr.forEach(dep => {
        const depPath = `${BASE_PATH}/node_modules/${dep}`
        // log('dep: ' + depPath)
        if (jetpack.exists(depPath) !== 'dir') {
          depsToAdd.push(dep)
        }
      })
      // log('depsToAdd: ', depsToAdd)
    }
    return depsToAdd
  }
  if (typeof Module.install === 'function') {
    const json = Module.install()
    const depsToAdd = checkDeps(json.dependencies)
    if (depsToAdd.length > 0) {
      cmds.push(`yarn add ${depsToAdd.join(' ')}`)
    }
    const devDepsToAdd = checkDeps(json.devDependencies)
    if (devDepsToAdd.length > 0) {
      cmds.push(`yarn add ${devDepsToAdd.join(' ')} --dev`)
    }
  }
  return cmds
}

log('- path: ', BASE_PATH)
log('- modules: ', CONFIG.modules)

CONFIG.modules.forEach(moduleName => {
  const moduleFullPath = ALLSPARK_FULL_PATH + '/' + moduleName + '/index.js'
  const module = require(moduleFullPath)

  const Module = module.Module
  logHeader('⚡️  ' + Module.NAME)

  let cmds = []
  cmds = cmds.concat(Module.install().commands || [])
  const installCmds = installDeps(Module)
  cmds = cmds.concat(installCmds)

  const json = Module.start()
  if (json.commands) {
    cmds = cmds.concat(json.commands)
  }
  log('exec commands:\n', cmds)

  execArray(Module, cmds, () => {})
})

// jetpack
//   .find(ALLSPARK_PATH, {
//     matching: ['**/index.js'],
//     recursive: true,
//   })
//   .forEach(filePath => {
//     // filePath is a relative full-path from BASE_PATH
//     // example "allspark --path ./example" => filePath = example/allspark/go-apis/index.js
//     // const module = require(CURRENT_FULL_PATH + '/' + filePath)
//     // ...
//     // const Module = module.Module
//     // logHeader(Module.NAME)
//     // let cmds = []
//     // cmds = cmds.concat(Module.install().commands || [])
//     // const installCmds = installDeps(Module)
//     // cmds = cmds.concat(installCmds)
//     // const json = Module.start()
//     // if (json.commands) {
//     //   cmds = cmds.concat(json.commands)
//     // }
//     // log('exec commands:\n', cmds)
//     // execArray(Module, cmds, () => {})
//     // res.cmd.forEach(cmd => {
//     //   log('cmd: ', cmd)
//     //   execSh(cmd, { cwd: BASE_PATH }, function (err) {
//     //     if (err) {
//     //       console.log('Exit code: ', err.code)
//     //     }
//     //     // collect streams output
//     //     // execSh(['bash -c id', 'echo lorem >&2'], true, function (
//     //     //   err,
//     //     //   stdout,
//     //     //   stderr
//     //     // ) {
//     //     //   if (err) log('error: ', err)
//     //     //   // log('stdout: ', stdout)
//     //     //   // log('stderr: ', stderr)
//     //     // })
//     //   })
//     // })
//   })

// export default () => {
//   return 'hello world';
// };
